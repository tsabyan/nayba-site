import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { kerjasama } from "@/content/kerjasama";

export function Kerjasama() {
  return (
    <section className="border-t border-garis py-20 md:py-28 lg:py-32">
      <Kontainer>
        <Muncul jenis="naik">
          <h2 className="tampil max-w-3xl text-bagian">Tiga cara bekerja sama</h2>
        </Muncul>

        <dl className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {kerjasama.map((k, i) => (
            <Muncul key={k.nama} jenis="naik" urutan={i} durasi={1.2}>
              <dt className="tampil flex items-baseline gap-4 text-anak">
                <span className="text-sm text-biru tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {k.nama}
              </dt>
              <dd className="mt-5">{k.isi}</dd>
            </Muncul>
          ))}
        </dl>
      </Kontainer>
    </section>
  );
}
