import type { Metadata } from "next";
import { Panji } from "@/components/layout/Panji";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { Kerjasama } from "@/components/sections/Kerjasama";
import { catatanDurasi, fase, TOTAL_MINGGU } from "@/content/proses";

export const metadata: Metadata = {
  title: "Proses",
  description:
    "Delapan minggu dari temu kenal sampai luncur. Setiap tahap punya hasil yang kamu terima dan hal yang perlu kamu siapkan.",
};

export default function HalamanProses() {
  return (
    <>
      <Panji
        mata={`${TOTAL_MINGGU} minggu`}
        judul="Kamu tahu apa yang terjadi tiap minggu"
        ringkas="Jadwal di bawah ini kami cantumkan di kontrak. Kolom kanan sama pentingnya: pekerjaan mundur paling sering bukan karena kami lambat, tapi karena isi yang ditunggu belum datang."
      />

      <section className="py-20 md:py-28">
        <Kontainer>
          <ol className="border-t border-garis">
            {fase.map((f, i) => (
              <Muncul
                key={f.slug}
                as="li"
                jenis="naik"
                urutan={i % 3}
                durasi={1.2}
                className="grid gap-x-12 gap-y-8 border-b border-garis py-14 lg:grid-cols-[8rem_minmax(0,1fr)]"
              >
                <span className="mata text-biru tabular-nums">
                  M{f.mulai}
                  {f.selesai !== f.mulai && `–${f.selesai}`}
                </span>

                <div>
                  <h2 className="tampil text-layanan">{f.nama}</h2>
                  <p className="mt-6 max-w-2xl">{f.ringkas}</p>

                  <div className="mt-10 grid gap-10 sm:grid-cols-2">
                    <div>
                      <h3 className="mata text-tinta">Kamu terima</h3>
                      <ul className="mt-5 space-y-3">
                        {f.hasil.map((h) => (
                          <li key={h} className="flex gap-5 text-tinta">
                            <span aria-hidden className="mt-[0.7em] h-1 w-4 shrink-0 bg-biru" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mata text-abu">Kami butuh dari kamu</h3>
                      <ul className="mt-5 space-y-3">
                        {f.dariKlien.map((d) => (
                          <li key={d} className="flex gap-5">
                            <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-garis" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Muncul>
            ))}
          </ol>

          <Muncul jenis="naik" className="mt-12 max-w-2xl">
            <p className="text-sm">{catatanDurasi}</p>
          </Muncul>
        </Kontainer>
      </section>

      <section data-maju="lewat" className="morf py-20 text-putih md:py-28">
        <Kontainer>
          <Muncul jenis="naik">
            <h2 className="tampil max-w-3xl text-bagian text-putih">
              Tiga puluh hari pertama gratis
            </h2>
          </Muncul>
          <Muncul jenis="naik" urutan={1}>
            <p className="mt-8 max-w-2xl text-putih/85">
              Bug yang muncul dalam 30 hari setelah luncur kami perbaiki tanpa
              biaya. Setelah itu kamu bisa lanjut dengan perawatan bulanan, atau
              berjalan sendiri — domain, hosting, dan kode semuanya atas nama
              perusahaanmu, jadi tidak ada yang mengunci kamu di sini.
            </p>
          </Muncul>
        </Kontainer>
      </section>

      <Kerjasama />
    </>
  );
}
