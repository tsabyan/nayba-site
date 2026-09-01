import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { keahlian } from "@/content/keahlian";

export function Keahlian() {
  return (
    <section className="py-20 md:py-28 lg:py-36">
      <Kontainer>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <Muncul jenis="pudar">
              <p className="mata text-biru">Keahlian</p>
            </Muncul>
            <Muncul jenis="naik">
              <h2 className="tampil mt-6 text-bagian">Yang kami bawa</h2>
            </Muncul>
            <Muncul jenis="naik" urutan={1}>
              <p className="mt-6 max-w-md">
                Layanan adalah yang kamu beli. Ini isinya — dikerjakan sendiri,
                bukan dialihkan ke pihak lain.
              </p>
            </Muncul>
          </div>

          <ul className="border-t border-garis">
            {keahlian.map((k, i) => (
              <Muncul
                key={k}
                as="li"
                jenis="kanan"
                urutan={i % 4}
                durasi={0.9}
                className="border-b border-garis"
              >
                <span className="pelan flex items-baseline gap-6 py-5 hover:text-biru">
                  <span className="tampil text-sm text-biru tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-anak font-semibold tracking-[0.01em] text-tinta uppercase">
                    {k}
                  </span>
                </span>
              </Muncul>
            ))}
          </ul>
        </div>
      </Kontainer>
    </section>
  );
}
