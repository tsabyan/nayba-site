import { studio } from "@/content/studio";

/**
 * Stable `@id` anchors.
 *
 * Every page's markup points back at the same Organization node instead of
 * restating it. Without the shared id, each page describes what looks like a
 * separate company with the same name, and none of them accumulate.
 */
export const dasar = studio.website.replace(/\/$/, "");
export const idOrganisasi = `${dasar}/#organisasi`;
export const idSitus = `${dasar}/#situs`;

/** Breadcrumb trail. `jalur` excludes the home crumb, which is always first. */
export function remah(jalur: { nama: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ nama: "Beranda", href: "/" }, ...jalur].map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.nama,
      item: `${dasar}${r.href === "/" ? "" : r.href}`,
    })),
  };
}

/**
 * FAQPage markup.
 *
 * Worth stating plainly: since Google narrowed FAQ rich results in 2023, this
 * no longer renders an accordion in search for a site like ours. It is emitted
 * because it is the machine-readable form of answers we already publish, and
 * that is what gets quoted by assistants and answer engines that do not have
 * that restriction.
 *
 * Every question passed here must also be visible on the page — markup for
 * text the visitor cannot see is a spam signal, not an optimisation.
 */
export function tanyaJawab(tanya: readonly { t: string; j: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tanya.map((q) => ({
      "@type": "Question",
      name: q.t,
      acceptedAnswer: { "@type": "Answer", text: q.j },
    })),
  };
}
