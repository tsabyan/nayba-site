import Link from "next/link";
import { PlatKarya } from "@/components/ui/PlatKarya";
import { namaKlien, type Karya } from "@/lib/content";

/**
 * One project.
 *
 * The header strip is deliberately its own band: when these cards stack, the
 * strip is the only part of a covered card still showing, so it has to carry
 * enough to identify the project on its own. Its height is what sets the sticky
 * offset step in KaryaTumpuk — change one and the other must follow.
 */
export function KartuKarya({ karya, urutan }: { karya: Karya; urutan: number }) {
  const utama = karya.hasil[0];

  return (
    <Link
      href={`/portofolio/${karya.slug}`}
      className="pelan group block border border-garis bg-putih hover:border-biru"
    >
      <div className="flex h-[var(--strip-karya)] items-center gap-x-5 border-b border-garis px-8 lg:px-10">
        <span className="tampil text-anak text-biru tabular-nums">
          {String(urutan).padStart(2, "0")}
        </span>
        <span className="mata truncate text-tinta">{karya.judul}</span>
        <span className="mata ml-auto hidden shrink-0 text-abu sm:block">
          {namaKlien(karya)}
        </span>
      </div>

      <div className="grid gap-10 p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:p-10">
        <div>
          <p className="max-w-md">{karya.ringkasan}</p>

          {utama && (
            <p className="mt-8">
              <span className="tampil text-karya text-biru">{utama.angka}</span>
              <span className="mata mt-3 block text-abu">{utama.label}</span>
            </p>
          )}

          {/* The stack sits on the project rather than in a wall of its own.
              A list of logos says what we have touched; the same names under a
              project say what we chose for that problem, which is the question
              a client is actually asking. */}
          {karya.tumpukan.length > 0 && (
            <p className="mt-8 border-t border-garis pt-5 text-sm text-abu">
              {karya.tumpukan.join(" · ")}
            </p>
          )}

          <p className="mata pelan mt-8 inline-flex items-center gap-3 text-biru group-hover:gap-5">
            Baca ceritanya <span aria-hidden>→</span>
          </p>
        </div>

        <PlatKarya
          karya={karya}
          urutan={urutan}
          rasio="16 / 11"
          sizes="(min-width: 1024px) 30vw, 100vw"
        />
      </div>
    </Link>
  );
}
