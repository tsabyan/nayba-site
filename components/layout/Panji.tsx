import type { ReactNode } from "react";
import { Kontainer } from "./Kontainer";
import { Muncul } from "@/components/ui/Muncul";

/** Inner-page banner. The reference sets these at 115px against the home page's 170px. */
export function Panji({
  mata,
  judul,
  ringkas,
  anak,
}: {
  mata: string;
  judul: ReactNode;
  ringkas?: string;
  anak?: ReactNode;
}) {
  return (
    <section className="border-b border-garis pt-16 pb-16 md:pt-24 md:pb-20">
      <Kontainer>
        <Muncul jenis="pudar">
          <p className="mata text-biru">{mata}</p>
        </Muncul>
        <Muncul jenis="naik" durasi={1.2}>
          <h1 className="tampil mt-7 max-w-4xl text-panji">{judul}</h1>
        </Muncul>
        {ringkas && (
          <Muncul jenis="naik" urutan={1} durasi={1.2}>
            <p className="mt-8 max-w-2xl text-lg">{ringkas}</p>
          </Muncul>
        )}
        {anak}
      </Kontainer>
    </section>
  );
}
