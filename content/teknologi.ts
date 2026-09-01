/**
 * The stack.
 *
 * Only list what Nayba genuinely works in — a technology page is the easiest
 * place on a studio site to overclaim, and the first client who asks a detailed
 * question about something here will find out. Prune rather than pad.
 *
 * Resolve before launch: the pharmaceutical case study says WordPress was
 * deliberately turned down for that project. Listing it is only honest if Nayba
 * does build on it where it fits.
 *
 * `logo` is optional and points at /public/teknologi/. Drop the official SVG
 * from each project's own brand page in there and set the path — without one,
 * the tile falls back to a monogram set in the display face. Deliberately no
 * hand-drawn approximations of other companies' trademarks.
 */
export type Teknologi = {
  nama: string;
  /** Fallback mark when no logo file is present. */
  singkat: string;
  kelompok: string;
  logo?: string;
};

export const teknologi: Teknologi[] = [
  { kelompok: "Dasar", nama: "HTML", singkat: "HT" },
  { kelompok: "Dasar", nama: "CSS", singkat: "CS" },
  { kelompok: "Dasar", nama: "JavaScript", singkat: "JS" },
  { kelompok: "Dasar", nama: "TypeScript", singkat: "TS" },

  { kelompok: "Framework", nama: "Next.js", singkat: "NX" },
  { kelompok: "Framework", nama: "React", singkat: "RE" },
  { kelompok: "Framework", nama: "Laravel", singkat: "LV" },
  { kelompok: "Framework", nama: "Tailwind CSS", singkat: "TW" },

  { kelompok: "Isi", nama: "WordPress", singkat: "WP" },
  { kelompok: "Isi", nama: "MDX", singkat: "MD" },

  { kelompok: "Data", nama: "PostgreSQL", singkat: "PG" },
  { kelompok: "Data", nama: "MySQL", singkat: "MY" },
  { kelompok: "Data", nama: "Prisma", singkat: "PR" },

  { kelompok: "Infrastruktur", nama: "Vercel", singkat: "VC" },
  { kelompok: "Infrastruktur", nama: "VPS Indonesia", singkat: "VPS" },
  { kelompok: "Infrastruktur", nama: "Cloudflare", singkat: "CF" },
];

export const kelompokTeknologi = [
  "Dasar",
  "Framework",
  "Isi",
  "Data",
  "Infrastruktur",
] as const;
