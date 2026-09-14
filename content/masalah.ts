/**
 * Landing pages built on a problem, not on an industry.
 *
 * The obvious move is a page per vertical — "website untuk koperasi", "website
 * untuk distributor" — because that is what people search. The problem is that
 * a page titled that way claims experience in that sector, and Nayba has two
 * projects: a district government archive and an online grocery. A koperasi
 * page would be a claim we cannot evidence, which is the one thing this site
 * refuses to do.
 *
 * So each entry here is a problem SHAPE, and each one points at the case study
 * that proves we have solved it. `dimana` lists the kinds of organisation where
 * the problem turns up — a statement about the problem, not a claim about our
 * client list. The distinction is the whole reason these pages can exist.
 *
 * Add a third only when a project exists to put in `bukti`. A page with no
 * evidence behind it is a brochure.
 */
export type Masalah = {
  slug: string;
  /** The problem, phrased the way someone living with it would say it. */
  nama: string;
  mata: string;
  ringkas: string;
  /** Symptoms. If three of these land, the page is talking to the right person. */
  tanda: string[];
  /** What it costs to leave it alone. */
  akibat: string[];
  yangKamiBangun: string[];
  /** Where the problem shows up — not a list of clients we have had. */
  dimana: string[];
  durasi: string;
  /** Slug of the case study that evidences this. Required, not optional. */
  bukti: string;
  tanya: { t: string; j: string }[];
};

