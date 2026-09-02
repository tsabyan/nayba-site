import type { CSSProperties, ReactNode } from "react";

/**
 * A designed panel that stands in for photography.
 *
 * Nayba has no screenshots yet, and the two dishonest options were both on the
 * table: a stock "website mockup" would imply it was the client's work, and an
 * empty dashed box made finished projects look unfinished. This does neither —
 * it renders facts the project actually has, set in the display face, so the
 * space carries information instead of an apology.
 *
 * When real screenshots arrive they replace this outright; nothing about the
 * layout has to change, because the ratio is the same.
 */
export function Plat({
  children,
  rasio = "16 / 10",
  rasioDari = "md",
  nada = "biru",
  skala = false,
  className = "",
}: {
  children: ReactNode;
  rasio?: string;
  /**
   * Breakpoint from which the ratio governs the height. Below it, content does.
   *
   * A ratio only holds its shape while the column is wide enough for the text
   * inside it. The hero panel sits in the narrower of two tablet columns, where
   * 4/5 resolves to 356px against 440px of facts — so it asks for `lg`.
   */
  rasioDari?: "md" | "lg";
  nada?: "biru" | "gelap" | "terang";
  /** Attach the scroll-linked scale to the panel's surface. */
  skala?: boolean;
  className?: string;
}) {
  const warna = {
    biru: "bg-biru text-putih",
    gelap: "bg-biru-gelap text-putih",
    terang: "bg-kabu text-tinta",
  }[nada];

  /* Both arms are written out in full because Tailwind reads source text, not
     runtime values — a composed class name would emit neither. The floor only
     stops a sparse panel from collapsing once the ratio is off. */
  const kelasRasio = {
    md: "max-md:min-h-72 md:aspect-[var(--rasio)]",
    lg: "max-lg:min-h-72 lg:aspect-[var(--rasio)]",
  }[rasioDari];

  return (
    <div
      style={{ "--rasio": rasio } as CSSProperties}
      className={`relative overflow-hidden ${kelasRasio} ${warna} ${className}`}
    >
      <div
        aria-hidden
        className={`motif absolute inset-0 ${skala ? "skala" : ""}`}
        {...(skala ? { "data-maju": "" } : {})}
      />
      <div className="relative flex h-full flex-col justify-between p-8 lg:p-10">
        {children}
      </div>
    </div>
  );
}
