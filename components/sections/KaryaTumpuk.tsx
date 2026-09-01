import Link from "next/link";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { karyaTerpilih } from "@/lib/content";
import { KartuKarya } from "./KartuKarya";

/**
 * The reference's signature: cards pin and stack on top of one another as the
 * section scrolls. Pure CSS sticky — no JavaScript involved.
 *
 * The tail spacer is load-bearing, not padding. A sticky element is clamped so
 * its bottom cannot pass its container's bottom — `top <= containerBottom -
 * height`. With equal-height cards in one container that clamp is identical for
 * all of them, so on the way out they all collapse onto the same line and the
 * strips vanish exactly when the whole stack is still on screen.
 *
 * Giving each sticky element a transparent tail one strip shorter than the last
 * makes those clamps differ by exactly one strip, so the offsets hold through
 * the exit and every card keeps showing its number and title.
 */
export function KaryaTumpuk() {
  const karya = karyaTerpilih(4);
  if (karya.length === 0) return null;

  return (
    <section className="py-20 md:pt-28 md:pb-24 lg:pt-36 lg:pb-28">
      <Kontainer>
        <Muncul jenis="pudar">
          <p className="mata text-biru">Pekerjaan</p>
        </Muncul>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <Muncul jenis="naik">
            <h2 className="tampil max-w-3xl text-bagian">Yang sudah kami kerjakan</h2>
          </Muncul>
          <Muncul jenis="naik" urutan={1}>
            <Link
              href="/portofolio"
              className="pelan font-display text-sm font-bold tracking-[1.1px] text-biru uppercase hover:text-tinta"
            >
              Semua pekerjaan →
            </Link>
          </Muncul>
        </div>

        <div className="mt-16">
          {karya.map((k, i) => (
            <div
              key={k.slug}
              data-kartu={i + 1}
              style={{
                zIndex: i + 1,
                top: `calc(5rem + ${i} * var(--strip-karya))`,
              }}
              className="static mb-8 md:sticky md:mb-0"
            >
              <KartuKarya karya={k} urutan={i + 1} />
            </div>
          ))}

          {/* Runway. The last card is the container's final element, so without
              this its sticky clamp equals its own flow position and it can
              never rise to meet the others — the stack would always end one
              card short of merged.

              This replaced per-card tails, which staggered the release but left
              228 / 152 / 76 / 0 px of dead space under the cards in flow — read
              as inconsistent gaps between projects, because that is what it
              was. The section's own bottom padding is dropped on desktop so
              this runway is the only trailing space, not an addition to it. */}
          <div aria-hidden className="hidden md:block md:h-[32vh]" />
        </div>
      </Kontainer>
    </section>
  );
}
