/**
 * Single source of truth for the facts the site states publicly.
 *
 * Every value here must be true. The site's credibility rests on publishing
 * numbers a real operating studio knows — so a wrong number here is worse
 * than no number at all.
 *
 * Values marked GANTI are placeholders. `npm run periksa` fails the
 * production build while any of them remain.
 */
export const studio = {
  nama: "Nayba",
  deskripsi:
    "Studio web yang membangun website perusahaan dan aplikasi web untuk bisnis di Indonesia.",

  // GANTI: kota tempat kamu benar-benar bekerja.
  kota: "Yogyakarta",

  // GANTI: nomor WhatsApp bisnis, format 62 tanpa tanda plus.
  whatsapp: "6281234567890",
  // GANTI: inbox tujuan formulir brief.
  email: "halo@nayba.id",
  // GANTI: tautan penjadwalan.
  booking: "https://cal.com/nayba/temu-30",
  // GANTI: domain final.
  website: "https://nayba.id",

  // GANTI: access key Web3Forms (boleh publik, terikat ke inbox di atas).
  formKey: "GANTI-WEB3FORMS-ACCESS-KEY",

  sosial: {
    instagram: "",
    linkedin: "",
  },
} as const;

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

/** Sentinel strings that must not survive to production. */
export const PLACEHOLDER = [
  "6281234567890",
  "GANTI-WEB3FORMS-ACCESS-KEY",
  "https://cal.com/nayba/temu-30",
];
