/**
 * Engagement models — the reference template runs a "three ways of working with
 * us" block on both its services page and every case study, and it is a good
 * prompt: all three of these are real ways Nayba takes work, and none of them
 * require a claim that cannot be backed up.
 */
export const kerjasama = [
  {
    nama: "Proyek harga tetap",
    isi: "Ruang lingkup dan harga ditetapkan di akhir minggu pertama, lalu tidak berubah. Cocok untuk pekerjaan yang bentuknya sudah jelas — website perusahaan, katalog, sistem dengan alur yang sudah dipetakan.",
  },
  {
    nama: "Konsultasi",
    isi: "Sesi berbayar untuk menilai sistem yang sudah jalan, memetakan alur kerja, atau memutuskan arah teknis. Tidak ada kewajiban melanjutkan ke proyek.",
  },
  {
    nama: "Retainer perawatan",
    isi: "Biaya bulanan untuk hosting, pembaruan, pemantauan, dan perubahan kecil. Dimulai setelah 30 hari perbaikan bug gratis selesai, dan bisa dihentikan kapan saja.",
  },
] as const;
