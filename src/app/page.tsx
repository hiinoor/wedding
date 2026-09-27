import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import SymmetryCarousel from "@/components/SymmetryCarousel/SymmetryCarousel";
import { Schedule } from "@/components/Schedule";
import { DressCode } from "@/components/DressCode";
import { Travel } from "@/components/Travel";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { wedding } from "@/data/wedding";

const portraitSlides = wedding.portraitSlides.map((slide) => ({
  id: slide.id,
  image: slide.image,
  imagePosition: slide.imagePosition,
  name: wedding.couple[slide.person],
  role: slide.person === "bride" ? "The Bride" : "The Groom",
}));

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SymmetryCarousel slides={portraitSlides} />
        <Schedule />
        <DressCode />
        <Travel />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
