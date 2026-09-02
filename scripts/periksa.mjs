/**
 * Pre-build guard.
 *
 * The site's whole credibility argument is that every fact on it is true. That
 * argument dies the first time a placeholder or an invented credential ships.
 * These checks make that a build failure rather than something to remember.
 *
 * Three groups, deliberately separated:
 *
 *   1. Lead data — never bypassable. A site with a dead WhatsApp link and a
 *      form key that Web3Forms rejects looks alive and converts nothing, which
 *      is the most expensive way to be broken.
 *   2. Example case studies — bypassable with IZINKAN_CONTOH=1 while the real
 *      portfolio does not exist yet.
 *   3. Forbidden claims — never bypassable.
 *
 * Group 2 used to share a flag with group 1, which is how placeholder contact
 * details reached production: switching on the portfolio bypass silently
 * switched off the contact check too.
 */
import fs from "node:fs";
import path from "node:path";

const akar = process.cwd();
const galat = [];

/**
 * `next build` loads .env files itself, but this script runs before it as a
 * plain node process, so it has to read them too. Real environment variables
 * win — that is what Vercel injects.
 */
function muatEnv(berkas) {
  const p = path.join(akar, berkas);
  if (!fs.existsSync(p)) return;
  for (const baris of fs.readFileSync(p, "utf8").split("\n")) {
    const t = baris.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 1) continue;
    const kunci = t.slice(0, i).trim();
    if (process.env[kunci] !== undefined) continue;
    process.env[kunci] = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
}
muatEnv(".env.local");
muatEnv(".env");

/* 1 — Lead data. Always checked. */
const env = (k) => (process.env[k] ?? "").trim();

const wa = env("NEXT_PUBLIC_WHATSAPP");
if (!wa) {
  galat.push("NEXT_PUBLIC_WHATSAPP belum diisi — tautan WhatsApp di footer, halaman kontak, dan layar sukses formulir akan mati.");
} else if (wa === "6281234567890") {
  galat.push("NEXT_PUBLIC_WHATSAPP masih memakai nomor contoh dari .env.example.");
} else if (!/^62[0-9]{8,13}$/.test(wa)) {
  galat.push(`NEXT_PUBLIC_WHATSAPP="${wa}" bukan format 62 tanpa tanda plus, tanpa spasi (contoh: 6281122334455).`);
}

const surel = env("NEXT_PUBLIC_EMAIL");
if (!surel) {
  galat.push("NEXT_PUBLIC_EMAIL belum diisi.");
} else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(surel)) {
  galat.push(`NEXT_PUBLIC_EMAIL="${surel}" bukan alamat surel yang sah.`);
}

const kunciForm = env("NEXT_PUBLIC_WEB3FORMS_KEY");
if (!kunciForm) {
  galat.push("NEXT_PUBLIC_WEB3FORMS_KEY belum diisi — setiap brief yang dikirim pengunjung akan ditolak Web3Forms dan tidak pernah sampai ke inbox.");
} else if (kunciForm.startsWith("GANTI") || kunciForm.length < 20) {
  galat.push("NEXT_PUBLIC_WEB3FORMS_KEY masih nilai contoh. Ambil access key asli di https://web3forms.com.");
}

/* Optional, but wrong is worse than unset. */
const situs = env("NEXT_PUBLIC_SITE_URL");
if (situs) {
  if (!situs.startsWith("https://")) {
    galat.push(`NEXT_PUBLIC_SITE_URL="${situs}" harus memakai https://.`);
  }
  if (situs.endsWith("/")) {
    galat.push(`NEXT_PUBLIC_SITE_URL="${situs}" tidak boleh diakhiri garis miring — sitemap dan canonical akan berisi URL ganda.`);
  }
}

