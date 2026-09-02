"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Tanda } from "./Tanda";

const tautan = [
  { href: "/layanan", label: "Layanan" },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/proses", label: "Proses" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export function Header() {
  const [terbuka, setTerbuka] = useState(false);
  const pathname = usePathname();

  /* Every link in the panel closes it on click, but the back button does not go
     through them — it would leave the menu open over a page the visitor did not
     choose it from. Adjusted during render rather than in an effect, so there
     is no frame where the stale panel is painted. */
  const [jalurTerakhir, setJalurTerakhir] = useState(pathname);
  if (jalurTerakhir !== pathname) {
    setJalurTerakhir(pathname);
    setTerbuka(false);
  }

  const panelRef = useRef<HTMLElement>(null);
  const tombolRef = useRef<HTMLButtonElement>(null);

  /**
   * Dismissal — Escape or the backdrop — as opposed to the panel closing
   * because a link was followed.
   *
   * Focus returns to the toggle here and nowhere else. Doing it in the effect
   * cleanup instead would also fire on navigation, which would announce "Menu"
   * to a screen reader at the moment the visitor arrived on a new page.
   */
  const tutup = () => {
    setTerbuka(false);
    tombolRef.current?.focus();
  };

  useEffect(() => {
    if (!terbuka) return;

    /* An open overlay that leaves the page behind it tabbable is worse than no
       overlay: focus walks off into content the visitor cannot see. The toggle
       is deliberately part of the cycle rather than excluded from it — it is
       the Tutup button, so it has to stay reachable from inside. */
    const fokusable = () => [
      tombolRef.current,
      ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []),
    ].filter((el): el is HTMLElement => el !== null);

    const padaTombol = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        tutup();
        return;
      }
      if (e.key !== "Tab") return;

      const urut = fokusable();
      if (urut.length === 0) return;
      const i = urut.indexOf(document.activeElement as HTMLElement);
      const lanjut = e.shiftKey ? i - 1 : i + 1;
      // Anything outside the cycle (i === -1) re-enters at the first item.
      const tujuan = urut[((i === -1 ? 0 : lanjut) + urut.length) % urut.length];
      e.preventDefault();
      tujuan.focus();
    };
    window.addEventListener("keydown", padaTombol);

    /* Scrolling the page behind a fixed panel reads as a broken overlay. Locked
       on <body> rather than <html> so `scroll-behavior: smooth` and the sticky
       header keep working when it is released. */
    const semula = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    /* Opened by pointer or by keyboard, the first link is where the panel's
       content starts, so that is where reading should resume. */
    const pertama = panelRef.current?.querySelector<HTMLElement>("a[href]");
    pertama?.focus();

    return () => {
      window.removeEventListener("keydown", padaTombol);
      document.body.style.overflow = semula;
    };
  }, [terbuka]);

  return (
    <>
      {/* z-40, above the panel, so the Tutup button stays reachable while the
          menu is open — the panel slides in underneath the bar. */}
      <header className="sticky top-0 z-40 border-b border-garis bg-putih/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-isi items-center justify-between px-6 py-5 md:px-10 lg:px-16">
          <Link href="/" aria-label="Nayba, ke beranda">
            <Tanda />
          </Link>

          <nav aria-label="Utama" className="hidden items-center gap-9 md:flex">
            {tautan.map((t) => {
              const aktif = pathname.startsWith(t.href);
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  aria-current={aktif ? "page" : undefined}
                  className={`pelan font-display text-sm font-bold tracking-[1.1px] uppercase ${
                    aktif ? "text-biru" : "text-tinta hover:text-biru"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </nav>

          <button
            ref={tombolRef}
            type="button"
            onClick={() => setTerbuka((v) => !v)}
            aria-expanded={terbuka}
            aria-controls="menu-ponsel"
            className="mata -mr-2 px-2 py-2 text-tinta md:hidden"
          >
            {terbuka ? "Tutup" : "Menu"}
          </button>
        </div>
      </header>

      {/* The panel stays mounted so it animates on the way out as well as in.
          `inert` is what keeps a closed panel out of the tab order and out of
          the accessibility tree — visibility alone would leave five links
          reachable behind the page. */}
      <div
        aria-hidden={!terbuka}
        inert={!terbuka}
        data-buka={terbuka}
        className="md:hidden"
      >
        {/* `inert` on the wrapper already blocks pointer events on a closed
            panel, so the backdrop needs no separate guard. */}
        <button
          type="button"
          tabIndex={-1}
          aria-label="Tutup menu"
          onClick={tutup}
          className="tirai-latar fixed inset-0 z-30 bg-tinta/40"
        />

        <nav
          ref={panelRef}
          id="menu-ponsel"
          aria-label="Utama, ponsel"
          className="tirai fixed top-0 right-0 z-30 flex h-dvh w-[min(19rem,82vw)] flex-col overflow-y-auto border-l border-garis bg-putih px-6 pt-24 pb-10"
        >
          {tautan.map((t, i) => {
            const aktif = pathname.startsWith(t.href);
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={aktif ? "page" : undefined}
                onClick={() => setTerbuka(false)}
                style={{ "--urut": i } as React.CSSProperties}
                className={`tirai-item font-display block border-b border-garis py-4 text-xl font-bold tracking-[1.1px] uppercase ${
                  aktif ? "text-biru" : "text-tinta"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
