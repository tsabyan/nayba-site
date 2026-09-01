import Link from "next/link";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { layanan } from "@/content/layanan";

/**
 * Services as large headings rather than small cards — the reference sets them
 * at 55px. The panel background is scroll-linked, morphing light cobalt to deep
 * navy as it passes.
 */
export function Layanan() {
  return (
    <section
      data-maju="lewat"
      className="morf py-20 text-putih md:py-28 lg:py-36"
    >
      <Kontainer>
        <Muncul jenis="pudar">
          <p className="mata text-putih/70">Layanan</p>
        </Muncul>

        <Muncul jenis="naik">
          <h2 data-maju className="tampil lacak mt-6 max-w-3xl text-kategori text-putih">
            Dua hal, sampai tuntas
          </h2>
        </Muncul>

        <ul className="mt-16 border-t border-putih/25">
          {layanan.map((l, i) => (
            <Muncul
              key={l.slug}
              as="li"
              jenis="naik"
              urutan={i}
              durasi={1.2}
              className="border-b border-putih/25"
            >
              <Link href={`/layanan/${l.slug}`} className="pelan group block py-12">
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
                  <h3 className="tampil pelan text-layanan text-putih group-hover:translate-x-2">
                    {l.nama}
                  </h3>
                  <span className="mata text-putih/70">{l.durasi}</span>
                </div>

                <p className="mt-6 max-w-2xl text-putih/85">{l.ringkas}</p>

                <span className="pelan mt-8 inline-flex items-center gap-3 font-display text-sm font-bold tracking-[1.1px] text-putih uppercase group-hover:gap-5">
                  Rincian layanan <span aria-hidden>→</span>
                </span>
              </Link>
            </Muncul>
          ))}
        </ul>
      </Kontainer>
    </section>
  );
}
