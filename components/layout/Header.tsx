"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

  return (
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
          type="button"
          onClick={() => setTerbuka((v) => !v)}
          aria-expanded={terbuka}
          aria-controls="menu-ponsel"
          className="mata -mr-2 px-2 py-2 text-tinta md:hidden"
        >
          {terbuka ? "Tutup" : "Menu"}
        </button>
      </div>

      {terbuka && (
        <nav
          id="menu-ponsel"
          aria-label="Utama, ponsel"
          className="border-t border-garis px-6 pb-6 md:hidden"
        >
          {tautan.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              onClick={() => setTerbuka(false)}
              className="font-display block border-b border-garis py-4 text-xl font-bold tracking-[1.1px] text-tinta uppercase"
            >
              {t.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
