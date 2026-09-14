"use client";

import type { ComponentProps, ReactNode } from "react";
import { lacak } from "@/lib/analitik";
import { pesanWA, tautanWA } from "@/lib/wa";

/**
 * A WhatsApp link that says it was used.
 *
 * WhatsApp is the shortest path from visitor to conversation on this site, and
 * it is also the one that leaves no trace: the click navigates away, no form is
 * submitted, and nothing lands in an inbox until the visitor types something.
 * Untracked, it is a conversion that looks like a bounce — so a page that
 * actually works reads as a page nobody wanted.
 *
 * `asal` names the placement, not the page, because the same page can hold two
 * of these and the useful question is which one people press.
 */
export function TautanWA({
  asal,
  pesan = pesanWA.umum,
  className = "",
  children,
  ...sisa
}: {
  asal: string;
  pesan?: string;
  className?: string;
  children: ReactNode;
  /* Spread so a placement can add what it needs — `aria-label` on an icon-only
     button, a `title`, a `data-*` hook — without every caller rebuilding the
     link by hand and quietly dropping the tracking with it. */
} & Omit<ComponentProps<"a">, "href" | "onClick" | "className" | "children">) {
  return (
    <a
      href={tautanWA(pesan)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => lacak("wa_dibuka", { asal })}
      className={className}
      {...sisa}
    >
      {children}
    </a>
  );
}
