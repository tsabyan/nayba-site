import { Kontainer } from "@/components/layout/Kontainer";
import { Tombol } from "@/components/ui/Tombol";

export default function TidakDitemukan() {
  return (
    <Kontainer className="py-28 md:py-40">
      <p className="mata text-biru">404</p>
      <h1 className="tampil mt-7 max-w-3xl text-panji">Halaman ini tidak ada</h1>
      <p className="mt-8 max-w-lg text-lg">
        Mungkin tautannya salah ketik, atau halamannya sudah dipindah. Coba dari
        beranda, atau langsung tanya kalau yang kamu cari memang tidak ketemu.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Tombol href="/">Ke beranda</Tombol>
        <Tombol href="/kontak" jenis="garis">Tanya langsung</Tombol>
      </div>
    </Kontainer>
  );
}
