import type { Metadata } from "next";
import Link from "next/link";
import { Panji } from "@/components/layout/Panji";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { PlatKarya } from "@/components/ui/PlatKarya";
import { namaKlien, semuaKarya } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portofolio",
  description:
    "Pekerjaan yang sudah kami selesaikan: konteksnya, keputusan yang diambil, dan hasil yang bisa diukur.",
};

/* The reference's works grid mixes portrait and landscape crops rather than a
   uniform tile. Ratios and tones cycle so the masonry keeps that rhythm. */
const rasio = ["3 / 4", "16 / 10", "4 / 5"];
const nada = ["biru", "gelap", "terang"] as const;

export default function HalamanPortofolio() {
  const karya = semuaKarya();

  return (
    <>
      <Panji
        mata="Portofolio"
        judul="Pekerjaan yang sudah selesai"
        ringkas="Setiap halaman berisi konteks masalahnya, keputusan yang kami ambil beserta alasannya, dan hasil yang bisa diukur. Sebagian klien tidak bisa disebut namanya, jadi kami tulis sektornya."
      />

      <section className="py-20 md:py-28">
        <Kontainer>
          {karya.length === 0 ? (
            <p>Belum ada yang bisa ditampilkan di sini.</p>
          ) : (
            <div className="gap-8 md:columns-2">
              {karya.map((k, i) => (
                <Muncul
                  key={k.slug}
                  jenis={i % 2 === 0 ? "naik" : "lambung"}
                  urutan={i % 2}
                  durasi={1.2}
                  className="mb-8 break-inside-avoid"
                >
                  <Link href={`/portofolio/${k.slug}`} className="group block">
                    <div className="pelan group-hover:opacity-90">
                      <PlatKarya
                        karya={k}
                        urutan={i + 1}
                        rasio={rasio[i % rasio.length]}
                        nada={nada[i % nada.length]}
                      />
                    </div>
                    <div className="mt-6 flex items-baseline gap-5">
                      <span className="tampil text-sm text-biru tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mata text-abu">{namaKlien(k)}</span>
                    </div>
                    <h2 className="tampil pelan mt-4 text-karya group-hover:text-biru">
                      {k.judul}
                    </h2>
                    <p className="mt-4 max-w-lg text-sm">{k.ringkasan}</p>
                  </Link>
                </Muncul>
              ))}
            </div>
          )}
        </Kontainer>
      </section>
    </>
  );
}
