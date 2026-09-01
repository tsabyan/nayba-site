import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Entrance reveal. Variants mirror the ones the reference template actually
 * uses (WOW.js + Animate.css): fadeIn, fadeInUp, fadeInLeft, fadeInRight,
 * zoomIn, bounceInUp.
 *
 * `urutan` staggers siblings; `durasi` matches the template's 1–2s range.
 */
const varian = {
  pudar: "",
  naik: "m-naik",
  kiri: "m-kiri",
  kanan: "m-kanan",
  zoom: "m-zoom",
  lambung: "m-lambung",
} as const;

export function Muncul({
  children,
  jenis = "naik",
  urutan = 0,
  durasi = 1,
  className = "",
  style,
  as: Tag = "div" as ElementType,
}: {
  children: ReactNode;
  jenis?: keyof typeof varian;
  urutan?: number;
  /** Seconds. The template runs 1s–2s. */
  durasi?: number;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}) {
  return (
    <Tag
      className={`muncul ${varian[jenis]} ${className}`}
      style={
        {
          "--tunda": `${urutan * 150}ms`,
          "--durasi": `${durasi}s`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
