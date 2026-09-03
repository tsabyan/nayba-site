import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { Tombol } from "@/components/ui/Tombol";
import { Plat } from "@/components/ui/Plat";
import { fakta, studio } from "@/content/studio";

const baris = ["Website", "dan", "Sistem"];

export function Hero() {
  return (
    <section className="flex min-h-[calc(100svh-5rem)] flex-col justify-center py-6 md:py-10">
      <Kontainer>
        {/* Side by side only from `lg`, where both columns are wide enough to
            keep their own shape. Below that the hero stacks and centres: a
            tablet split gave the panel a 285px column, too narrow to read as a
            companion to the headline rather than a leftover. Stacked, the panel
            spans the full measure and matches the text block above it. */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="text-center lg:text-left">
            <Muncul jenis="pudar" durasi={1.4}>
              <p className="mata text-biru">Studio web · {studio.kota}</p>
            </Muncul>

            {/* Cancels the display face's left side bearing so the headline
                optically lines up with the eyebrow. 0.021em is measured, not
                guessed: Barlow Condensed's ink starts 2–4px right of the box at
                this size, and the obvious 0.045em over-corrects by double.
                Only while left-aligned — centred text has no edge to line up
                with, and the pull just shifts the whole line off centre. */}
            <h1 className="tampil mt-5 text-raksasa lg:-ml-[0.021em]">
              {baris.map((b, i) => (
                <Muncul
                  key={b}
                  as="span"
                  jenis="naik"
                  urutan={i}
                  durasi={1.2}
                  className="block"
                >
                  {b}
                </Muncul>
              ))}
            </h1>

            <Muncul jenis="naik" urutan={3} durasi={1.2}>
              <p className="mata mt-5 text-tinta">Yang dipakai setiap hari</p>
            </Muncul>

            <Muncul jenis="naik" urutan={4} durasi={1.3}>
              <p className="mx-auto mt-6 max-w-xl text-lg lg:mx-0">
                Kami bangun website perusahaan dan aplikasi web. Ruang lingkup,
                jadwal, dan harga tetap kamu terima di akhir minggu pertama —
                sebelum itu tidak ada yang perlu dibayar.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Tombol href="/kontak">Kirim brief</Tombol>
                <Tombol href="/proses" jenis="garis">
                  Lihat cara kerja
                </Tombol>
              </div>
            </Muncul>
          </div>

          <Muncul jenis="kanan" urutan={2} durasi={1.4}>
            <Plat rasio="4 / 5" rasioDari="lg" nada="biru" className="w-full text-left lg:mx-auto lg:max-h-[62svh] lg:w-auto">
              <p className="mata text-putih/80">Yang kami pegang</p>

              <dl className="space-y-7">
                {fakta.map((f) => (
                  <div key={f.label} className="border-t border-putih/25 pt-5">
                    <dd className="tampil text-anak text-putih">{f.angka}</dd>
                    <dt className="mata mt-2 text-putih/80">{f.label}</dt>
                  </div>
                ))}
              </dl>
            </Plat>
          </Muncul>
        </div>
      </Kontainer>
    </section>
  );
}
