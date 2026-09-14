import Link from "next/link";
import { studio } from "@/content/studio";
import { pesanWA } from "@/lib/wa";
import { TautanWA } from "@/components/ui/TautanWA";
import { Kontainer } from "./Kontainer";

/**
 * The reference fixes its footer and lets the page scroll over it, so the CTA
 * is uncovered rather than scrolled to. `.kaki-terungkap` does the pinning, and
 * only above `md` — see globals.css.
 *
 * Centred below `md`. Left-aligned works on desktop because the CTA sits in a
 * wide measure with the copyright pushed to the far right; on a phone that
 * collapses to a narrow ragged column with everything hugging one edge.
 */
export function Footer() {
  return (
    <footer className="kaki-terungkap flex items-center bg-biru text-putih">
      <Kontainer className="py-16 max-md:text-center">
        <p className="mata text-putih/70">Punya proyek?</p>

        <p className="tampil mt-6 text-ajakan text-putih">
          Atau sapa kami di{" "}
          <TautanWA
            asal="kaki-ajakan"
            pesan={pesanWA.umum}
            className="pelan underline decoration-2 underline-offset-[0.12em] hover:text-tinta"
          >
            WhatsApp
          </TautanWA>
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-putih/25 pt-8 max-md:justify-center">
          <TautanWA
            asal="kaki-tautan"
            pesan={pesanWA.umum}
            className="pelan font-display text-sm font-bold tracking-[1.1px] uppercase hover:text-tinta"
          >
            WhatsApp
          </TautanWA>
          <Link
            href="/kontak"
            className="pelan font-display text-sm font-bold tracking-[1.1px] uppercase hover:text-tinta"
          >
            Kirim brief
          </Link>

          {/* `ml-auto` is what pushes this to the far right on desktop, so it
              has to be dropped for the centred stack to actually centre. */}
          <p className="text-sm text-putih/70 md:ml-auto max-md:w-full">
            © {new Date().getFullYear()} {studio.nama} · {studio.kota}, Indonesia
          </p>
        </div>
      </Kontainer>
    </footer>
  );
}
