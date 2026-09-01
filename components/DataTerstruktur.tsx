import { studio } from "@/content/studio";

/**
 * Organization markup.
 *
 * Deliberately omits `legalName`, `address`, and `foundingDate`. Nayba is not
 * a registered entity yet, and structured data is exactly where an invented
 * one would get indexed and quoted back. Add those fields the day the PT or CV
 * exists, not before.
 */
export function DataTerstruktur() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: studio.nama,
    url: studio.website,
    description: studio.deskripsi,
    areaServed: { "@type": "Country", name: "Indonesia" },
    knowsLanguage: ["id"],
    sameAs: [studio.sosial.instagram, studio.sosial.linkedin].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: `${studio.website}/kontak`,
      availableLanguage: ["id"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
