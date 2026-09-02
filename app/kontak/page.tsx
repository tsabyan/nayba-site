import type { Metadata } from "next";
import { Panji } from "@/components/layout/Panji";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { BriefForm } from "@/components/BriefForm";
import { studio } from "@/content/studio";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Kirim brief atau chat WhatsApp. Balasan dalam empat jam kerja.",
};

/* The reference's contact page lists three offices. Nayba has none, so the
   cards carry the ways of actually reaching us instead. */
const jalur = [
  {
    nama: "WhatsApp",
    ringkas: "Paling cepat. Cocok untuk pertanyaan pendek atau sekadar memastikan kami cocok.",
    aksi: "Buka WhatsApp",
    href: `https://wa.me/${studio.whatsapp}`,
  },
  {
    nama: "Brief tertulis",
    ringkas: "Kalau lebih enak menulis dulu. Formulirnya ada di bawah, dan langsung masuk ke inbox kami.",
    aksi: "Ke formulir",
    href: "#brief",
  },
];

export default function HalamanKontak() {
  return (
    <>
      <Panji
        mata="Kontak"
        judul="Ceritakan yang mau dikerjakan"
        ringkas="Balasan dalam empat jam kerja, Senin sampai Jumat. Kalau ternyata bukan bidang kami, kami bilang di balasan pertama."
      />

      <section className="py-20 md:py-28">
        <Kontainer>
          <dl className="grid gap-12 md:grid-cols-2 md:gap-10">
            {jalur.map((j, i) => (
              <Muncul key={j.nama} jenis="naik" urutan={i} durasi={1.2}>
                <dt className="tampil text-anak">{j.nama}</dt>
                <dd className="mt-5">{j.ringkas}</dd>
                <a
                  href={j.href}
                  {...(j.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="pelan mt-7 inline-flex items-center gap-3 font-display text-sm font-bold tracking-[1.1px] text-biru uppercase hover:gap-5"
                >
                  {j.aksi} <span aria-hidden>→</span>
                </a>
              </Muncul>
            ))}
          </dl>
        </Kontainer>
      </section>

      <section id="brief" className="border-t border-garis py-20 md:py-28">
        <Kontainer>
          <Muncul jenis="naik">
            <h2 className="tampil max-w-3xl text-bagian">Kirim brief</h2>
          </Muncul>
          <Muncul jenis="naik" urutan={1}>
            <p className="mt-6 max-w-xl">
              Semakin jelas isinya, semakin cepat kami bisa memberi jawaban yang
              berguna. Kalau ada yang belum tahu, tulis belum tahu — itu jawaban
              yang sah.
            </p>
          </Muncul>
          <Muncul jenis="naik" urutan={2} className="mt-14">
            <BriefForm />
          </Muncul>
        </Kontainer>
      </section>
    </>
  );
}
