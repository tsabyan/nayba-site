import type { NextConfig } from "next";

/**
 * Response headers.
 *
 * Vercel supplies HSTS; everything else is off by default, which left the site
 * framable and sniffable and sending a full referrer to every outbound link.
 *
 * The CSP runs with `'unsafe-inline'` for scripts in every environment, and
 * that limit is worth stating plainly: it still blocks a foreign script host, an injected frame,
 * and a rewritten form action, but it does not stop inline injection. Removing
 * it needs per-request nonces, which needs middleware, which would turn every
 * statically prerendered page dynamic — a real cost against a site that renders
 * no user input and holds no session. Revisit the day either changes.
 *
 * `connect-src` is the list that breaks first: it must name every host the
 * browser talks to, which is Web3Forms for the brief plus whichever analytics
 * are switched on.
 */
/**
 * React and Turbopack both use eval() in development — React to reconstruct
 * callstacks across environments, the dev server for module evaluation and hot
 * reload. React states outright that it never uses eval in production, so this
 * is gated rather than granted: `next dev` sets NODE_ENV to development, and
 * both `next build` and `next start` set it to production.
 *
 * 'unsafe-eval' is the most dangerous relaxation in CSP — it turns any string
 * reaching the right sink into executable code. It must never ship. If a
 * production response ever carries it, this branch is broken.
 */
const pengembangan = process.env.NODE_ENV === "development";

/**
 * PostHog cloud region.
 *
 * Duplicated from content/studio.ts on purpose: next.config.ts is loaded before
 * the TypeScript path aliases exist, so it cannot import from there. The two
 * read the same variable, and `periksa.mjs` fails the build if it holds
 * anything but `us` or `eu` — a typo here would otherwise rewrite every event
 * to a host that does not know the key, and fail silently in the browser.
 */
const wilayahPH = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";

const script = [
  "script-src 'self' 'unsafe-inline'",
  "https://hcaptcha.com https://*.hcaptcha.com",
  pengembangan ? "'unsafe-eval'" : null,
  "https://www.googletagmanager.com",
  "https://va.vercel-scripts.com",
]
  .filter(Boolean)
  .join(" ");

const csp = [
  "default-src 'self'",
  script,
  "style-src 'self' 'unsafe-inline' https://hcaptcha.com https://*.hcaptcha.com",
  "img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com",
  [
    "connect-src 'self'",
    "https://api.web3forms.com",
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://analytics.google.com",
    "https://va.vercel-scripts.com",
    "https://vitals.vercel-insights.com",
    "https://hcaptcha.com",
    "https://*.hcaptcha.com",
  ].join(" "),
  "font-src 'self'",
  /* PostHog's session recorder compresses in a worker created from a blob URL.
     Without this it is refused, and the refusal shows up as recordings that
     simply never appear rather than as an error anyone would notice.
     `default-src 'self'` is what it falls back to otherwise, and that forbids
     blob:. Everything else the SDK fetches goes through the /ph rewrite below,
     so it is already same-origin and needs no further opening. */
  "worker-src 'self' blob:",
  "frame-src 'self' https://www.googletagmanager.com https://hcaptcha.com https://*.hcaptcha.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,

  /**
   * PostHog ingestion endpoints end in a slash (`/e/`, `/decide/`). Next
   * normalises trailing slashes with a 308 BEFORE rewrites are evaluated, so
   * without this every single event would pay an extra round trip before it
   * was proxied at all. (The slash is dropped on the way upstream either way —
   * `/ph/decide/` arrives at PostHog as `/decide`, which it accepts. What this
   * buys is the missing redirect, not the preserved slash.)
   *
   * Switching it off site-wide would also drop the redirect that keeps
   * `/harga/` from being a second URL for `/harga` — which on a site whose
   * current job is SEO hygiene is the wrong trade. The redirect below puts that
   * back for everything except the proxy path.
   */
  skipTrailingSlashRedirect: true,

  async redirects() {
    return [
      {
        /* Everything but /ph/*, which must reach the rewrite without a
           redirect hop first. `:jalur` captures at least one segment, so `/`
           itself — which has no non-slash form — is never matched. */
        source: "/:jalur((?!ph/).+)/",
        destination: "/:jalur",
        permanent: true,
      },
    ];
  },

  /**
   * Same-origin proxy for PostHog.
   *
   * A direct us.i.posthog.com is on every content blocker's list, and the
   * events being blocked are exactly the ones worth having: brief submissions
   * and WhatsApp clicks. Routing them through our own origin also keeps
   * `connect-src 'self'` honest — no analytics host is added to the CSP.
   *
   * Static assets sit on a different host from ingestion, hence two rules. The
   * order matters: the specific one must come first or `/ph/:path*` swallows it.
   */
  async rewrites() {
    return [
      {
        source: "/ph/static/:path*",
        destination: `https://${wilayahPH}-assets.i.posthog.com/static/:path*`,
      },
      {
        source: "/ph/:path*",
        destination: `https://${wilayahPH}.i.posthog.com/:path*`,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          /* frame-ancestors already covers this for current browsers; kept for
             the ones that only read the legacy header. */
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          /* Outbound links currently leak the full path to WhatsApp and
             Web3Forms. Origin-only on cross-site, full path same-site. */
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
