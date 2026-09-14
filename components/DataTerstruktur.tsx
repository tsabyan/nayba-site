import { studio } from "@/content/studio";
import { Skema } from "@/components/Skema";
import { dasar, idOrganisasi, idSitus } from "@/lib/skema";

/**
 * Site-wide entity graph: who we are, and what this site is.
 *
 * Deliberately omits `legalName`, `foundingDate`, `numberOfEmployees` and
 * `aggregateRating`. Nayba is not a registered entity, has no trading history
 * to date from, and has published no reviews — and structured data is exactly
 * where an invented one would get indexed, cached, and quoted back at us. Add
 * those the day they are true, not before.
 *
 * `address` carries the locality only. The city is already stated on the site
 * as where the work happens, so publishing it changes nothing; a `streetAddress`
 * would be a claim to premises that do not exist, and `periksa.mjs` blocks it.
 *
 * Note this does NOT make us eligible for the local pack — that needs a
 * verified Google Business Profile, which needs an address. This is for the
 * entity graph behind ordinary organic results.
 */
export function DataTerstruktur() {
  const sosial = [studio.sosial.instagram, studio.sosial.linkedin].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": idOrganisasi,
        name: studio.nama,
        url: dasar,
        description: studio.deskripsi,
        address: {
          "@type": "PostalAddress",
          addressLocality: studio.kota,
          addressCountry: "ID",
        },
        areaServed: { "@type": "Country", name: "Indonesia" },
        knowsLanguage: ["id"],
        /* Spread rather than assigned: an empty `sameAs: []` is a declaration
           that we have no profiles anywhere, which is not the same as saying
           nothing and is not what an unset env var means. */
        ...(sosial.length ? { sameAs: sosial } : {}),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          url: `${dasar}/kontak`,
          availableLanguage: ["id"],
        },
      },
      {
        "@type": "WebSite",
        "@id": idSitus,
        url: dasar,
        name: studio.nama,
        description: studio.deskripsi,
        inLanguage: "id-ID",
        publisher: { "@id": idOrganisasi },
        /* No `potentialAction`/SearchAction: the site has no search. Declaring
           one that resolves to a 404 is worse than declaring none. */
      },
    ],
  };

  return <Skema data={data} />;
}
