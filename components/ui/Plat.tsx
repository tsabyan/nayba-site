import type { ReactNode } from "react";

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
  nada = "biru",
  skala = false,
  className = "",
}: {
  children: ReactNode;
  rasio?: string;
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

  return (
    <div
      style={{ aspectRatio: rasio }}
      className={`relative overflow-hidden ${warna} ${className}`}
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
