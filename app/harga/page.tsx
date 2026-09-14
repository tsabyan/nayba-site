import type { Metadata } from "next";
import { Panji } from "@/components/layout/Panji";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { Tombol } from "@/components/ui/Tombol";
import { Kerjasama } from "@/components/sections/Kerjasama";
import { Skema } from "@/components/Skema";
import { remah, tanyaJawab } from "@/lib/skema";
import {
  anggaran,
  menaikkan,
  menurunkan,
  tanya,
  tidakDitagihTerpisah,
} from "@/content/harga";

export const metadata: Metadata = {
  title: "Harga",
  description:
    "Nayba tidak menjual paket. Ini rentang anggaran yang kami tanyakan, apa yang menaikkan dan menurunkan harga, dan kapan angka tetapnya kamu terima.",
};

export default function HalamanHarga() {
  return (
    <>
      <Skema data={remah([{ nama: "Harga", href: "/harga" }])} />
      <Skema data={tanyaJawab(tanya)} />

      <Panji
        mata="Harga"
        judul="Kami belum punya daftar harga"
        ringkas="Dan menayangkan angka yang belum pernah kami pakai sama saja mengarang. Yang bisa kami berikan sekarang: rentang anggaran yang kami tanyakan, apa yang membuat sebuah proyek mahal atau murah, dan kapan angka tetapnya kamu terima."
      />

      {/* The bracket list comes first because it is the only thing on this page
          that answers "am I in the right place" in one glance, and that is the
          question a visitor actually arrived with. */}
      <section className="py-20 md:py-28">
        <Kontainer>
          <Muncul jenis="naik">
            <h2 className="tampil max-w-3xl text-bagian">
              Rentang yang kami tanyakan
            </h2>
          </Muncul>
          <Muncul jenis="naik" urutan={1}>
            <p className="mt-6 max-w-2xl">
              Setiap brief yang masuk menyebut salah satu dari ini. Bukan harga
              — ini rentang anggaran yang kami pakai untuk tahu sejak awal
              apakah kita cocok, sebelum salah satu dari kita menghabiskan waktu.
            </p>
          </Muncul>

          <ul className="mt-14 max-w-3xl border-t border-garis">
            {anggaran.map((a, i) => (
              <Muncul
                key={a}
                as="li"
                jenis="naik"
                urutan={i % 3}
                className="flex items-baseline gap-6 border-b border-garis py-6"
              >
                <span aria-hidden className="mata text-biru">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-bold tracking-[0.01em] text-tinta uppercase">
                  {a}
                </span>
              </Muncul>
            ))}
          </ul>

          <Muncul jenis="naik" className="mt-12 max-w-2xl border-l-2 border-biru pl-6">
            <p>
              Kalau anggaranmu ada di bawah rentang terendah, bilang saja. Kami
              balas di pesan pertama kalau memang tidak cocok — bukan setelah
              tiga rapat.
            </p>
          </Muncul>
        </Kontainer>
      </section>

      <section data-maju="lewat" className="morf py-20 text-putih md:py-28">
        <Kontainer>
          <Muncul jenis="naik">
            <h2 className="tampil max-w-3xl text-bagian text-putih">
              Yang menentukan harganya
            </h2>
          </Muncul>

          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Muncul jenis="kiri">
              <h3 className="mata text-putih">Menaikkan</h3>
              <dl className="mt-8 space-y-8">
                {menaikkan.map((m) => (
                  <div key={m.judul} className="border-t border-putih/25 pt-5">
                    <dt className="font-display text-lg font-bold tracking-[0.01em] text-putih uppercase">
                      {m.judul}
                    </dt>
                    <dd className="mt-3 text-putih/85">{m.isi}</dd>
                  </div>
                ))}
              </dl>
            </Muncul>

            <Muncul jenis="kanan">
              <h3 className="mata text-putih/70">Menurunkan</h3>
              <dl className="mt-8 space-y-8">
                {menurunkan.map((m) => (
                  <div key={m.judul} className="border-t border-putih/25 pt-5">
                    <dt className="font-display text-lg font-bold tracking-[0.01em] text-putih uppercase">
                      {m.judul}
                    </dt>
                    <dd className="mt-3 text-putih/85">{m.isi}</dd>
                  </div>
                ))}
              </dl>
            </Muncul>
          </div>
        </Kontainer>
      </section>

      <section className="py-20 md:py-28">
        <Kontainer>
          <Muncul jenis="naik">
            <h2 className="tampil max-w-3xl text-bagian">
              Tidak pernah ditagih terpisah
            </h2>
          </Muncul>
          <ul className="mt-12 grid max-w-5xl gap-x-12 gap-y-6 sm:grid-cols-2">
            {tidakDitagihTerpisah.map((t, i) => (
              <Muncul
                key={t}
                as="li"
                jenis="naik"
                urutan={i % 2}
                className="flex gap-5 border-t border-garis pt-5 text-tinta"
              >
                <span aria-hidden className="mt-[0.7em] h-1 w-4 shrink-0 bg-biru" />
                {t}
              </Muncul>
            ))}
          </ul>
        </Kontainer>
      </section>

      <section className="border-t border-garis py-20 md:py-28">
        <Kontainer>
          <Muncul jenis="naik">
            <h2 className="tampil max-w-3xl text-bagian">
              Yang paling sering ditanya
            </h2>
          </Muncul>
          <dl className="mt-14 max-w-3xl border-t border-garis">
            {tanya.map((q, i) => (
              <Muncul
                key={q.t}
                jenis="naik"
                urutan={i}
                className="border-b border-garis py-8"
              >
                <dt className="font-display text-lg font-bold tracking-[0.01em] text-tinta uppercase">
                  {q.t}
                </dt>
                <dd className="mt-4">{q.j}</dd>
              </Muncul>
            ))}
          </dl>

          <Muncul jenis="naik" className="mt-14">
            <Tombol href="/kontak">Kirim brief</Tombol>
          </Muncul>
        </Kontainer>
      </section>

      <Kerjasama />
    </>
  );
}
