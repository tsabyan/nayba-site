import { studio } from "@/content/studio";

/**
 * Every WhatsApp link on the site is built here.
 *
 * The number alone opens an empty chat, which puts the burden of the first
 * sentence on someone who has not decided to talk to us yet — the most common
 * place a warm visitor goes quiet. A prefilled opener removes that, and tells
 * us which page they came from.
 *
 * WhatsApp shows the text as a draft; it is editable and nothing is sent until
 * the visitor taps send.
 */
export const pesanWA = {
  /** Footer and general "say hi" placements. */
  umum: "Halo Nayba, saya ingin bertanya soal pembuatan website untuk perusahaan saya. Terima kasih.",
  /** Contact page, where the visitor already chose WhatsApp over the form. */
  kontak:
    "Halo Nayba, saya ingin bertanya soal pembuatan website atau aplikasi web. Boleh minta waktu sebentar untuk berdiskusi?",
  /** Shown after a brief lands, so the opener refers to it. */
  setelahBrief:
    "Halo Nayba, saya baru mengirim brief lewat situs. Ada beberapa hal yang ingin saya tambahkan.",
} as const;

export function tautanWA(pesan: string = pesanWA.umum) {
  return `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(pesan)}`;
}
