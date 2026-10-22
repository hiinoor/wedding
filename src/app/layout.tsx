import type { Metadata, Viewport } from "next";
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

const siteUrl = "https://www.thekhushbooparagstory.life";
const previewImage = "/images/khushboo-parag-share-v2.jpg";
const shareDescription = "24–25 November 2026 · La Vista Resort Lakeside, Nagpur";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Khushboo & Parag | Wedding Celebration",
  description: shareDescription,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Khushboo & Parag",
    title: "Khushboo & Parag",
    description: shareDescription,
    images: [{ url: previewImage, width: 1200, height: 630, type: "image/jpeg", alt: "Illustrated portrait of Khushboo and Parag" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khushboo & Parag",
    description: shareDescription,
    images: [previewImage],
  },
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
