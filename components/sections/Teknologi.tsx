import Image from "next/image";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { kelompokTeknologi, teknologi, type Teknologi as Tek } from "@/content/teknologi";

function Ubin({ t }: { t: Tek }) {
  return (
    <li className="pelan group flex items-center gap-4 border border-putih/30 p-4 hover:border-putih hover:bg-putih">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-putih/30 group-hover:border-biru/30">
        {t.logo ? (
          <Image
            src={t.logo}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
        ) : (
          <span className="font-display text-lg font-extrabold tracking-[0.02em] text-putih uppercase group-hover:text-biru-gelap">
            {t.singkat}
          </span>
        )}
      </span>
      <span className="font-display text-base font-bold tracking-[1.1px] text-putih uppercase group-hover:text-biru-gelap">
        {t.nama}
      </span>
    </li>
  );
}

export function Teknologi() {
  return (
    <section data-maju="lewat" className="morf py-20 text-putih md:py-28 lg:py-32">
      <Kontainer>
        <Muncul jenis="pudar">
          <p className="mata text-putih/70">Teknologi</p>
        </Muncul>

        <Muncul jenis="naik">
          <h2 data-maju className="tampil lacak mt-6 max-w-3xl text-bagian text-putih">
            Yang kami pakai
          </h2>
        </Muncul>

        <Muncul jenis="naik" urutan={1}>
          <p className="mt-6 max-w-xl text-putih/85">
            Dipilih karena cocok dengan pekerjaannya, bukan karena sedang ramai
            dibicarakan. Kalau yang kamu butuhkan ada di luar daftar ini, kami
            bilang.
          </p>
        </Muncul>

        <div className="mt-16 space-y-12">
          {kelompokTeknologi.map((kel, gi) => (
            <Muncul key={kel} jenis="naik" urutan={gi % 3} durasi={1.1}>
              <h3 className="mata border-b border-putih/25 pb-4 text-putih/70">{kel}</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {teknologi
                  .filter((t) => t.kelompok === kel)
                  .map((t) => (
                    <Ubin key={t.nama} t={t} />
                  ))}
              </ul>
            </Muncul>
          ))}
        </div>
      </Kontainer>
    </section>
  );
}
