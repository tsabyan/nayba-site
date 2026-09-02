/**
 * Single source of truth for the facts the site states publicly.
 *
 * Every value here must be true. The site's credibility rests on publishing
 * numbers a real operating studio knows — so a wrong number here is worse
 * than no number at all.
 *
 * Lead-related values (WhatsApp, inbox, form key, canonical host) come from
 * environment variables so they can be rotated in the Vercel dashboard without
 * a code change. They are all `NEXT_PUBLIC_` because the browser needs them:
 * the WhatsApp link is rendered client-side and the brief is posted straight
 * from the browser. None of them are secrets — a Web3Forms access key is
 * public by design and is bound to the inbox, not to an account.
 *
 * `NEXT_PUBLIC_` values are inlined at BUILD time. Changing one in Vercel does
 * nothing until the project is redeployed.
 *
 * `npm run periksa` fails the production build while any of them is missing or
 * still holds an example value. See `.env.example`.
 */
export const studio = {
  nama: "Nayba",
  deskripsi:
    "Studio web yang membangun website perusahaan dan aplikasi web untuk bisnis di Indonesia.",

  /** The city work actually happens in. */
  kota: process.env.NEXT_PUBLIC_KOTA || "Yogyakarta",

  /** Business WhatsApp, 62 format, no plus and no spaces. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",

  /** Inbox the brief form delivers to. */
  email: process.env.NEXT_PUBLIC_EMAIL || "",

  /**
   * Canonical host, no trailing slash. Must match the primary domain in Vercel
   * → Settings → Domains, because sitemap, robots, OG tags and JSON-LD are all
   * built from it. Publishing the host that redirects splits SEO signals.
   */
  website: process.env.NEXT_PUBLIC_SITE_URL || "https://nayba.id",

  /** Web3Forms access key, bound to the inbox above. */
  formKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",

  /**
   * Analytics ids. Each renders nothing while empty, so a fresh clone ships
   * no third-party script at all.
   *
   * Set `ga` OR `gtm`, never both — a GTM container that also holds a GA4 tag
   * plus a direct gtag on the same page counts every pageview twice.
   */
  analitik: {
    /** GA4 measurement id, `G-XXXXXXXXXX`. */
    ga: process.env.NEXT_PUBLIC_GA_ID || "",
    /** Google Tag Manager container id, `GTM-XXXXXXX`. */
    gtm: process.env.NEXT_PUBLIC_GTM_ID || "",
  },

  sosial: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || "",
  },
};

/**
 * The hero fact strip. Four things a studio only knows by running projects.
 * Update `kapasitas` whenever the pipeline changes — it is the one number
 * here that goes stale, and a stale capacity number reads as decoration.
 */
export const fakta = [
  { angka: "< 4 jam", label: "Balas pesan", catatan: "Hari kerja, 09.00–18.00 WIB" },
  { angka: "8 minggu", label: "Website perusahaan", catatan: "Dari temu kenal sampai luncur" },
  { angka: "2 slot", label: "Kapasitas kuartal ini", catatan: "Proyek berjalan paralel maksimal 3" },
  { angka: studio.kota, label: "Basis kerja", catatan: "Klien di seluruh Indonesia, remote" },
] as const;
