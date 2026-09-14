import type { Metadata } from "next";
import Link from "next/link";
import { Panji } from "@/components/layout/Panji";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { Kerjasama } from "@/components/sections/Kerjasama";
import { Skema } from "@/components/Skema";
import { remah } from "@/lib/skema";
import { masalah } from "@/content/masalah";

export const metadata: Metadata = {
  title: "Masalah yang kami tangani",
  description:
    "Arsip yang hanya ada di lemari, dan pesanan yang masih diketik ulang dari chat. Dua bentuk masalah yang sudah pernah kami selesaikan, lengkap dengan proyeknya.",
};

export default function HalamanMasalah() {
  return (
    <>
      <Skema data={remah([{ nama: "Masalah", href: "/masalah" }])} />

      <Panji
        mata="Masalah"
        judul="Kami memilih pekerjaan dari bentuk masalahnya"
        ringkas="Bukan dari sektornya. Dinas yang arsipnya menumpuk dan yayasan yang arsipnya menumpuk punya masalah yang sama persis, dan solusinya juga sama — sementara dua perusahaan di industri yang sama bisa butuh dua hal yang sama sekali berbeda."
      />

      <section className="py-20 md:py-28">
        <Kontainer>
          <Muncul jenis="naik">
            <p className="max-w-2xl">
              Tiap halaman di bawah ditutup dengan proyek yang benar-benar kami
              kerjakan. Kalau belum ada proyeknya, halamannya belum kami buat —
              itu sebabnya daftar ini pendek.
            </p>
          </Muncul>

          <div className="mt-16 border-t border-garis">
            {masalah.map((m, i) => (
              <Muncul key={m.slug} jenis="naik" urutan={i}>
                <Link
                  href={`/masalah/${m.slug}`}
                  className="pelan group block border-b border-garis py-12 hover:bg-kabu"
                >
                  <p className="mata text-biru">{m.mata}</p>
                  <h2 className="tampil mt-5 max-w-3xl text-bagian group-hover:text-biru">
                    {m.nama}
                  </h2>
                  <p className="mt-6 max-w-2xl">{m.ringkas}</p>
                  <span className="pelan mt-8 inline-flex items-center gap-3 font-display text-sm font-bold tracking-[1.1px] text-biru uppercase group-hover:gap-5">
                    Selengkapnya <span aria-hidden>→</span>
                  </span>
                </Link>
              </Muncul>
            ))}
          </div>
        </Kontainer>
      </section>

      <Kerjasama />
    </>
  );
}
