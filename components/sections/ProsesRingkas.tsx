import Link from "next/link";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { fase, TOTAL_MINGGU } from "@/content/proses";

export function ProsesRingkas() {
  return (
    <section className="border-y border-garis bg-kabu py-20 md:py-28 lg:py-36">
      <Kontainer>
        <Muncul jenis="pudar">
          <p className="mata text-biru">Proses</p>
        </Muncul>

        <Muncul jenis="naik">
          <h2 className="tampil mt-6 max-w-3xl text-bagian">
            {TOTAL_MINGGU} minggu, dengan tanggal
          </h2>
        </Muncul>

        <Muncul jenis="naik" urutan={1}>
          <p className="mt-6 max-w-xl">
            Kamu tahu apa yang terjadi tiap minggu, dan apa yang perlu disiapkan
            sebelum minggu itu tiba. Jadwal ini kami cantumkan di kontrak.
          </p>
        </Muncul>

        <ol className="mt-16 border-t border-garis">
          {fase.map((f, i) => (
            <Muncul
              key={f.slug}
              as="li"
              jenis="naik"
              urutan={i}
              durasi={1}
              className="grid gap-x-8 gap-y-3 border-b border-garis py-7 sm:grid-cols-[6rem_minmax(0,16rem)_minmax(0,1fr)] sm:items-baseline"
            >
              <span className="mata text-biru tabular-nums">
                M{f.mulai}
                {f.selesai !== f.mulai && `–${f.selesai}`}
              </span>
              <h3 className="font-display text-lg font-bold tracking-[0.01em] text-tinta uppercase">
                {f.nama}
              </h3>
              <p className="text-sm">{f.hasil.join(" · ")}</p>
            </Muncul>
          ))}
        </ol>

        <Muncul jenis="naik" className="mt-10">
          <Link
            href="/proses"
            className="pelan font-display text-sm font-bold tracking-[1.1px] text-biru uppercase hover:text-tinta"
          >
            Rincian tiap tahap →
          </Link>
        </Muncul>
      </Kontainer>
    </section>
  );
}
