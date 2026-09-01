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
        {/* Two columns from the top, so the panel sits beside the headline
            rather than below it — otherwise the upper right is a dead void. */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Muncul jenis="pudar" durasi={1.4}>
              <p className="mata text-biru">Studio web · {studio.kota}</p>
            </Muncul>

            {/* Cancels the display face's left side bearing so the headline
                optically lines up with the eyebrow. 0.021em is measured, not
                guessed: Barlow Condensed's ink starts 2–4px right of the box at
                this size, and the obvious 0.045em over-corrects by double. */}
            <h1 className="tampil mt-5 -ml-[0.021em] text-raksasa">
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
              <p className="mt-6 max-w-xl text-lg">
                Kami bangun website perusahaan dan aplikasi web. Ruang lingkup,
                jadwal, dan harga tetap kamu terima di akhir minggu pertama —
                sebelum itu tidak ada yang perlu dibayar.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Tombol href="/kontak">Kirim brief</Tombol>
                <Tombol href="/proses" jenis="garis">
                  Lihat cara kerja
                </Tombol>
              </div>
            </Muncul>
          </div>

          <Muncul jenis="kanan" urutan={2} durasi={1.4}>
            <Plat rasio="4 / 5" nada="biru" className="mx-auto max-h-[62svh] w-auto">
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
