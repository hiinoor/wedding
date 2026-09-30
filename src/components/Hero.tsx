import { HeroBackgroundVideo } from "@/components/HeroBackgroundVideo";
import { wedding } from "@/data/wedding";

export function Hero() {
  const { bride, groom } = wedding.couple;

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <HeroBackgroundVideo />
      <div className="hero__inner site-container">
        <div className="hero__content">
          <p className="hero__pretitle">{wedding.heroEyebrow}</p>
          <h1 id="hero-title" className="hero__title">
            <span>{bride}</span>
            <span className="hero__ampersand">&</span>
            <span>{groom}</span>
          </h1>
          <p className="hero__details">
            <span>{wedding.dates[0]}–{wedding.dates[1]} {wedding.month} {wedding.year}</span>
            <span className="hero__details-divider" aria-hidden="true">|</span>
            <span>{wedding.travel.venue.city}</span>
          </p>
          <p className="hero__tagline">{wedding.heroTagline}</p>
        </div>
      </div>
      <a className="hero__scroll" href="#portraits" aria-label="Scroll to the photo gallery">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <path d="m5 9 7 7 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