const ga = env("NEXT_PUBLIC_GA_ID");
const gtm = env("NEXT_PUBLIC_GTM_ID");
if (ga && gtm) {
  galat.push("NEXT_PUBLIC_GA_ID dan NEXT_PUBLIC_GTM_ID diisi keduanya. Pilih salah satu — kalau tidak, setiap kunjungan terhitung dua kali.");
}
if (ga && !/^G-[A-Z0-9]{6,}$/.test(ga)) {
  galat.push(`NEXT_PUBLIC_GA_ID="${ga}" bukan measurement id GA4 (bentuknya G-XXXXXXXXXX).`);
}
if (gtm && !/^GTM-[A-Z0-9]{5,}$/.test(gtm)) {
  galat.push(`NEXT_PUBLIC_GTM_ID="${gtm}" bukan container id GTM (bentuknya GTM-XXXXXXX).`);
}

/* 2 — Example case studies. Bypassable while the real portfolio is empty. */
const dirKarya = path.join(akar, "content/portofolio");
const contoh = fs.existsSync(dirKarya)
  ? fs.readdirSync(dirKarya).filter((f) => f.startsWith("contoh-"))
  : [];

if (contoh.length && !process.env.IZINKAN_CONTOH) {
  galat.push(
    `content/portofolio masih berisi contoh: ${contoh.join(", ")}. ` +
      `Ganti dengan proyek asli, hapus berkasnya, atau set IZINKAN_CONTOH=1 ` +
      `kalau memang sengaja dipublikasikan untuk sementara.`,
  );
}

/* 3 — Claims the site must never make. Always checked. */
const terlarang = [
  { pola: /\bPT\s+[A-Z]\w/, kenapa: "Nayba belum berbadan hukum — jangan memakai awalan PT." },
  { pola: /\bCV\s+[A-Z]\w/, kenapa: "Nayba belum berbadan hukum — jangan memakai awalan CV." },
  { pola: /\bJl\.\s/, kenapa: "Jangan mencantumkan alamat jalan sebelum ada kantor terdaftar." },
  { pola: /\bterdepan\b/i, kenapa: "Superlatif tanpa bukti." },
  { pola: /\bterpercaya\b/i, kenapa: "Superlatif tanpa bukti." },
  { pola: /\bnomor satu\b/i, kenapa: "Superlatif tanpa bukti." },
  { pola: /\bsolusi digital\b/i, kenapa: "Frasa kosong." },
];

const dipindai = [".ts", ".tsx", ".mdx"];

/**
 * Only source that actually reaches a page is scanned. README and AGENTS.md
 * have to be able to name the banned words in order to ban them.
 */
const wilayah = ["app", "components", "content", "lib"];

function jalan(dir) {
  for (const isi of fs.readdirSync(dir, { withFileTypes: true })) {
    if (isi.name.startsWith(".")) continue;
    const p = path.join(dir, isi.name);
    if (isi.isDirectory()) jalan(p);
    else if (dipindai.includes(path.extname(isi.name))) periksaBerkas(p);
  }
}

function periksaBerkas(p) {
  const baris = fs.readFileSync(p, "utf8").split("\n");
  baris.forEach((b, i) => {
    for (const { pola, kenapa } of terlarang) {
      if (pola.test(b)) {
        galat.push(`${path.relative(akar, p)}:${i + 1} — ${kenapa}\n    ${b.trim()}`);
      }
    }
  });
}

for (const w of wilayah) {
  const dir = path.join(akar, w);
  if (fs.existsSync(dir)) jalan(dir);
}

if (galat.length) {
  console.error("\n✗ Pemeriksaan gagal:\n");
  for (const g of galat) console.error(`  • ${g}`);
  console.error(
    `\n  ${galat.length} masalah. Perbaiki dulu sebelum build produksi.` +
      `\n  Nilai kontak diatur lewat environment variable — lihat .env.example.\n`,
  );
  process.exit(1);
}

console.log(
  `✓ Pemeriksaan lolos${contoh.length ? ` (${contoh.length} studi kasus contoh diizinkan lewat IZINKAN_CONTOH)` : ""}.`,
);
