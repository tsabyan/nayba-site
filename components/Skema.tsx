import { jsonLd } from "@/lib/jsonld";

/**
 * One JSON-LD block.
 *
 * Pages emit their own node rather than everything being piled into the root
 * graph, because the useful markup is page-specific: a Service belongs to one
 * service page and a breadcrumb describes one trail. Search engines merge the
 * blocks on a page themselves, so several small ones cost nothing.
 */
export function Skema({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}
