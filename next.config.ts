import type { NextConfig } from "next";

/**
 * Response headers.
 *
 * Vercel supplies HSTS; everything else is off by default, which left the site
 * framable and sniffable and sending a full referrer to every outbound link.
 *
 * The CSP runs with `'unsafe-inline'` for scripts, and that limit is worth
 * stating plainly: it still blocks a foreign script host, an injected frame,
 * and a rewritten form action, but it does not stop inline injection. Removing
 * it needs per-request nonces, which needs middleware, which would turn every
 * statically prerendered page dynamic — a real cost against a site that renders
 * no user input and holds no session. Revisit the day either changes.
 *
 * `connect-src` is the list that breaks first: it must name every host the
 * browser talks to, which is Web3Forms for the brief plus whichever analytics
 * are switched on.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com",
  [
    "connect-src 'self'",
    "https://api.web3forms.com",
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://analytics.google.com",
    "https://va.vercel-scripts.com",
    "https://vitals.vercel-insights.com",
  ].join(" "),
  "font-src 'self'",
  "frame-src 'self' https://www.googletagmanager.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,

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
