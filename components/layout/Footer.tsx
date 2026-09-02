import Link from "next/link";
import { studio } from "@/content/studio";
import { Kontainer } from "./Kontainer";

const sosial = [{ label: "WhatsApp", href: `https://wa.me/${studio.whatsapp}` }];

/**
 * The reference fixes its footer and lets the page scroll over it, so the CTA
 * is uncovered rather than scrolled to. `.kaki-terungkap` does the pinning, and
 * only above `md` — see globals.css.
 */
export function Footer() {
  return (
    <footer className="kaki-terungkap flex items-center bg-biru text-putih">
      <Kontainer className="py-16">
        <p className="mata text-putih/70">Punya proyek?</p>

        <p className="tampil mt-6 text-ajakan text-putih">
          Atau sapa kami di{" "}
          <a
            href={`https://wa.me/${studio.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pelan underline decoration-2 underline-offset-[0.12em] hover:text-tinta"
          >
            WhatsApp
          </a>
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-putih/25 pt-8">
          {sosial.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pelan font-display text-sm font-bold tracking-[1.1px] uppercase hover:text-tinta"
            >
              {s.label}
            </a>
          ))}
          <Link
            href="/kontak"
            className="pelan font-display text-sm font-bold tracking-[1.1px] uppercase hover:text-tinta"
          >
            Kirim brief
          </Link>

          <p className="ml-auto text-sm text-putih/70">
            © {new Date().getFullYear()} {studio.nama} · {studio.kota}, Indonesia
          </p>
        </div>
      </Kontainer>
    </footer>
  );
}
