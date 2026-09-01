import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* Pill radius and the reference's slow 0.8s hover. */
const dasar =
  "pil pelan inline-flex items-center justify-center gap-2 px-8 py-4 font-display text-sm font-bold tracking-[1.1px] uppercase disabled:pointer-events-none disabled:opacity-50";

const varian = {
  isi: "bg-biru text-putih hover:bg-biru-gelap",
  garis: "border-2 border-tinta text-tinta hover:bg-tinta hover:text-putih",
  terang: "border-2 border-putih text-putih hover:bg-putih hover:text-biru",
} as const;

type Varian = keyof typeof varian;

export function Tombol({
  href,
  children,
  jenis = "isi",
  luar = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  jenis?: Varian;
  luar?: boolean;
  className?: string;
}) {
  const kelas = `${dasar} ${varian[jenis]} ${className}`;
  if (luar) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={kelas}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={kelas}>
      {children}
    </Link>
  );
}

export function TombolAksi({
  children,
  jenis = "isi",
  className = "",
  ...rest
}: ComponentProps<"button"> & { jenis?: Varian }) {
  return (
    <button className={`${dasar} ${varian[jenis]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
