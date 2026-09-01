import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";

const cocok = [
  "Ada satu orang di pihakmu yang bisa memutuskan",
  "Isi — teks, foto, data produk — sudah ada atau bisa disiapkan dalam dua minggu",
  "Kamu ingin bisa mengubah isi sendiri setelah luncur",
  "Anggaran dan jadwal ditetapkan di awal, bukan sambil jalan",
];

const kurangCocok = [
  "Butuh selesai dalam dua minggu",
  "Setiap keputusan desain harus lewat rapat besar",
  "Yang dicari adalah harga paling murah",
  "Butuh tim yang duduk di kantormu setiap hari",
];

/**
 * Stands where the content reference puts testimonials.
 *
 * Nayba has no quotes to publish and will not invent any. Saying plainly who
 * this is a bad fit for is something only an operating studio does, and it
 * qualifies leads better than praise would.
 */
export function Kecocokan() {
  return (
    <section className="py-20 md:py-28 lg:py-36">
      <Kontainer>
        <Muncul jenis="pudar">
          <p className="mata text-biru">Kecocokan</p>
        </Muncul>

        <Muncul jenis="naik">
          <h2 className="tampil mt-6 max-w-3xl text-bagian">
            Kami bukan untuk semua orang
          </h2>
        </Muncul>

        <Muncul jenis="naik" urutan={1}>
          <p className="mt-6 max-w-xl">
            Lebih hemat waktu kalau ini jelas sebelum kita bicara. Kalau kolom
            kanan lebih menggambarkan situasimu, katakan saja — kami bisa
            tunjukkan ke siapa sebaiknya bertanya.
          </p>
        </Muncul>

        <div className="mt-16 grid gap-x-16 gap-y-12 lg:grid-cols-2">
          <Muncul jenis="kiri">
            <h3 className="mata text-tinta">Cocok kalau</h3>
            <ul className="mt-6 border-t border-garis">
              {cocok.map((c) => (
                <li key={c} className="flex gap-5 border-b border-garis py-5 text-tinta">
                  <span aria-hidden className="mt-[0.7em] h-1 w-4 shrink-0 bg-biru" />
                  {c}
                </li>
              ))}
            </ul>
          </Muncul>

          <Muncul jenis="kanan">
            <h3 className="mata text-abu">Kurang cocok kalau</h3>
            <ul className="mt-6 border-t border-garis">
              {kurangCocok.map((c) => (
                <li key={c} className="flex gap-5 border-b border-garis py-5">
                  <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-garis" />
                  {c}
                </li>
              ))}
            </ul>
          </Muncul>
        </div>
      </Kontainer>
    </section>
  );
}
