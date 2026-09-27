import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { wedding, weddingDateRange } from "@/data/wedding";

export const alt = `Khushboo & Parag — ${weddingDateRange}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const [serif, sans, portrait, logo] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/manrope/files/manrope-latin-500-normal.woff")),
    readFile(join(process.cwd(), "public/images/portrait-mint.jpg")),
    readFile(join(process.cwd(), "public/assets/kp-monogram.png")),
  ]);

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#F7F1E8", color: "#6E2838" }}>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", width: 710, height: "100%", padding: "72px 72px 68px 78px" }}>
        <div style={{ position: "absolute", inset: 25, border: "1px solid #B28A52", opacity: 0.62 }} />
        <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="" width={82} height={88} style={{ position: "absolute", top: 48, left: 70, objectFit: "contain" }} />
        <div style={{ display: "flex", flexDirection: "column", marginTop: 86 }}>
          <div style={{ fontFamily: "Manrope", fontSize: 17, letterSpacing: 5, textTransform: "uppercase", color: "#B28A52" }}>Wedding celebration</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 22, fontFamily: "Cormorant Garamond", fontSize: 100, lineHeight: 0.79, letterSpacing: -5 }}>
            <span>{wedding.couple.bride}</span>
            <span style={{ color: "#B28A52", fontSize: 65, fontStyle: "italic", margin: "10px 0 10px 20px" }}>&amp;</span>
            <span>{wedding.couple.groom}</span>
          </div>
          <div style={{ marginTop: 42, fontFamily: "Cormorant Garamond", fontSize: 40, letterSpacing: 1 }}>{weddingDateRange}</div>
          <div style={{ marginTop: 8, fontFamily: "Manrope", fontSize: 15, letterSpacing: 1 }}>{wedding.heroTagline}</div>
        </div>
      </div>
      <div style={{ position: "relative", display: "flex", width: 490, height: "100%", overflow: "hidden", background: "#E9DFD2" }}>
        <img src={`data:image/jpeg;base64,${portrait.toString("base64")}`} alt="" width={490} height={630} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 37%" }} />
        <div style={{ position: "absolute", inset: 20, border: "1px solid rgba(247, 241, 232, 0.7)" }} />
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Cormorant Garamond", data: serif, style: "normal", weight: 400 },
        { name: "Manrope", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}
