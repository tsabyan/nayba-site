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

  /* Every value here comes from our own config, so this is defence in depth
     rather than a live hole — but a JSON string is allowed to contain the
     characters that end a script element, and if one ever did (a stray
     `</script>` in an env var) the rest of the document would be parsed as
     markup. Escaping the three characters that can start a tag or a comment
     costs nothing and removes the class of bug. */
  const json = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
