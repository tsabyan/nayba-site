import type { Metadata } from "next";
import Link from "next/link";
import { Panji } from "@/components/layout/Panji";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { PlatKarya } from "@/components/ui/PlatKarya";
import { Tombol } from "@/components/ui/Tombol";
import { namaKlien, semuaKarya } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portofolio",
  description:
    "Pekerjaan yang sudah kami selesaikan: konteksnya, keputusan yang diambil, dan hasil yang bisa diukur.",
};

/* The reference's works grid mixes portrait and landscape crops, which needs a
   wall of projects to read as rhythm. At two it reads as inconsistency, and it
   would mean exporting a portrait, a landscape and a square of the same
   screenshot. One ratio, cycling tones only. */
const nada = ["biru", "gelap", "terang"] as const;

export default function HalamanPortofolio() {
  const karya = semuaKarya();

  return (
    <>
      {/* The banner has to agree with the page under it. "Pekerjaan yang sudah
          selesai" above a panel saying there is none reads as a page that
          failed to load rather than a studio that is honest about its age. */}
      {karya.length === 0 ? (
        <Panji
          mata="Portofolio"
          judul="Pekerjaan kami"
          ringkas="Nayba masih baru, dan studi kasus pertama sedang kami siapkan. Halaman ini hanya akan berisi pekerjaan yang benar-benar kami kerjakan sendiri."
        />
      ) : (
        <Panji
          mata="Portofolio"
          judul="Pekerjaan yang sudah selesai"
          ringkas="Setiap halaman berisi konteks masalahnya, keputusan yang kami ambil beserta alasannya, dan hasil yang bisa diukur. Sebagian klien tidak bisa disebut namanya, jadi kami tulis sektornya."
        />
      )}

      <section className="py-20 md:py-28">
        <Kontainer>
          {karya.length === 0 ? (
            /* Deliberately says the true thing rather than nothing. A studio
               with no published work is a normal state; a page that only says
               "belum ada" reads as broken, and the visitor who got this far is
               the one most worth answering. */
            <div className="max-w-2xl">
              <Muncul jenis="naik">
                <h2 className="tampil text-bagian">Belum ada yang bisa kami publikasikan</h2>
              </Muncul>
              <Muncul jenis="naik" urutan={1}>
                <p className="mt-6">
                  Studi kasus pertama sedang kami tulis. Kami tidak memasang
                  contoh atau pekerjaan orang lain di halaman ini — kalau nanti
                  ada nama klien di sini, artinya mereka sudah mengizinkan.
                </p>
                <p className="mt-4">
                  Sementara itu, cara paling cepat menilai kami adalah dengan
                  melihat bagaimana kami bekerja, atau langsung bertanya. Kami
                  bisa menunjukkan pekerjaan yang belum boleh dipublikasikan
                  lewat panggilan.
                </p>
              </Muncul>
              <Muncul jenis="naik" urutan={2}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Tombol href="/kontak">Tanya lewat brief</Tombol>
                  <Tombol href="/proses" jenis="garis">
                    Lihat cara kerja
                  </Tombol>
                </div>
              </Muncul>
            </div>
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
                        rasio="16 / 11"
                        nada={nada[i % nada.length]}
                        sizes="(min-width: 1400px) 600px, (min-width: 768px) 45vw, 100vw"
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
