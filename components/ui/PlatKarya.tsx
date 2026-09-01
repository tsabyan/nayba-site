import Image from "next/image";
import { Plat } from "./Plat";
import { namaKlien, type Karya } from "@/lib/content";

/**
 * A project's visual slot: the real screenshot once one exists, otherwise a
 * designed panel of the project's own facts.
 *
 * Both branches carry the scroll-linked scale, so the effect is live and
 * testable today rather than only after the images land — which is exactly when
 * a regression in it would go unnoticed.
 */
export function PlatKarya({
  karya,
  urutan,
  rasio = "16 / 10",
  nada = "biru",
  skala = false,
}: {
  karya: Karya;
  urutan: number;
  rasio?: string;
  nada?: "biru" | "gelap" | "terang";
  skala?: boolean;
}) {
  const utama = karya.hasil[0];
  const gerak = skala ? { className: "skala", "data-maju": "" } : {};

  if (karya.gambarUtama) {
    return (
      <div
        style={{ aspectRatio: rasio }}
        className="relative overflow-hidden bg-kabu"
      >
        <Image
          src={karya.gambarUtama}
          alt=""
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          {...gerak}
          className={`object-cover ${skala ? "skala" : ""}`}
        />
      </div>
    );
  }

  return (
    <Plat rasio={rasio} nada={nada} skala={skala}>
      <div className="flex items-start justify-between gap-6">
        <span className="tampil text-kategori leading-none tabular-nums">
          {String(urutan).padStart(2, "0")}
        </span>
        <span className="mata opacity-80">{karya.tahun}</span>
      </div>

      <div>
        {utama && <p className="tampil text-karya">{utama.angka}</p>}
        {utama && <p className="mata mt-3 opacity-80">{utama.label}</p>}

        <p className="mata mt-8 border-t border-current/25 pt-5 opacity-80">
          {namaKlien(karya)}
        </p>
        <p className="mata mt-2 opacity-70">
          {karya.layanan.join(" · ")} · {karya.durasiMinggu} minggu
        </p>
      </div>
    </Plat>
  );
}
