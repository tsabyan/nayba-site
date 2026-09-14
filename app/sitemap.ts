import type { MetadataRoute } from "next";
import { studio } from "@/content/studio";
import { layanan } from "@/content/layanan";
import { masalah } from "@/content/masalah";
import { semuaKarya } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const dasar = studio.website.replace(/\/$/, "");
  const tetap = ["", "/layanan", "/masalah", "/harga", "/portofolio", "/proses", "/tentang", "/kontak"];

  return [
    ...tetap.map((j) => ({ url: `${dasar}${j}`, changeFrequency: "monthly" as const })),
    ...layanan.map((l) => ({ url: `${dasar}/layanan/${l.slug}` })),
    ...masalah.map((m) => ({ url: `${dasar}/masalah/${m.slug}` })),
    ...semuaKarya().map((k) => ({ url: `${dasar}/portofolio/${k.slug}` })),
  ];
}
