import type { Metadata, Viewport } from "next";
import { weddingDateRange } from "@/data/wedding";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@/styles/globals.css";
import "@/styles/header.css";
import "@/styles/hero.css";
import "@/styles/schedule.css";
import "@/styles/dress-code.css";
import "@/styles/travel.css";
import "@/styles/faq-footer.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  title: "Khushboo & Parag | Wedding Celebration",
  description:
    "Join Khushboo & Parag for three days of wedding celebrations, traditions and togetherness.",
  openGraph: {
    type: "website",
    title: "Khushboo & Parag",
    description: `${weddingDateRange} · La Vista Resort Lakeside, Nagpur`,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F7F1E8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
