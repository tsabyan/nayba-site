import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { PlatKarya } from "@/components/ui/PlatKarya";
import { Kerjasama } from "@/components/sections/Kerjasama";
import { komponenMdx } from "@/components/mdx";
import { namaKlien, satuKarya, semuaKarya } from "@/lib/content";

export function generateStaticParams() {
  return semuaKarya().map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/portofolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const k = satuKarya(slug);
  if (!k) return {};
  return { title: k.judul, description: k.ringkasan };
}

export default async function HalamanKarya({
  params,
}: PageProps<"/portofolio/[slug]">) {
  const { slug } = await params;
  const k = satuKarya(slug);
  if (!k) notFound();

  const semua = semuaKarya();
  const posisi = semua.findIndex((x) => x.slug === k.slug);
  /* Undefined while this is the only case study — the modulo would otherwise
     wrap to the project you are already reading and offer it as the next one. */
  const berikut = semua.length > 1 ? semua[(posisi + 1) % semua.length] : undefined;


  return (
    <>
      <section className="pt-16 pb-12 md:pt-24">
        <Kontainer>
          <Muncul jenis="pudar">
            <p className="mata text-biru">
              {namaKlien(k)} · {k.tahun}
            </p>
          </Muncul>
          <Muncul jenis="naik" durasi={1.2}>
            <h1 className="tampil mt-7 max-w-4xl text-panji">{k.judul}</h1>
          </Muncul>
          <Muncul jenis="naik" urutan={1} durasi={1.2}>
            <p className="mt-8 max-w-2xl text-lg">{k.ringkasan}</p>
          </Muncul>
        </Kontainer>
      </section>

      {/* Full-bleed hero, matching the reference's 1920×766 crop. */}
      <PlatKarya
        karya={k}
        urutan={posisi + 1}
        rasio="1920 / 766"
        nada="gelap"
        skala
        sumber="lebar"
        sizes="100vw"
      />

      <section className="py-20 md:py-28">
        <Kontainer>
          <div className="grid gap-12 sm:grid-cols-3">
            <Muncul jenis="naik">
              <h2 className="mata text-abu">Durasi</h2>
              <p className="tampil mt-4 text-anak text-tinta">{k.durasiMinggu} minggu</p>
            </Muncul>
            <Muncul jenis="naik" urutan={1}>
              <h2 className="mata text-abu">Yang kami kerjakan</h2>
              <ul className="mt-4 space-y-2 text-tinta">
                {k.peran.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Muncul>
            <Muncul jenis="naik" urutan={2}>
              <h2 className="mata text-abu">Dibangun dengan</h2>
              <ul className="mt-4 space-y-2 text-tinta">
                {k.tumpukan.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Muncul>
          </div>
        </Kontainer>
      </section>

      {/* Where the reference puts a client logo grid. Nayba has no logos, so
          the measured results stand here instead. */}
      {k.hasil.length > 0 && (
        <section data-maju="lewat" className="morf py-20 text-putih md:py-28">
          <Kontainer>
            <Muncul jenis="pudar">
              <h2 className="mata text-putih/70">Hasil</h2>
            </Muncul>
            <dl className="mt-12 grid gap-12 sm:grid-cols-3">
              {k.hasil.map((h, i) => (
                <Muncul key={h.label} jenis="naik" urutan={i} durasi={1.2}>
                  <dd className="tampil text-karya text-putih">{h.angka}</dd>
                  <dt className="mata mt-4 text-putih">{h.label}</dt>
                  {h.catatan && (
                    <p className="mt-3 text-sm text-putih/85">{h.catatan}</p>
                  )}
                </Muncul>
              ))}
            </dl>
          </Kontainer>
        </section>
      )}

      <section className="py-20 md:py-28">
        <Kontainer>
          <Muncul jenis="naik" as="article" className="max-w-3xl">
            <MDXRemote source={k.isi} components={komponenMdx} />
          </Muncul>
        </Kontainer>
      </section>

      <Kerjasama />

      {berikut && berikut.slug !== k.slug && (
        <section className="border-t border-garis py-16">
          <Kontainer>
            <Link href={`/portofolio/${berikut.slug}`} className="pelan group block">
              <span className="mata text-abu">Pekerjaan berikutnya</span>
              <h2 className="tampil pelan mt-5 max-w-3xl text-bagian group-hover:text-biru">
                {berikut.judul}
              </h2>
            </Link>
          </Kontainer>
        </section>
      )}
    </>
  );
}
