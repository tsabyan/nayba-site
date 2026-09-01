import { studio } from "@/content/studio";

export type Brief = {
  nama: string;
  perusahaan: string;
  kontak: string;
  jenis: string;
  anggaran: string;
  mulai: string;
  cerita: string;
};

export type HasilKirim = { ok: true } | { ok: false; pesan: string };

/**
 * The single place a brief leaves the browser.
 *
 * Delivery currently runs through Web3Forms so the site needs no server and no
 * account beyond an inbox. Swapping to a route handler with Resend later means
 * rewriting this function and nothing else.
 */
export async function kirimBrief(brief: Brief): Promise<HasilKirim> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: studio.formKey,
        from_name: "Website Nayba",
        subject: `Brief baru — ${brief.perusahaan || brief.nama}`,
        Nama: brief.nama,
        Perusahaan: brief.perusahaan,
        Kontak: brief.kontak,
        "Jenis proyek": brief.jenis,
        "Rentang anggaran": brief.anggaran,
        "Target mulai": brief.mulai,
        Cerita: brief.cerita,
      }),
    });

    if (!res.ok) {
      return { ok: false, pesan: "Server penerima menolak kiriman." };
    }
    const data = (await res.json()) as { success?: boolean; message?: string };
    if (!data.success) {
      return { ok: false, pesan: data.message ?? "Kiriman tidak diterima." };
    }
    return { ok: true };
  } catch {
    return { ok: false, pesan: "Koneksi gagal." };
  }
}
