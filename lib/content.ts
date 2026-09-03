import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content", "portofolio");

export type Hasil = { angka: string; label: string; catatan?: string };

export type Karya = {
  slug: string;
  judul: string;
  /** Client's real name. Only ever rendered when `izinNama` is true. */
  klien: string;
  /** Written permission to publish the client name. Defaults to false. */
  izinNama: boolean;
  sektor: string;
  kota: string;
  tahun: number;
  durasiMinggu: number;
  layanan: string[];
  ringkasan: string;
  peran: string[];
  tumpukan: string[];
  hasil: Hasil[];
  /**
   * Card crop, 16:11. Used on the homepage and the portfolio index.
   *
   * Separate from `gambarLebar` because one file cannot serve both: the banner
   * is 2.5:1, and cropping a 16:11 screenshot that wide throws away most of the
   * interface it was meant to show.
   */
  gambarUtama?: string;
  /** Banner crop, 2.5:1, full-bleed on the case study page. */
  gambarLebar?: string;
  tampilkan: boolean;
  urutan: number;
  isi: string;
};

/**
 * What the site is allowed to call this client.
 *
 * Gating the name at the data layer rather than remembering to redact it in
 * each template means an NDA cannot be broken by forgetting.
 *
 * A missing city is a real case, not an oversight — an online-only seller has
 * no city worth publishing. Joining blindly rendered "ecommerce, -", which
 * reads as a template that failed rather than as a client kept anonymous.
 */
export function namaKlien(k: Karya): string {
  if (k.izinNama && k.klien) return k.klien;
  const kota = k.kota && k.kota !== "-" ? k.kota : "";
  return [k.sektor, kota].filter(Boolean).join(", ");
}

function baca(berkas: string): Karya {
  const slug = berkas.replace(/\.mdx$/, "");
  const { data, content } = matter(
    fs.readFileSync(path.join(DIR, berkas), "utf8"),
  );

  return {
    slug,
    judul: data.judul ?? slug,
    klien: data.klien ?? "",
    izinNama: data.izinNama === true,
    sektor: data.sektor ?? "",
    kota: data.kota ?? "",
    tahun: Number(data.tahun ?? 0),
    durasiMinggu: Number(data.durasiMinggu ?? 0),
    layanan: data.layanan ?? [],
    ringkasan: data.ringkasan ?? "",
    peran: data.peran ?? [],
    tumpukan: data.tumpukan ?? [],
    hasil: data.hasil ?? [],
    gambarUtama: data.gambarUtama,
    gambarLebar: data.gambarLebar,
    tampilkan: data.tampilkan !== false,
    urutan: Number(data.urutan ?? 99),
    isi: content,
  };
}

export function semuaKarya(): Karya[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(baca)
    .filter((k) => k.tampilkan)
    .sort((a, b) => a.urutan - b.urutan || b.tahun - a.tahun);
}

export function karyaTerpilih(jumlah = 3): Karya[] {
  return semuaKarya().slice(0, jumlah);
}

export function satuKarya(slug: string): Karya | undefined {
  return semuaKarya().find((k) => k.slug === slug);
}
