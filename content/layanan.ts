export type Layanan = {
  slug: string;
  nama: string;
  ringkas: string;
  durasi: string;
  untukSiapa: string[];
  termasuk: string[];
  tidakTermasuk: string[];
  tumpukan: string[];
  tanya: { t: string; j: string }[];
};

export const layanan: Layanan[] = [
  {
    slug: "website-perusahaan",
    nama: "Website perusahaan & landing",
    durasi: "8 minggu",
    ringkas:
      "Website yang menjelaskan apa yang perusahaanmu kerjakan dan mengubah pengunjung jadi percakapan. Setelah luncur, isinya bisa diurus tim kamu sendiri tanpa perlu memanggil kami.",
    untukSiapa: [
      "Perusahaan yang website-nya sudah lebih dari dua tahun tidak diperbarui",
      "Bisnis B2B yang penjualannya bergantung pameran, referensi, dan tim lapangan",
      "Perusahaan dengan katalog produk atau layanan yang perlu bisa disaring",
      "Perusahaan yang butuh website dua bahasa untuk pembeli luar negeri",
    ],
    termasuk: [
      "Sitemap dan kerangka tiap halaman sebelum desain dimulai",
      "Desain halaman utama dan dua halaman kunci, dua putaran revisi",
      "Pembangunan sampai delapan halaman, responsif di ponsel",
      "CMS yang bisa dipakai staf non-teknis",
      "Formulir masuk ke inbox kamu, lengkap dengan konteks halaman",
      "Google Analytics, sitemap, dan dasar SEO",
      "Sesi serah terima yang direkam, plus 30 hari perbaikan bug",
    ],
    tidakTermasuk: [
      "Penulisan isi dari nol — kami susun kerangkanya, kamu isi materinya",
      "Foto dan video produksi",
      "Iklan berbayar dan pengelolaan media sosial",
      "Aplikasi ponsel native",
    ],
    tumpukan: ["Next.js", "Vercel", "PostgreSQL bila perlu katalog"],
    tanya: [
      {
        t: "Berapa biayanya?",
        j: "Harga tetap, ditentukan di akhir minggu pertama setelah ruang lingkup jelas. Kami tidak memberi kisaran sebelum tahu jumlah halaman dan apakah butuh katalog — kisaran yang asal justru menyesatkan.",
      },
      {
        t: "Isinya bisa kami ubah sendiri?",
        j: "Ya. CMS termasuk dalam pengerjaan, dan sesi serah terima direkam supaya staf baru bisa belajar tanpa menghubungi kami.",
      },
      {
        t: "Domain dan hosting bagaimana?",
        j: "Dua pilihan. Kamu urus sendiri — domain dan akun hosting didaftarkan atas nama perusahaanmu sejak awal. Atau titip di hosting kami, biasanya lebih murah daripada berlangganan sendiri karena berbagi server dengan klien lain. Apa pun pilihannya, domain dan kode tetap atas namamu dan bisa dipindah kapan saja tanpa minta izin kami.",
      },
      {
        t: "Kalau di tengah jalan ruang lingkup berubah?",
        j: "Perubahan kecil kami serap. Perubahan yang menambah halaman atau fitur kami hitung terpisah dan kamu setujui dulu sebelum dikerjakan. Tidak ada tagihan kejutan.",
      },
    ],
  },
  {
    slug: "aplikasi-web",
    nama: "Aplikasi web & sistem internal",
    durasi: "12–16 minggu",
    ringkas:
      "Aplikasi web yang dibentuk mengikuti cara kerjamu, bukan sebaliknya. Sistem internal, portal pelanggan, booking, dashboard, alat operasional — apa pun yang tidak ada versi jadinya, atau yang jadinya tidak pernah benar-benar cocok.",
    untukSiapa: [
      "Software jadi sudah dicoba, tapi tidak ada yang pas dengan alur kerjamu",
      "Butuh portal untuk pelanggan, mitra, atau cabang",
      "Butuh booking, pengajuan, atau persetujuan berjenjang dengan batas wewenang",
      "Satu proses dijalankan lewat beberapa spreadsheet yang isinya sering berbeda",
      "Butuh jejak audit untuk pemeriksaan atau kepengurusan",
    ],
    termasuk: [
      "Pemetaan alur kerja bersama semua bagian terkait, sebelum desain",
      "Peran pengguna dan batas wewenang",
      "Jejak audit: siapa mengubah apa, kapan, dan nilai sebelumnya",
      "Migrasi data dari spreadsheet atau sistem lama",
      "Ekspor ke Excel sebagai fitur, bukan tambahan",
      "Pencadangan harian dan pemantauan",
      "Pelatihan per peran, direkam",
    ],
    tidakTermasuk: [
      "Aplikasi ponsel native",
      "Integrasi ke sistem pihak ketiga yang tidak punya API terbuka",
      "Sertifikasi kepatuhan formal — kami bangun jejaknya, auditnya di pihak lain",
    ],
    tumpukan: ["Next.js", "PostgreSQL", "Prisma", "VPS Indonesia atau Vercel"],
    tanya: [
      {
        t: "Kenapa dua hari pertama dipakai memetakan alur kerja?",
        j: "Karena proses yang tertulis di prosedur hampir selalu berbeda dari yang dijalankan sehari-hari. Memetakan yang sebenarnya berjalan biasanya menemukan langkah yang sudah lama tidak dipakai, dan langkah itu tidak perlu dibangun.",
      },
      {
        t: "Data kami disimpan di mana?",
        j: "Kamu yang menentukan. Untuk data keuangan atau data anggota, kami biasanya sarankan server di Indonesia supaya lokasinya jelas dan bisa dipertanggungjawabkan.",
      },
      {
        t: "Setelah selesai, siapa yang merawat?",
        j: "Bisa kami dengan biaya bulanan, bisa tim internalmu. Kodenya milik kamu dan kami serahkan lengkap dengan catatan cara menjalankannya.",
      },
      {
        t: "Bisa dikerjakan bertahap?",
        j: "Bisa, dan sering lebih baik begitu. Satu alur kerja diselesaikan sampai dipakai sungguhan dulu, baru alur berikutnya. Sistem yang dipakai separuh lebih berguna daripada sistem lengkap yang tidak pernah diluncurkan.",
      },
    ],
  },
];

export function satuLayanan(slug: string) {
  return layanan.find((l) => l.slug === slug);
}
