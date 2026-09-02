"use client";

/** Scroll-to-top, matching the reference's `.scroltop`. Visibility is toggled
 *  by Gerak via the data attribute, so there is one scroll listener on the page. */
export function AtasCepat() {
  return (
    <button
      type="button"
      data-naik="sembunyi"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Kembali ke atas"
      className="pelan pil fixed right-6 bottom-6 z-50 md:right-10 md:bottom-10 lg:right-16 flex h-12 w-12 items-center justify-center bg-tinta text-putih data-[naik=sembunyi]:pointer-events-none data-[naik=sembunyi]:translate-y-3 data-[naik=sembunyi]:opacity-0 hover:bg-biru"
    >
      <span aria-hidden>↑</span>
    </button>
  );
}
