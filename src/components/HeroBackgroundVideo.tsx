"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoMode, setVideoMode] = useState<"desktop" | "mobile" | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [playing, setPlaying] = useState(false);

  const requestPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("webkit-playsinline", "");
    try {
      const playback = video.play();
      if (playback) void playback.catch(() => setNeedsTap(true));
    } catch {
      setNeedsTap(true);
    }
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 767px)");
    const updatePlayback = () => {
      setReducedMotion(motionPreference.matches);
      setVideoMode(mobileViewport.matches ? "mobile" : "desktop");
    };

    updatePlayback();
    motionPreference.addEventListener("change", updatePlayback);
    mobileViewport.addEventListener("change", updatePlayback);
    return () => {
      motionPreference.removeEventListener("change", updatePlayback);
      mobileViewport.removeEventListener("change", updatePlayback);
    };
  }, []);

  useEffect(() => {
    if (!videoMode) return;

    if (reducedMotion) {
      videoRef.current?.pause();
      return;
    }

    const startFrame = window.requestAnimationFrame(requestPlayback);
    const fallbackTimer = window.setTimeout(() => {
      if (videoRef.current?.paused) setNeedsTap(true);
    }, 2500);
    const retryWhenVisible = () => {
      if (!document.hidden && videoRef.current?.paused) requestPlayback();
    };

    document.addEventListener("visibilitychange", retryWhenVisible);
    return () => {
      window.cancelAnimationFrame(startFrame);
      window.clearTimeout(fallbackTimer);
      document.removeEventListener("visibilitychange", retryWhenVisible);
    };
  }, [videoMode, reducedMotion, requestPlayback]);

  if (!videoMode) return null;

  const mobile = videoMode === "mobile";

  return (
    <>
      <video
        ref={videoRef}
        key={videoMode}
        className="hero__video"
        src={mobile ? "/videos/landing-background-mobile-portrait.mp4" : "/videos/landing-background-desktop-4k.mp4"}
        autoPlay={!reducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
        poster={mobile ? "/videos/landing-poster-mobile.jpg" : "/videos/landing-poster-desktop.jpg"}
        aria-hidden="true"
        tabIndex={-1}
        onLoadStart={() => setPlaying(false)}
        onCanPlay={() => { if (!reducedMotion && videoRef.current?.paused) requestPlayback(); }}
        onPlaying={() => { setPlaying(true); setNeedsTap(false); }}
        onPause={() => { setPlaying(false); if (!document.hidden) setNeedsTap(true); }}
        onError={() => setNeedsTap(true)}
        onClick={requestPlayback}
      />
      {needsTap || (reducedMotion && !playing) ? (
        <button className="hero__video-play" type="button" onClick={requestPlayback} aria-label="Play background video">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" fill="currentColor" /></svg>
          <span>Play video</span>
        </button>
      ) : null}
    </>
  );
}
