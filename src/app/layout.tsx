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
const invitationMessage = [
  "We’re getting married! ❤️",
  "We’d love for you to join us in Nagpur on 24–25 November 2026 as we celebrate this very special chapter of our lives with our favourite people. ✨",
  "From the festivities to the wedding, we’re looking forward to a couple of days filled with love, laughter, music and lots of memories together. 🥂💃🏻",
  "📍 La Vista Resort Lakeside, Nagpur",
  "Everything you need to know about the celebrations, stay, travel & more is here:\nhttps://www.thekhushbooparagstory.life/",
  "Can’t wait to celebrate with you! ❤️",
].join("\n\n");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Khushboo & Parag | Wedding Celebration",
  description: invitationMessage,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Khushboo & Parag",
    title: "We’re getting married! ❤️",
    description: invitationMessage,
    images: [{ url: previewImage, width: 1200, height: 630, type: "image/jpeg", alt: "Illustrated portrait of Khushboo and Parag" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "We’re getting married! ❤️",
    description: invitationMessage,
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
