/**
 * Pre-build guard.
 *
 * The site's whole credibility argument is that every fact on it is true. That
 * argument dies the first time a placeholder or an invented credential ships.
 * These checks make that a build failure rather than something to remember.
 *
 * Local production preview with example content still in place:
 *   IZINKAN_CONTOH=1 npm run build
 * That bypass covers placeholders only. The forbidden-claim scan always runs.
 */
import fs from "node:fs";
import path from "node:path";

const akar = process.cwd();
const galat = [];

/* 1 — Placeholder contact details must be replaced. */
const sentinel = [
  "6281234567890",
  "GANTI-WEB3FORMS-ACCESS-KEY",
  "https://cal.com/nayba/temu-30",
];
const studioSrc = fs.readFileSync(path.join(akar, "content/studio.ts"), "utf8");
const tersisa = sentinel.filter((s) => studioSrc.includes(s));

/* 2 — Example case studies must not ship. */
const dirKarya = path.join(akar, "content/portofolio");
const contoh = fs.existsSync(dirKarya)
  ? fs.readdirSync(dirKarya).filter((f) => f.startsWith("contoh-"))
  : [];

if (!process.env.IZINKAN_CONTOH) {
  if (tersisa.length) {
    galat.push(
      `content/studio.ts masih memakai nilai contoh: ${tersisa.join(", ")}`,
    );
  }
  if (contoh.length) {
    galat.push(
      `content/portofolio masih berisi contoh: ${contoh.join(", ")}. ` +
        `Ganti dengan proyek asli, atau hapus berkasnya.`,
    );
  }
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
    `\n  ${galat.length} masalah. Perbaiki dulu sebelum build produksi.\n`,
  );
  process.exit(1);
}

console.log("✓ Pemeriksaan lolos — tidak ada nilai contoh atau klaim terlarang.");
