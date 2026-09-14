/**
 * What a visitor is told about price, given that there is no price list.
 *
 * Nayba has no rate card and no floor, and inventing one is the single thing
 * this site is built not to do — a published "mulai dari" that no project has
 * ever been sold at is a fabricated number, however harmless it looks.
 *
 * So this page answers the question behind the question. Someone asking "berapa
 * harganya" on a studio site is usually asking three things at once: am I in
 * the right place at all, what makes this expensive, and when do I find out.
 * Those three are answerable truthfully today.
 *
 * `anggaran` is the single source for the brief form's budget select as well.
 * The two used to be written out separately, which is how a page could offer
 * one set of brackets while the form beneath it offered another.
 */

/**
 * Budget brackets.
 *
 * These are what we ASK, not what we CHARGE — the distinction is the whole
 * reason this file can exist without lying. Publishing them gives a visitor
 * the orientation they came for (is this a Rp 5 juta shop or a Rp 50 juta
 * one?) without claiming a price for any particular piece of work.
 *
 * "Belum tahu" is last and is a real answer. Removing it does not make people
 * pick a bracket; it makes them guess, and a guessed bracket is worse than no
 * bracket because it gets treated as a fact in the first reply.
 */
export const anggaran = [
  "Di bawah Rp 25 juta",
  "Rp 25–50 juta",
  "Rp 50–100 juta",
  "Di atas Rp 100 juta",
  "Belum tahu",
] as const;

/** Everything here is already stated on a service page. Nothing new is added. */
export const menaikkan = [
  {
    judul: "Katalog yang bisa disaring",
    isi: "Daftar produk statis dan katalog yang bisa disaring, dibandingkan, dan diperbarui sendiri adalah dua pekerjaan berbeda. Yang kedua butuh basis data, panel admin, dan pemikiran soal apa yang terjadi saat isinya berubah.",
  },
  {
    judul: "Dua bahasa",
    isi: "Bukan sekadar menerjemahkan halaman. Setiap label, pesan galat, format tanggal, dan alamat halaman ditulis dua kali — dan harus tetap sinkron setelah kami pergi.",
  },
  {
    judul: "Integrasi ke sistem yang sudah jalan",
    isi: "Akuntansi, gudang, pembayaran, atau apa pun yang sudah dipakai. Biayanya jarang ada di sisi kami — yang mahal adalah mencari tahu bagaimana sistem lama itu sebenarnya bekerja.",
  },
  {
    judul: "Migrasi data lama",
    isi: "Memindahkan isi spreadsheet atau sistem lama. Yang memakan waktu bukan pemindahannya, tapi merapikan data yang selama ini dibiarkan tidak konsisten.",
  },
  {
    judul: "Peran pengguna dan jejak audit",
    isi: "Siapa boleh melihat apa, siapa boleh menyetujui sampai batas berapa, dan catatan siapa mengubah apa dan kapan. Diperlukan untuk pemeriksaan, dan tidak bisa ditambahkan belakangan tanpa membongkar.",
  },
  {
    judul: "Halaman di luar delapan",
    isi: "Website perusahaan dihitung sampai delapan halaman. Di atas itu dihitung terpisah, dan kamu setujui dulu sebelum dikerjakan.",
  },
] as const;

export const menurunkan = [
  {
    judul: "Materi sudah siap",
    isi: "Tulisan dan foto yang sudah ada memangkas bagian proses yang paling sering molor. Kami menyusun kerangkanya; mengisi materi dari nol bukan bagian dari pekerjaan kami.",
  },
  {
    judul: "Satu orang yang berwenang memutuskan",
    isi: "Revisi mahal bukan karena jumlah perubahannya, tapi karena perubahan yang saling membatalkan. Satu pengambil keputusan memangkas itu lebih banyak daripada memangkas fitur.",
  },
  {
    judul: "Alur kerja sudah dipetakan",
    isi: "Kalau kamu sudah tahu persis bagaimana prosesnya berjalan sekarang — termasuk pengecualiannya — minggu pemetaan jadi jauh lebih pendek.",
  },
  {
    judul: "Diluncurkan bertahap",
    isi: "Yang paling menyakitkan dulu, sisanya menyusul setelah ada yang dipakai. Ini hampir selalu pilihan yang lebih murah, dan hampir selalu ditolak lebih dulu.",
  },
] as const;

/** Collected from content/jaminan.ts and the service pages. Nothing new. */
export const tidakDitagihTerpisah = [
  "Dua putaran revisi yang sudah masuk ruang lingkup",
  "Perbaikan bug selama 30 hari setelah luncur",
  "Sesi serah terima, direkam supaya bisa diputar ulang staf baru",
  "Pendaftaran domain, hosting, dan kode atas nama perusahaanmu",
] as const;

export const tanya = [
  {
    t: "Kenapa tidak ada daftar harga?",
    j: "Karena kami belum punya. Nayba tidak menjual paket — tiap pekerjaan dihitung dari ruang lingkupnya, dan menayangkan angka yang belum pernah kami pakai sama saja mengarang. Yang bisa kami berikan sekarang adalah rentang anggaran yang kami tanyakan dan daftar hal yang menentukan harganya. Begitu ada cukup proyek untuk tahu lantainya, angkanya akan ada di halaman ini.",
  },
  {
    t: "Kapan saya tahu angkanya?",
    j: "Akhir minggu pertama. Kami mulai dengan memetakan apa yang sebenarnya perlu diselesaikan, lalu kamu terima ruang lingkup tertulis dan harga tetap — bukan kisaran. Setelah itu harganya tidak berubah.",
  },
  {
    t: "Kalau anggaran saya di bawah rentang terendah?",
    j: "Bilang saja. Kami balas di pesan pertama kalau memang tidak cocok, bukan setelah tiga rapat — dan kalau ada cara lain yang lebih masuk akal untuk anggaran itu, biasanya kami sebutkan. Menolak lebih awal lebih murah untuk semua orang.",
  },
  {
    t: "Domain dan hosting dihitung terpisah?",
    j: "Dua pilihan. Kamu urus sendiri — domain dan akun hosting didaftarkan atas nama perusahaanmu sejak awal. Atau titip di hosting kami, biasanya lebih murah daripada berlangganan sendiri karena berbagi server dengan klien lain. Apa pun pilihannya, domain dan kode tetap atas namamu dan bisa dipindah kapan saja tanpa minta izin kami.",
  },
  {
    t: "Kalau di tengah jalan ruang lingkupnya berubah?",
    j: "Perubahan kecil kami serap. Perubahan yang menambah halaman atau fitur kami hitung terpisah dan kamu setujui dulu sebelum dikerjakan. Tidak ada tagihan kejutan.",
  },
] as const;
