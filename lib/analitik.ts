"use client";

import posthog from "posthog-js";
import { studio } from "@/content/studio";

/**
 * The events this site emits, written out rather than passed as free strings.
 *
 * A funnel is built on exact event names, so a typo does not throw — it
 * silently creates a second event that looks like the first and splits the
 * numbers between them. That failure is invisible until someone asks why the
 * conversion rate halved in March.
 */
export type Peristiwa =
  | "brief_dikirim"
  | "brief_gagal"
  | "wa_dibuka";

/**
 * Properties are deliberately coarse.
 *
 * The brief carries a name, a company, a phone number and a paragraph about
 * what is going wrong inside a business. None of that belongs in an analytics
 * product: it is someone else's confidential information, we would be shipping
 * it to a third party without asking, and knowing WHICH company filled the form
 * tells us nothing that the email in our inbox does not already say.
 *
 * What is useful is the shape — which bracket, which project type, which page
 * the conversation started on. That is what these carry, and nothing else.
 */
export function lacak(nama: Peristiwa, sifat?: Record<string, string>) {
  /* Not `posthog.__loaded`: init runs in an effect, so an early click would be
     dropped silently rather than queued. The key check is what decides whether
     analytics exist at all; posthog-js buffers anything captured before init
     resolves. */
  if (!studio.analitik.posthogKey) return;
  posthog.capture(nama, sifat);
}
