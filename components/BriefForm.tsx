"use client";

import { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Isian, kelasKontrol, kelasPilih } from "@/components/ui/Isian";
import { TombolAksi } from "@/components/ui/Tombol";
import { studio } from "@/content/studio";
import { kirimBrief, type Brief } from "@/lib/kirim";
import { pesanWA, tautanWA } from "@/lib/wa";

/** Adjust these to the bracket you actually work in. */
const anggaran = [
  "Di bawah Rp 25 juta",
  "Rp 25–50 juta",
  "Rp 50–100 juta",
  "Di atas Rp 100 juta",
  "Belum tahu",
];

const jenis = ["Website perusahaan", "Aplikasi web / sistem", "Belum yakin"];
const mulai = ["Secepatnya", "1–3 bulan lagi", "Lebih dari 3 bulan", "Belum tahu"];

/** A human needs at least this long to fill the form honestly. */
const JEDA_MINIMUM_MS = 3000;

export function BriefForm() {
  const [status, setStatus] = useState<
    "diam" | "kirim" | "sukses" | "gagal" | "kurang"
  >("diam");
  const [galat, setGalat] = useState("");
  const dimuat = useRef(0);

  /* hCaptcha is switched on in the Web3Forms dashboard, which makes the token
     mandatory server-side — a submission without one is rejected outright. The
     honeypot and the timing gate below still earn their place: they cost a
     visitor nothing, while the captcha is the only one of the three that also
     stops someone posting straight to the API with the access key read out of
     this page. */
  const [captcha, setCaptcha] = useState("");
  const captchaRef = useRef<HCaptcha>(null);

  useEffect(() => {
    dimuat.current = Date.now();
  }, []);

  async function tangani(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Bots fill every field they find, including the one people never see.
    if (data.get("website-perusahaan")) return;
    // And they fill them faster than anyone reading the questions could.
    if (dimuat.current === 0) return;
    if (Date.now() - dimuat.current < JEDA_MINIMUM_MS) return;

    // Said here rather than left to the server, whose rejection reads as a
    // generic failure and gives no hint that a box was missed.
    if (!captcha) {
      setStatus("kurang");
      return;
    }

    setStatus("kirim");
    setGalat("");

    const brief: Brief = {
      nama: String(data.get("nama") ?? ""),
      perusahaan: String(data.get("perusahaan") ?? ""),
      kontak: String(data.get("kontak") ?? ""),
      jenis: String(data.get("jenis") ?? ""),
      anggaran: String(data.get("anggaran") ?? ""),
      mulai: String(data.get("mulai") ?? ""),
      cerita: String(data.get("cerita") ?? ""),
    };

    const hasil = await kirimBrief(brief, captcha);
    if (hasil.ok) {
      setStatus("sukses");
      form.reset();
    } else {
      setStatus("gagal");
      setGalat(hasil.pesan);
    }

    /* A token is single-use whichever way the request went. Leaving the solved
       widget on screen after a failure invites a retry that cannot succeed. */
    captchaRef.current?.resetCaptcha();
    setCaptcha("");
  }

  if (status === "sukses") {
    return (
      <div role="status" className="border-2 border-biru p-10">
        <h2 className="tampil text-anak">Brief masuk</h2>
        <p className="mt-5">
          Kami balas dalam empat jam kerja. Kalau butuh lebih cepat, kirim pesan
          ke{" "}
          <a
            href={tautanWA(pesanWA.setelahBrief)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-biru underline underline-offset-4"
          >
            WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={tangani} className="max-w-2xl">
      {process.env.NODE_ENV !== "production" && !studio.formKey && (
        <p className="mb-10 border-2 border-garis bg-kabu p-5 text-sm">
          Formulir belum terhubung: isi <code>NEXT_PUBLIC_WEB3FORMS_KEY</code> di{" "}
          <code>.env.local</code>. Lihat <code>.env.example</code>.
        </p>
      )}

      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website-perusahaan">Jangan diisi</label>
        <input id="website-perusahaan" name="website-perusahaan" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Isian
          label="Nama"
          nama="nama"
          anak={<input id="nama" name="nama" type="text" required autoComplete="name" className={kelasKontrol} />}
        />
        <Isian
          label="Perusahaan"
          nama="perusahaan"
          anak={<input id="perusahaan" name="perusahaan" type="text" required autoComplete="organization" className={kelasKontrol} />}
        />
      </div>

      <div className="mt-8">
        <Isian
          label="WhatsApp atau email"
          nama="kontak"
          catatan="Mana saja yang paling cepat kamu baca."
          anak={<input id="kontak" name="kontak" type="text" required aria-describedby="kontak-catatan" className={kelasKontrol} />}
        />
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <Isian
          label="Jenis proyek"
          nama="jenis"
          anak={
            <select id="jenis" name="jenis" required defaultValue="" className={kelasPilih}>
              <option value="" disabled>Pilih</option>
              {jenis.map((j) => <option key={j}>{j}</option>)}
            </select>
          }
        />
        <Isian
          label="Rentang anggaran"
          nama="anggaran"
          anak={
            <select id="anggaran" name="anggaran" required defaultValue="" className={kelasPilih}>
              <option value="" disabled>Pilih</option>
              {anggaran.map((a) => <option key={a}>{a}</option>)}
            </select>
          }
        />
        <Isian
          label="Target mulai"
          nama="mulai"
          anak={
            <select id="mulai" name="mulai" required defaultValue="" className={kelasPilih}>
              <option value="" disabled>Pilih</option>
              {mulai.map((m) => <option key={m}>{m}</option>)}
            </select>
          }
        />
      </div>

      <div className="mt-8">
        <Isian
          label="Ceritakan singkat"
          nama="cerita"
          catatan="Apa yang sedang tidak berjalan, dan apa yang kamu harap berubah. Tiga kalimat sudah cukup."
          anak={<textarea id="cerita" name="cerita" rows={6} required aria-describedby="cerita-catatan" className={kelasKontrol} />}
        />
      </div>

      {/* Above the button, not beside it: the widget can grow to a full puzzle
          when hCaptcha is suspicious, and anything sitting next to it would be
          pushed around mid-interaction. */}
      <div className="mt-10">
        <HCaptcha
          ref={captchaRef}
          sitekey={studio.captchaKey}
          reCaptchaCompat={false}
          languageOverride="id"
          onVerify={(token) => setCaptcha(token)}
          onExpire={() => setCaptcha("")}
          onError={() => setCaptcha("")}
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <TombolAksi type="submit" disabled={status === "kirim"}>
          {status === "kirim" ? "Mengirim…" : "Kirim brief"}
        </TombolAksi>
        {/* Two different failures, two different sentences. Nothing was sent
            when the captcha is unticked, so saying "gagal terkirim" would send
            the visitor looking for a fault that is not there. */}
        <p aria-live="polite" className="text-sm">
          {status === "kurang" && "Centang dulu kotak verifikasi di atas."}
          {status === "gagal" &&
            `Gagal terkirim — ${galat} Coba lagi, atau kirim lewat WhatsApp.`}
        </p>
      </div>
    </form>
  );
}
