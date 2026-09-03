import { Hero } from "@/components/sections/Hero";
import { KaryaTumpuk } from "@/components/sections/KaryaTumpuk";
import { Layanan } from "@/components/sections/Layanan";
import { Keahlian } from "@/components/sections/Keahlian";
import { ProsesRingkas } from "@/components/sections/ProsesRingkas";
import { Jaminan } from "@/components/sections/Jaminan";
import { Fakta } from "@/components/sections/Fakta";
import { Kecocokan } from "@/components/sections/Kecocokan";

export default function Beranda() {
  return (
    <>
      <Hero />
      <KaryaTumpuk />
      <Layanan />
      <Keahlian />
      <ProsesRingkas />
      <Jaminan />
      <Fakta />
      <Kecocokan />
    </>
  );
}
