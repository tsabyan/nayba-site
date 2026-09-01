import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { fakta } from "@/content/studio";

/**
 * Stands where the reference content model puts a client logo wall.
 *
 * Nayba has no logos to show, and a thin or invented one is worse than none.
 * These four numbers are things only a studio that has actually run projects
 * knows, which is the same job the logo wall was doing.
 */
export function Fakta() {
  return (
    <section className="border-y border-garis bg-kabu py-20 md:py-28">
      <Kontainer>
        <Muncul jenis="pudar">
          <p className="mata text-biru">Angka yang kami pegang</p>
        </Muncul>

        <dl className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {fakta.map((f, i) => (
            <Muncul key={f.label} jenis="naik" urutan={i} durasi={1.2}>
              <dd className="tampil text-karya text-biru">{f.angka}</dd>
              <dt className="mata mt-4 text-tinta">{f.label}</dt>
              <p className="mt-3 text-sm">{f.catatan}</p>
            </Muncul>
          ))}
        </dl>
      </Kontainer>
    </section>
  );
}
