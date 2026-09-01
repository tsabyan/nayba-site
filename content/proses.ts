/**
 * The engagement timeline, in real weeks.
 *
 * The ruler on /proses renders directly from `mulai`/`selesai` below, so the
 * drawing can never disagree with the stated schedule. Change a week here and
 * the graphic moves with it.
 */
export type Fase = {
  slug: string;
  nama: string;
  mulai: number;
  selesai: number;
  ringkas: string;
  hasil: string[];
  dariKlien: string[];
};

export const TOTAL_MINGGU = 8;

export const fase: Fase[] = [
  {
    slug: "temu-kenal",
    nama: "Temu kenal & ruang lingkup",
    mulai: 1,
    selesai: 1,
    ringkas:
      "Kami duduk bersama satu jam untuk tahu apa yang sebenarnya perlu diselesaikan. Setelah itu kamu terima ruang lingkup tertulis dan harga tetap — bukan kisaran.",
    hasil: ["Dokumen ruang lingkup", "Harga tetap", "Jadwal dengan tanggal"],
    dariKlien: ["Tujuan bisnis yang ingin dicapai website", "Contoh website yang kamu suka dan tidak suka"],
  },
  {
    slug: "struktur-isi",
    nama: "Struktur & isi",
    mulai: 2,
    selesai: 2,
    ringkas:
      "Peta halaman dan kerangka tiap halaman disusun sebelum satu piksel digambar. Di sinilah isi yang belum ada ketahuan, selagi masih murah untuk diperbaiki.",
    hasil: ["Sitemap", "Kerangka halaman utama", "Daftar isi yang masih kurang"],
    dariKlien: [
      "Profil perusahaan, daftar layanan atau produk",
      "Foto asli — tim, kantor, pekerjaan",
      "Nama penanggung jawab yang bisa memutuskan",
    ],
  },
  {
    slug: "desain",
    nama: "UI/UX design",
    mulai: 3,
    selesai: 4,
    ringkas:
      "Halaman utama dan dua halaman kunci didesain penuh, lalu sisanya mengikuti sistem yang sama. Dua putaran revisi sudah termasuk.",
    hasil: ["Desain halaman utama & kunci", "Sistem warna dan huruf", "Tampilan ponsel"],
    dariKlien: ["Umpan balik terkumpul dalam satu putaran, bukan menetes"],
  },
  {
    slug: "pembangunan",
    nama: "Pembangunan",
    mulai: 5,
    selesai: 7,
    ringkas:
      "Desain dibangun jadi website sungguhan: cepat, dasar SEO-nya beres, dan isinya bisa kamu ubah sendiri. Kamu dapat tautan pratinjau sejak minggu kelima.",
    hasil: ["Website berjalan di tautan pratinjau", "CMS", "Formulir masuk ke inbox kamu"],
    dariKlien: ["Isi final", "Akses domain dan email bisnis"],
  },
  {
    slug: "uji-luncur",
    nama: "Uji & luncur",
    mulai: 8,
    selesai: 8,
    ringkas:
      "Uji di ponsel dan browser sungguhan, pasang Google Analytics, arahkan domain, lalu satu sesi rekaman supaya timmu bisa jalan sendiri.",
    hasil: ["Website live di domainmu", "Rekaman panduan pakai", "30 hari perbaikan bug gratis"],
    dariKlien: ["Satu jam untuk sesi serah terima"],
  },
];

/** Web apps run the same shape; phase 4 is where the extra weeks land. */
export const catatanDurasi =
  "Aplikasi web dan sistem internal memakai alur yang sama, tapi tahap pembangunan biasanya 12–16 minggu tergantung jumlah peran pengguna dan integrasi.";
