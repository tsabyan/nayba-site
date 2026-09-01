import { ImageResponse } from "next/og";
import { studio } from "@/content/studio";

export const alt = "Nayba — studio web untuk website perusahaan dan aplikasi web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function GambarOG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: 72,
        }}
      >
        <span
          style={{ color: "#0b0b0b", fontSize: 26, letterSpacing: 11, textTransform: "uppercase" }}
        >
          Nayba
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#0b0b0b",
            fontSize: 104,
            lineHeight: 1,
            letterSpacing: -2,
            textTransform: "uppercase",
          }}
        >
          <span>Website</span>
          <span>dan Sistem</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 24 }}>
          <span style={{ background: "#0c56df", color: "#fff", padding: "10px 26px", borderRadius: 40 }}>
            Balas &lt; 4 jam
          </span>
          <span style={{ color: "#6f6f6f" }}>Website perusahaan 8 minggu</span>
          <span style={{ color: "#6f6f6f" }}>·</span>
          <span style={{ color: "#6f6f6f" }}>{studio.kota}</span>
        </div>
      </div>
    ),
    size,
  );
}
