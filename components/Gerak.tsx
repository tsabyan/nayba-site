"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The whole motion engine: entrance reveals plus every scroll-linked property.
 *
 * Deliberately built on a plain scroll listener. In draft 1, three separate
 * mechanisms failed for the same reason — each stops running when the page is
 * not being rendered: `animation-timeline: view()` is unsupported in several
 * engines, `IntersectionObserver` callbacks are suppressed while
 * `document.visibilityState` is "hidden", and `requestAnimationFrame` is
 * suspended outright. Scroll events fire regardless.
 *
 * Reveals are throttled (they do not need per-frame precision). Scroll-linked
 * values are written synchronously, because a throttled background morph looks
 * stepped — the browser already rate-limits scroll events to roughly a frame,
 * and there are under a dozen tracked elements per page.
 */
const REVEAL = ".muncul";
const LINKED = "[data-maju]";

/** Reveal once the element's top has risen into the lower part of the screen. */
const AMBANG = 0.9;

export function Gerak() {
  const pathname = usePathname();

  useEffect(() => {
    let sisa = Array.from(document.querySelectorAll<HTMLElement>(REVEAL));
    const terikat = Array.from(document.querySelectorAll<HTMLElement>(LINKED));
    const naik = document.querySelector<HTMLElement>("[data-naik]");
    let timer: ReturnType<typeof setTimeout> | undefined;

    const jepit = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

    /** Writes --maju for every scroll-linked element. Runs every scroll event. */
    const hitung = () => {
      const tinggi = window.innerHeight;

      for (const el of terikat) {
        const r = el.getBoundingClientRect();
        const maju =
          el.dataset.maju === "lewat"
            ? // Full pass: 0 as the element enters, 1 as it leaves. For section
              // backgrounds, which must finish morphing only once fully past.
              jepit((tinggi - r.top) / (tinggi + r.height))
            : // Reference default (`data-top`): finishes when the element's top
              // reaches the top of the viewport.
              jepit((tinggi - r.top) / tinggi);
        el.style.setProperty("--maju", maju.toFixed(4));
      }

      if (naik) naik.dataset.naik = window.scrollY > 600 ? "tampil" : "sembunyi";
    };

    const periksa = () => {
      timer = undefined;
      const batas = window.innerHeight * AMBANG;
      // No lower bound, so anything already scrolled past — a deep link, a
      // restored position — is revealed rather than stranded above the fold.
      sisa = sisa.filter((el) => {
        if (el.getBoundingClientRect().top >= batas) return true;
        el.classList.add("tampak");
        return false;
      });
    };

    function jadwalkan() {
      if (timer !== undefined) return;
      timer = setTimeout(periksa, 60);
    }

    function padaGulir() {
      hitung();
      jadwalkan();
    }

    window.addEventListener("scroll", padaGulir, { passive: true });
    window.addEventListener("resize", padaGulir);
    hitung();
    periksa();

    return () => {
      if (timer !== undefined) clearTimeout(timer);
      window.removeEventListener("scroll", padaGulir);
      window.removeEventListener("resize", padaGulir);
    };
  }, [pathname]);

  return null;
}
