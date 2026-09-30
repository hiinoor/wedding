import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HexPhotoGallery } from "@/components/HexPhotoGallery/HexPhotoGallery";
import { Schedule } from "@/components/Schedule";
import { DressCode } from "@/components/DressCode";
import { Travel } from "@/components/Travel";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HexPhotoGallery />
        <Schedule />
        <DressCode />
        <Travel />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
