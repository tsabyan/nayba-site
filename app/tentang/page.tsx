import type { Metadata } from "next";
import { Panji } from "@/components/layout/Panji";
import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { Kerjasama } from "@/components/sections/Kerjasama";
import { studio } from "@/content/studio";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Nayba adalah studio kecil yang membangun website perusahaan dan aplikasi web. Cara kami bekerja, dan apa yang kami pegang.",
};

/* The reference's about page runs three value blocks — agency, mission, team.
   The first two map cleanly; the third is a grid of portraits and headcount,
   which Nayba does not publish, so capacity takes its place. */
const blok = [
  {
    nama: "Studio",
    isi: "Kami tidak menyebut jumlah orang di studio ini, karena angka itu tidak memberi tahu apa pun yang berguna. Yang penting adalah siapa yang mengerjakan pekerjaanmu — dan orang itu yang akan kamu ajak bicara sejak temu kenal sampai serah terima.",
  },
  {
    nama: "Cara kerja",
    isi: "Remote, dengan panggilan video terjadwal di tiap tahap. Pemetaan alur kerja kami kerjakan lewat sesi bersama semua bagian yang terlibat, dan hasilnya kamu terima tertulis.",
  },
  {
    nama: "Kapasitas",
    isi: "Maksimal tiga proyek sekaligus. Bukan karena tidak bisa lebih, tapi karena di atas itu waktu balas melambat, dan itu hal pertama yang kamu rasakan.",
  },
];

const prinsip = [
  {
    judul: "Jadwal dan harga di depan",
    isi: "Ruang lingkup selesai sebelum pengerjaan dimulai, dan harganya tetap. Kalau ada tambahan di tengah jalan, kamu setujui dulu sebelum kami kerjakan.",
  },
  {
    judul: "Bicara dengan yang mengerjakan",
    isi: "Tidak ada lapisan manajer akun yang meneruskan pesan. Orang yang menjawab pertanyaanmu adalah orang yang menulis kodenya.",
  },
  {
    judul: "Semuanya atas namamu",
    isi: "Domain, hosting, dan kode didaftarkan atas nama perusahaanmu sejak awal. Berhenti bekerja sama tidak berarti kehilangan website kamu.",
  },
  {
    judul: "Kami bilang kalau bukan bidang kami",
    isi: "Menolak pekerjaan yang tidak kami kuasai lebih murah untuk semua orang daripada mengerjakannya setengah jadi.",
  },
];

export default function HalamanTentang() {
  return (
    <>
      <Panji
        mata="Tentang"
        judul="Studio kecil, sengaja"
        ringkas={`Nayba membangun website perusahaan dan aplikasi web dari ${studio.kota}, untuk klien di seluruh Indonesia.`}
      />

      <section className="py-20 md:py-28">
        <Kontainer>
          <dl className="grid gap-12 md:grid-cols-3 md:gap-10">
            {blok.map((b, i) => (
              <Muncul key={b.nama} jenis="naik" urutan={i} durasi={1.2}>
                <dt className="tampil text-anak">{b.nama}</dt>
                <dd className="mt-5">{b.isi}</dd>
              </Muncul>
            ))}
          </dl>
        </Kontainer>
      </section>

      <section data-maju="lewat" className="morf py-20 text-putih md:py-28 lg:py-32">
        <Kontainer>
          <Muncul jenis="naik">
            <h2 data-maju className="tampil lacak max-w-4xl text-kategori text-putih">
              Empat hal yang kami pegang
            </h2>
          </Muncul>

          <dl className="mt-16 grid gap-12 sm:grid-cols-2 lg:gap-x-20">
            {prinsip.map((p, i) => (
              <Muncul key={p.judul} jenis="naik" urutan={i % 2} durasi={1.2}>
                <dt className="tampil flex items-baseline gap-4 text-anak text-putih">
                  <span className="text-sm text-putih/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.judul}
                </dt>
                <dd className="mt-5 text-putih/85">{p.isi}</dd>
              </Muncul>
            ))}
          </dl>
        </Kontainer>
      </section>

      <Kerjasama />
    </>
  );
}
