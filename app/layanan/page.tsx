import type { Metadata } from "next";
import Link from "next/link";
import { Panji } from "@/components/layout/Panji";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { Kerjasama } from "@/components/sections/Kerjasama";
import { layanan } from "@/content/layanan";
import { masalah } from "@/content/masalah";
import { Skema } from "@/components/Skema";
import { remah } from "@/lib/skema";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Website perusahaan dalam 8 minggu, aplikasi web dan sistem internal dalam 12–16 minggu. Ruang lingkup dan harga tetap sejak minggu pertama.",
};

export default function HalamanLayanan() {
  return (
    <>
      <Skema data={remah([{ nama: "Layanan", href: "/layanan" }])} />

      <Panji
        mata="Layanan"
        judul="Apa yang kami kerjakan"
        ringkas="Kami sengaja tidak menawarkan semua. Dua jenis pekerjaan ini yang paling sering kami kerjakan, dan keduanya punya alur yang sudah teruji."
      />

      <section className="py-20 md:py-28">
        <Kontainer>
          <ul className="border-t border-garis">
            {layanan.map((l, i) => (
              <Muncul
                key={l.slug}
                as="li"
                jenis="naik"
                urutan={i}
                durasi={1.2}
                className="border-b border-garis"
              >
                <Link href={`/layanan/${l.slug}`} className="pelan group block py-14">
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
                    <div>
                      <span className="mata text-biru">{l.durasi}</span>
                      <h2 className="tampil pelan mt-5 text-layanan group-hover:text-biru">
                        {l.nama}
                      </h2>
                    </div>
                    <div>
                      <p>{l.ringkas}</p>
                      <ul className="mt-8 space-y-3">
                        {l.termasuk.slice(0, 4).map((t) => (
                          <li key={t} className="flex gap-5 text-sm text-tinta">
                            <span aria-hidden className="mt-[0.7em] h-1 w-4 shrink-0 bg-biru" />
                            {t}
                          </li>
                        ))}
                      </ul>
                      <span className="pelan mt-10 inline-flex items-center gap-3 font-display text-sm font-bold tracking-[1.1px] text-biru uppercase group-hover:gap-5">
                        Rincian lengkap <span aria-hidden>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Muncul>
            ))}
          </ul>
        </Kontainer>
      </section>

      {/* Entry point to the problem pages. They live outside the top nav — they
          are landing pages people arrive at from search, and a seventh nav item
          would cost every visitor something to serve a few. */}
      <section className="border-t border-garis py-20 md:py-28">
        <Kontainer>
          <Muncul jenis="naik">
            <p className="mata text-biru">Cara lain melihatnya</p>
          </Muncul>
          <Muncul jenis="naik" urutan={1}>
            <h2 className="tampil mt-7 max-w-3xl text-bagian">
              Kalau kamu lebih tahu masalahnya daripada namanya
            </h2>
          </Muncul>
          <Muncul jenis="naik" urutan={2}>
            <p className="mt-6 max-w-2xl">
              Tidak semua orang datang sambil tahu yang dibutuhkan itu
              &ldquo;aplikasi web&rdquo;. Lebih sering yang diketahui adalah
              pekerjaannya macet di mana.
            </p>
          </Muncul>

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {masalah.map((m, i) => (
              <Muncul key={m.slug} as="li" jenis="naik" urutan={i % 2}>
                <Link
                  href={`/masalah/${m.slug}`}
                  className="pelan group block h-full border-t border-garis pt-6 hover:border-biru"
                >
                  <p className="mata text-biru">{m.mata}</p>
                  <h3 className="tampil mt-4 text-anak group-hover:text-biru">
                    {m.nama}
                  </h3>
                  <span className="pelan mt-6 inline-flex items-center gap-3 font-display text-sm font-bold tracking-[1.1px] text-biru uppercase group-hover:gap-5">
                    Selengkapnya <span aria-hidden>→</span>
                  </span>
                </Link>
              </Muncul>
            ))}
          </ul>
        </Kontainer>
      </section>

      <Kerjasama />
    </>
  );
}
