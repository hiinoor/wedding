"use client";

import { useEffect, useState } from "react";

export function HeroBackgroundVideo() {
  const [videoMode, setVideoMode] = useState<"desktop" | "mobile" | null>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 767px)");
    const updatePlayback = () => setVideoMode(motionPreference.matches ? null : mobileViewport.matches ? "mobile" : "desktop");

    updatePlayback();
    motionPreference.addEventListener("change", updatePlayback);
    mobileViewport.addEventListener("change", updatePlayback);
    return () => {
      motionPreference.removeEventListener("change", updatePlayback);
      mobileViewport.removeEventListener("change", updatePlayback);
    };
  }, []);

  if (!videoMode) return null;

  const mobile = videoMode === "mobile";

  return (
    <video
      key={videoMode}
      className="hero__video"
      src={mobile ? "/videos/landing-background-mobile-portrait.mp4" : "/videos/landing-background-desktop-4k.mp4"}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={mobile ? "/videos/landing-poster-mobile.jpg" : "/videos/landing-poster-desktop.jpg"}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
