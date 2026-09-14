import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Panji } from "@/components/layout/Panji";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { Kerjasama } from "@/components/sections/Kerjasama";
import { layanan, satuLayanan } from "@/content/layanan";
import { Skema } from "@/components/Skema";
import { dasar, idOrganisasi, remah, tanyaJawab } from "@/lib/skema";

export function generateStaticParams() {
  return layanan.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/layanan/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const l = satuLayanan(slug);
  if (!l) return {};
  return { title: l.nama, description: l.ringkas };
}

export default async function HalamanLayananDetail({
  params,
}: PageProps<"/layanan/[slug]">) {
  const { slug } = await params;
  const l = satuLayanan(slug);
  if (!l) notFound();

  /**
   * Service, not Product or Offer.
   *
   * Product/Offer both want a price, and Nayba has none to state — see
   * content/harga.ts. An Offer without `price` is legal markup but reads as an
   * incomplete listing, and inventing the number to complete it is the one
   * thing this site refuses to do. Service carries everything that IS true:
   * what the work is, who provides it, where, and how long it takes.
   */
  const skemaLayanan = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${dasar}/layanan/${l.slug}#layanan`,
    name: l.nama,
    description: l.ringkas,
    serviceType: l.nama,
    provider: { "@id": idOrganisasi },
    areaServed: { "@type": "Country", name: "Indonesia" },
    availableLanguage: ["id"],
    url: `${dasar}/layanan/${l.slug}`,
    /* The delivery window is the one hard number on the page, and it is the
       number buyers compare studios on. */
    termsOfService: `${dasar}/harga`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Termasuk dalam ${l.nama}`,
      itemListElement: l.termasuk.map((t) => ({
        "@type": "OfferCatalog",
        name: t,
      })),
    },
  };

  return (
    <>
      <Skema data={skemaLayanan} />
      <Skema
        data={remah([
          { nama: "Layanan", href: "/layanan" },
          { nama: l.nama, href: `/layanan/${l.slug}` },
        ])}
      />
      {/* Every question here is rendered below in the visible `<dl>`. Markup
          for text a visitor cannot see is a spam signal, not an optimisation. */}
      <Skema data={tanyaJawab(l.tanya)} />

      <Panji mata={l.durasi} judul={l.nama} ringkas={l.ringkas} />

      <section className="py-20 md:py-28">
        <Kontainer>
          <Muncul jenis="naik">
            <h2 className="tampil max-w-3xl text-bagian">
              Paling berguna kalau begini situasimu
            </h2>
          </Muncul>
          <ul className="mt-12 grid max-w-5xl gap-x-12 gap-y-6 sm:grid-cols-2">
            {l.untukSiapa.map((u, i) => (
              <Muncul
                key={u}
                as="li"
                jenis="naik"
                urutan={i % 2}
                className="flex gap-5 border-t border-garis pt-5 text-tinta"
              >
                <span aria-hidden className="mt-[0.7em] h-1 w-4 shrink-0 bg-biru" />
                {u}
              </Muncul>
            ))}
          </ul>
        </Kontainer>
      </section>

      <section data-maju="lewat" className="morf py-20 text-putih md:py-28">
        <Kontainer>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Muncul jenis="kiri">
              <h2 className="mata text-putih">Termasuk</h2>
              <ul className="mt-8 space-y-4">
                {l.termasuk.map((t) => (
                  <li key={t} className="flex gap-5 text-putih">
                    <span aria-hidden className="mt-[0.7em] h-1 w-4 shrink-0 bg-putih" />
                    {t}
                  </li>
                ))}
              </ul>
            </Muncul>

            <Muncul jenis="kanan">
              <h2 className="mata text-putih/70">Tidak termasuk</h2>
              <ul className="mt-8 space-y-4">
                {l.tidakTermasuk.map((t) => (
                  <li key={t} className="flex gap-5 text-putih/85">
                    <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-putih/50" />
                    {t}
                  </li>
                ))}
              </ul>
              <h2 className="mata mt-12 text-putih/70">Dibangun dengan</h2>
              <p className="mt-4 text-putih/85">{l.tumpukan.join(" · ")}</p>
            </Muncul>
          </div>
        </Kontainer>
      </section>

      <section className="py-20 md:py-28">
        <Kontainer>
          <Muncul jenis="naik">
            <h2 className="tampil max-w-3xl text-bagian">Yang paling sering ditanya</h2>
          </Muncul>
          <dl className="mt-14 max-w-3xl border-t border-garis">
            {l.tanya.map((q, i) => (
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
        </Kontainer>
      </section>

      <Kerjasama />
    </>
  );
}
