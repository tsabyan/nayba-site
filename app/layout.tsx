import type { Metadata } from "next";
import { Barlow_Condensed, Poppins } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Gerak } from "@/components/Gerak";
import { AtasCepat } from "@/components/AtasCepat";
import { DataTerstruktur } from "@/components/DataTerstruktur";
import { studio } from "@/content/studio";
import "./globals.css";

/* The reference sets its display type in DIN Condensed Bold, which is not
   free. Barlow Condensed is the closest free match in geometry and weight. */
const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(studio.website),
  title: {
    default: `${studio.nama} — Studio web untuk website perusahaan & aplikasi web`,
    template: `%s — ${studio.nama}`,
  },
  description: studio.deskripsi,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: studio.nama,
    url: studio.website,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`${barlow.variable} ${poppins.variable}`}>
      <body className="bg-putih text-abu">
        {/* Reveals start hidden and are undone by Gerak. With scripting off
            that never happens, so hand those visitors the finished state. */}
        <noscript>
          <style>{".muncul{opacity:1;transform:none}"}</style>
        </noscript>

        <a
          href="#isi"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-biru focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-putih"
        >
          Lompat ke isi
        </a>

        {/* Scrolls over the fixed footer, uncovering it at the end. */}
        <div className="badan-gulir">
          <Header />
          <main id="isi">{children}</main>
        </div>

        <Footer />
        <AtasCepat />
        <Gerak />
        <DataTerstruktur />
      </body>
    </html>
  );
}
