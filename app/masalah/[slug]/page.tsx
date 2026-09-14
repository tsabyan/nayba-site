import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Panji } from "@/components/layout/Panji";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { Tombol } from "@/components/ui/Tombol";
import { Kerjasama } from "@/components/sections/Kerjasama";
import { Skema } from "@/components/Skema";
import { dasar, idOrganisasi, remah, tanyaJawab } from "@/lib/skema";
import { masalah, satuMasalah } from "@/content/masalah";
import { namaKlien, satuKarya } from "@/lib/content";

export function generateStaticParams() {
  return masalah.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/masalah/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = satuMasalah(slug);
  if (!m) return {};
  return { title: m.nama, description: m.ringkas };
}

export default async function HalamanMasalah({
  params,
}: PageProps<"/masalah/[slug]">) {
  const { slug } = await params;
  const m = satuMasalah(slug);
  if (!m) notFound();

  /**
   * The case study behind the claim.
   *
   * `bukti` is a required field, so a page can only exist while the project it
   * points at does. If the MDX is ever renamed or unpublished this resolves to
   * undefined and the evidence section disappears — which is the correct
   * failure: the page stops asserting something it can no longer show.
   */
  const bukti = satuKarya(m.bukti);

  const skemaLayanan = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${dasar}/masalah/${m.slug}#layanan`,
    name: m.nama,
    description: m.ringkas,
    provider: { "@id": idOrganisasi },
    areaServed: { "@type": "Country", name: "Indonesia" },
    availableLanguage: ["id"],
    url: `${dasar}/masalah/${m.slug}`,
  };

  return (
    <>
      <Skema data={skemaLayanan} />
      <Skema
        data={remah([
          { nama: "Masalah", href: "/masalah" },
          { nama: m.nama, href: `/masalah/${m.slug}` },
        ])}
      />
      <Skema data={tanyaJawab(m.tanya)} />

      <Panji mata={m.mata} judul={m.nama} ringkas={m.ringkas} />

      <section className="py-20 md:py-28">
        <Kontainer>
          <Muncul jenis="naik">
            <h2 className="tampil max-w-3xl text-bagian">
              Kamu mungkin mengenali ini
            </h2>
          </Muncul>
          <Muncul jenis="naik" urutan={1}>
            <p className="mt-6 max-w-2xl">
              Kalau tiga di antaranya terasa familier, halaman ini sedang
              berbicara ke situasimu.
            </p>
          </Muncul>
          <ul className="mt-12 grid max-w-5xl gap-x-12 gap-y-6 sm:grid-cols-2">
            {m.tanda.map((t, i) => (
              <Muncul
                key={t}
                as="li"
                jenis="naik"
                urutan={i % 2}
                className="flex gap-5 border-t border-garis pt-5 text-tinta"
              >
                <span aria-hidden className="mt-[0.7em] h-1 w-4 shrink-0 bg-biru" />
                {t}
              </Muncul>
            ))}
          </ul>
        </Kontainer>
      </section>

      <section data-maju="lewat" className="morf py-20 text-putih md:py-28">
        <Kontainer>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Muncul jenis="kiri">
              <h2 className="mata text-putih">Yang kami bangun</h2>
              <ul className="mt-8 space-y-4">
                {m.yangKamiBangun.map((y) => (
                  <li key={y} className="flex gap-5 text-putih">
                    <span aria-hidden className="mt-[0.7em] h-1 w-4 shrink-0 bg-putih" />
                    {y}
                  </li>
                ))}
              </ul>
            </Muncul>

            <Muncul jenis="kanan">
              <h2 className="mata text-putih/70">Kalau dibiarkan</h2>
              <ul className="mt-8 space-y-4">
                {m.akibat.map((a) => (
                  <li key={a} className="flex gap-5 text-putih/85">
                    <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-putih/50" />
                    {a}
                  </li>
                ))}
              </ul>
              <h2 className="mata mt-12 text-putih/70">Perkiraan waktu</h2>
              <p className="mt-4 text-putih/85">
                {m.durasi}, dari temu kenal sampai luncur
              </p>
            </Muncul>
          </div>
        </Kontainer>
      </section>

      {/* The evidence, not a testimonial. One project we actually shipped, named
          and linked, so the reader can check the claim rather than take it. */}
      {bukti && (
        <section className="py-20 md:py-28">
          <Kontainer>
            <Muncul jenis="naik">
              <p className="mata text-biru">Sudah pernah kami kerjakan</p>
            </Muncul>
            <Muncul jenis="naik" urutan={1}>
              <h2 className="tampil mt-7 max-w-3xl text-bagian">{bukti.judul}</h2>
            </Muncul>
            <Muncul jenis="naik" urutan={2}>
              <p className="mt-6 max-w-2xl">{bukti.ringkasan}</p>
              <p className="mt-4 text-sm text-abu">
                {namaKlien(bukti)} · {bukti.tahun} · {bukti.durasiMinggu} minggu
              </p>
            </Muncul>
            <Muncul jenis="naik" urutan={3} className="mt-10">
              <Tombol href={`/portofolio/${bukti.slug}`} jenis="garis">
                Baca studi kasusnya
              </Tombol>
            </Muncul>
          </Kontainer>
        </section>
      )}

      <section className="border-t border-garis py-20 md:py-28">
        <Kontainer>
          <Muncul jenis="naik">
            <h2 className="tampil max-w-3xl text-bagian">
              Di mana masalah ini muncul
            </h2>
          </Muncul>
          <Muncul jenis="naik" urutan={1}>
            <p className="mt-6 max-w-2xl">
              Daftar tempat masalahnya biasa ditemui — bukan daftar klien kami.
              Yang sudah kami kerjakan ada di bagian atas halaman ini.
            </p>
          </Muncul>
          <ul className="mt-12 grid max-w-5xl gap-x-12 gap-y-6 sm:grid-cols-2">
            {m.dimana.map((d, i) => (
              <Muncul
                key={d}
                as="li"
                jenis="naik"
                urutan={i % 2}
                className="flex gap-5 border-t border-garis pt-5 text-tinta"
              >
                <span aria-hidden className="mt-[0.7em] h-1 w-4 shrink-0 bg-biru" />
                {d}
              </Muncul>
            ))}
          </ul>
        </Kontainer>
      </section>

      <section className="border-t border-garis py-20 md:py-28">
        <Kontainer>
          <Muncul jenis="naik">
            <h2 className="tampil max-w-3xl text-bagian">
              Yang paling sering ditanya
            </h2>
          </Muncul>
          <dl className="mt-14 max-w-3xl border-t border-garis">
            {m.tanya.map((q, i) => (
              <Muncul
                key={q.t}
                jenis="naik"
                urutan={i}
                className="border-b border-garis py-8"
              >
                <dt className="font-display text-lg font-bold tracking-[0.01em] text-tinta uppercase">
                  {q.t}
                </dt>
                <dd className="mt-4">{q.j}</dd>
              </Muncul>
            ))}
          </dl>
          <Muncul jenis="naik" className="mt-14 flex flex-wrap gap-5">
            <Tombol href="/kontak">Kirim brief</Tombol>
            <Link
              href="/harga"
              className="pelan inline-flex items-center gap-3 self-center font-display text-sm font-bold tracking-[1.1px] text-biru uppercase hover:gap-5"
            >
              Lihat yang menentukan harga <span aria-hidden>→</span>
            </Link>
          </Muncul>
        </Kontainer>
      </section>

      <Kerjasama />
    </>
  );
}
