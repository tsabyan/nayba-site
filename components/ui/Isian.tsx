import type { ReactNode } from "react";

export const kelasKontrol =
  "mt-3 min-h-16 w-full border-2 border-garis bg-putih px-5 py-4 text-tinta pelan placeholder:text-abu focus:border-biru";

/* The native select arrow sits against the padding edge, so it needs the same
   breathing room on the right that the text has on the left — otherwise it
   reads as jammed into the border. */
export const kelasPilih = `${kelasKontrol} pr-12`;

export function Isian({
  label,
  nama,
  anak,
  catatan,
}: {
  label: string;
  nama: string;
  anak: ReactNode;
  catatan?: string;
}) {
  return (
    <div>
      <label htmlFor={nama} className="mata text-tinta">
        {label}
      </label>
      {anak}
      {catatan && (
        <p id={`${nama}-catatan`} className="mt-2 text-xs">
          {catatan}
        </p>
      )}
    </div>
  );
}