export const masalah: Masalah[] = [
  {
    slug: "arsip-dan-dokumen",
    mata: "Arsip & dokumen",
    nama: "Dokumen yang hanya ada di lemari",
    durasi: "8 minggu",
    bukti: "klop-dinas-pertanian-sampang",
    ringkas:
      "Berkas fisik punya dua sifat yang tidak pernah membaik: dia rusak pelan-pelan, dan dia hanya bisa ditemukan oleh orang yang tahu di mana menaruhnya. Kami bangun tempat arsip dipindai, disimpan, dicari, dan diunduh — supaya pengetahuan itu tidak ikut pindah waktu orangnya pindah.",
    tanda: [
      "Mencari satu berkas lama butuh orang tertentu yang kebetulan ingat",
      "Ada lemari yang isinya tidak pernah benar-benar didaftar",
      "Salinan yang sama tersebar di beberapa meja, dan tidak jelas mana yang terbaru",
      "Berkas dipinjam dan tidak selalu kembali",
      "Pemeriksaan datang, dan penyiapannya memakan berhari-hari",
    ],
    akibat: [
      "Waktu staf habis untuk mencari, bukan untuk mengerjakan",
      "Dokumen yang rusak atau hilang tidak punya cadangan",
      "Orang yang pensiun atau pindah membawa pergi cara menemukannya",
    ],
    yangKamiBangun: [
      "Unggah hasil pindai, lengkap dengan penomoran dan klasifikasi yang sudah kamu pakai",
      "Pencarian berdasarkan judul, nomor, tahun, dan klasifikasi",
      "Pratinjau dan unduh tanpa perlu membuka aplikasi lain",
      "Peran pengguna: siapa boleh melihat, siapa boleh mengunggah, siapa boleh menghapus",
      "Jejak audit — siapa mengubah apa dan kapan",
      "Pencadangan harian",
      "Buku panduan, supaya staf baru bisa mulai tanpa menghubungi kami",
    ],
    dimana: [
      "Dinas dan lembaga pemerintah daerah",
      "Koperasi dan lembaga keuangan mikro",
      "Yayasan, sekolah, dan pesantren",
      "Klinik dan laboratorium",
      "Perusahaan dengan kewajiban simpan dokumen bertahun-tahun",
    ],
    tanya: [
      {
        t: "Siapa yang memindai dokumennya?",
        j: "Tim kamu. Kami bangun tempatnya dan melatih cara mengunggah, tapi memindai ribuan lembar adalah pekerjaan yang jauh lebih murah dikerjakan orang yang sudah ada di ruangan itu daripada dibayarkan ke kami.",
      },
      {
        t: "Kalau internet di kantor kami tidak stabil?",
        j: "Bilang di awal. Itu mengubah keputusan teknis sejak minggu pertama — ukuran berkas, cara unggah bertahap, dan apakah ada yang perlu jalan tanpa jaringan. Diketahui di akhir proyek, perbaikannya jauh lebih mahal.",
      },
      {
        t: "Dokumen kami rahasia. Bagaimana pengamanannya?",
        j: "Peran pengguna membatasi siapa boleh melihat apa, jejak audit mencatat setiap akses dan perubahan, dan pencadangan berjalan harian. Kami tidak mengklaim lebih dari itu — kalau kamu terikat aturan yang menyebut standar tertentu, tunjukkan aturannya di minggu pertama supaya kami bisa bilang sanggup atau tidak.",
      },
    ],
  },
  {
    slug: "katalog-dan-pemesanan",
    mata: "Katalog & pemesanan",
    nama: "Pesanan yang masuk lewat chat, satu per satu",
    durasi: "10 minggu",
    bukti: "dapoer-emak",
    ringkas:
      "Selama pesanan diketik ulang dari chat ke catatan, jumlah pesanan per hari dibatasi oleh jumlah jam orang yang mengetiknya. Kami bangun katalog yang bisa dipilih sendiri oleh pembeli dan pesanan yang sudah terangkum rapi sebelum sampai ke kamu.",
    tanda: [
      "Daftar harga dikirim sebagai gambar atau PDF, dan sudah beberapa kali salah versi",
      "Pesanan diketik ulang dari chat ke spreadsheet",
      "Pertanyaan yang sama — stok, harga, ongkir — dijawab berulang setiap hari",
      "Stok yang habis baru ketahuan setelah pembeli memesannya",
      "Tidak ada tempat untuk melihat pesanan bulan lalu selain menggulung chat",
    ],
    akibat: [
      "Salah ketik jadi salah kirim, dan biayanya ditanggung kamu",
      "Pembeli yang bertanya di luar jam kerja menunggu sampai besok",
      "Tidak ada angka yang bisa dipakai untuk tahu produk mana yang sebenarnya laku",
    ],
    yangKamiBangun: [
      "Katalog yang bisa disaring dan dicari, dengan stok yang ikut berubah",
      "Keranjang dan checkout yang merangkum pesanan jadi satu ringkasan siap kirim",
      "Panel admin untuk mengurus produk, harga, dan voucher tanpa menghubungi kami",
      "Status pesanan yang bisa dilihat pembeli sendiri",
      "Ekspor ke Excel sebagai fitur, bukan tambahan",
      "Formulir dan ringkasan yang masuk ke WhatsApp atau inbox yang kamu pakai sekarang",
    ],
    dimana: [
      "Distributor dan grosir yang pembelinya memesan berulang",
      "Produsen dengan katalog yang perlu disaring pembeli",
      "Toko bahan pangan, frozen food, dan kebutuhan harian",
      "Usaha yang selama ini berjualan lewat chat dan mulai kewalahan",
    ],
    tanya: [
      {
        t: "Apakah ini berarti kami harus berhenti pakai WhatsApp?",
        j: "Tidak. Sebagian besar pembeli akan tetap bertanya lewat WhatsApp, dan itu wajar. Yang berubah adalah isi percakapannya — bukan lagi mengetikkan daftar pesanan, tapi mengonfirmasi ringkasan yang sudah jadi.",
      },
      {
        t: "Pembayarannya bagaimana?",
        j: "Tergantung yang kamu pakai sekarang. Transfer manual dengan konfirmasi di panel admin adalah yang paling sederhana dan paling sering cukup. Payment gateway bisa, tapi itu menambah biaya per transaksi dan proses pendaftaran atas nama badan usaha — kami bahas untung ruginya di minggu pertama, bukan memutuskan sendiri.",
      },
      {
        t: "Data produk kami ada di spreadsheet. Bisa dipindah?",
        j: "Bisa, dan migrasinya termasuk. Yang memakan waktu bukan pemindahannya, tapi merapikan data yang selama ini dibiarkan tidak konsisten — nama produk yang ditulis tiga cara berbeda, satuan yang tercampur. Itu kami kerjakan bersama kamu, karena hanya kamu yang tahu mana yang benar.",
      },
    ],
  },
];

export function satuMasalah(slug: string) {
  return masalah.find((m) => m.slug === slug);
}
