"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { studio, posthogUi } from "@/content/studio";

/**
 * Pageviews, sent by hand.
 *
 * posthog-js captures a pageview on script load, which on an App Router site
 * means one pageview per full page load and none for any navigation after it —
 * every internal click would be invisible, and the site would look like every
 * visitor read exactly one page and left.
 *
 * `useSearchParams` opts this component into client-side rendering up to the
 * nearest Suspense boundary, which is why there is one around it below. Without
 * it the whole app would drop out of the static prerender.
 */
function Jejak() {
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    const kueri = params.toString();
    posthog.capture("$pageview", {
      $current_url: window.origin + pathname + (kueri ? `?${kueri}` : ""),
    });
  }, [pathname, params]);

  return null;
}

export function Analitik() {
  useEffect(() => {
    if (!studio.analitik.posthogKey) return;

    posthog.init(studio.analitik.posthogKey, {
      /* Same-origin, rewritten to PostHog in next.config.ts. A direct
         us.i.posthog.com is on every content blocker's list, and a marketing
         site that cannot measure whether visitors convert is the one kind of
         analytics gap worth engineering around. */
      api_host: "/ph",
      /* Links into the PostHog UI still need the real host; only the ingest
         endpoint is proxied. */
      ui_host: posthogUi,
      capture_pageview: false,
      /* Time-on-page needs the matching leave event, or every session looks
         like it lasted zero seconds. */
      capture_pageleave: true,
      /* localStorage rather than the default localStorage+cookie. No cookie is
         set, so the site stays consistent with Vercel Analytics and needs no
         consent banner. The trade is that a visitor is not recognised across
         subdomains — we have none. */
      persistence: "localStorage",
    });
  }, []);

  if (!studio.analitik.posthogKey) return null;

  return (
    <Suspense fallback={null}>
      <Jejak />
    </Suspense>
  );
}
