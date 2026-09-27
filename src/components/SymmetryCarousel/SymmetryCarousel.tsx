"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./SymmetryCarousel.module.css";

export type CarouselSlide = {
  id: string;
  image: string;
  name: string;
  role: string;
  imagePosition?: string;
};

type Props = {
  slides: CarouselSlide[];
  initialIndex?: number;
};

function circularOffset(index: number, active: number, total: number) {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export default function SymmetryCarousel({ slides, initialIndex = 0 }: Props) {
  const [active, setActive] = useState(initialIndex);
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const total = slides.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.25) setHasEntered(true);
        else if (entry.intersectionRatio <= 0.02) setHasEntered(false);
      },
      { threshold: [0.02, 0.25] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || total < 2) return;

    let accumulatedX = 0;
    let lastWheelAt = 0;
    let lastSlideAt = 0;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;

      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? carousel.clientWidth : 1;
      const deltaX = event.deltaX * unit;
      const deltaY = event.deltaY * unit;

      if (Math.abs(deltaX) < 2 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) {
        accumulatedX = 0;
        return;
      }

      event.preventDefault();
      const now = performance.now();
      if (now - lastSlideAt < 500) return;
      if (now - lastWheelAt > 180) accumulatedX = 0;

      accumulatedX += deltaX;
      lastWheelAt = now;

      if (Math.abs(accumulatedX) >= 50) {
        const direction = accumulatedX > 0 ? 1 : -1;
        setActive((index) => (index + direction + total) % total);
        accumulatedX = 0;
        lastSlideAt = now;
      }
    };

    carousel.addEventListener("wheel", onWheel, { passive: false });
    return () => carousel.removeEventListener("wheel", onWheel);
  }, [total]);

  const current = slides[active];

  const go = (nextIndex: number) => {
    if (!total) return;
    setActive((nextIndex + total) % total);
  };

  const next = () => go(active + 1);
  const prev = () => go(active - 1);

  const positions = useMemo(
    () => slides.map((_, i) => circularOffset(i, active, total)),
    [slides, active, total]
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  if (!slides.length) return null;

  return (
    <section ref={sectionRef} id="portraits" className={styles.section} aria-label="Khushboo and Parag portrait carousel">
      <div className={styles.ornaments} aria-hidden="true">
        <span className={`${styles.flower} ${styles.flowerLeft}`} />
        <span className={`${styles.flower} ${styles.flowerRight}`} />
        <span className={styles.innerArch} />
      </div>
      <div className={styles.headingWrap}>
        <p className={styles.kicker}>A GLIMPSE OF US</p>
        <h2 className={styles.title}>The <em>Portraits</em></h2>
      </div>

      <div
        ref={carouselRef}
        className={styles.carousel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Choose a portrait"
      >
        <motion.div
          className={styles.stage}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.06}
          onDragEnd={(_, info) => {
            const moved = info.offset.x;
            const velocity = info.velocity.x;

            if (moved < -55 || velocity < -450) next();
            else if (moved > 55 || velocity > 450) prev();
          }}
        >
          {slides.map((slide, index) => {
            const offset = positions[index];
            const abs = Math.abs(offset);
            const activeCard = offset === 0;
            const visible = abs <= 1;

            const x =
              offset === 0
                ? 0
                : offset === 1
                ? 26
                : offset === -1
                ? -26
                : offset === 2
                ? 48
                : offset === -2
                ? -48
                : offset > 0
                ? 60
                : -60;

            const rotateY =
              offset === 0 ? 0 : offset > 0 ? -12 : 12;

            const scale =
              abs === 0 ? 1 : abs === 1 ? 0.84 : 0.72;

            const opacity =
              !visible ? 0 : abs === 0 ? 1 : 0.96;

            return (
              <motion.article
                key={slide.id}
                className={styles.slide}
                data-slide-id={slide.id}
                initial={false}
                animate={{
                  x: `${hasEntered ? x : 0}vw`,
                  y: "-50%",
                  scale: hasEntered ? scale : activeCard ? 1 : 0.86,
                  rotateY: hasEntered ? rotateY : 0,
                  rotate: hasEntered && visible && !activeCard ? (offset > 0 ? 1.5 : -1.5) : 0,
                  opacity: hasEntered ? opacity : activeCard ? 1 : 0,
                  zIndex: 20 - abs,
                  filter:
                    abs === 0
                      ? "brightness(1) saturate(1)"
                      : "brightness(.96) saturate(.98)",
                }}
                transition={
                  reduceMotion || !hasEntered
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 80,
                        damping: 20,
                        mass: 1,
                      }
                }
                style={{
                  left: "50%",
                  top: "50%",
                  translateX: "-50%",
                  transformPerspective: 1400,
                  pointerEvents: hasEntered && visible ? "auto" : "none",
                }}
                onClick={() => !activeCard && visible && go(index)}
                aria-hidden={!activeCard}
              >
                <div className={styles.frame}>
                  <div className={styles.photoWrap}>
                    <Image
                      src={slide.image}
                      alt={activeCard ? `${slide.name} portrait` : ""}
                      fill
                      draggable={false}
                      className={styles.photo}
                      style={{
                        objectPosition: slide.imagePosition || "center center",
                      }}
                      sizes="(max-width: 640px) 78vw, (max-width: 1024px) 55vw, 34vw"
                    />
                    <div className={styles.photoShade} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <button className={`${styles.arrow} ${styles.left}`} onClick={prev} aria-label="Previous photo">
          <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M26 16H6m0 0 8-8m-8 8 8 8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button className={`${styles.arrow} ${styles.right}`} onClick={next} aria-label="Next photo">
          <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6 16h20m0 0-8-8m8 8-8 8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <motion.div
        key={current.id}
        className={styles.meta}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        aria-live="polite"
      >
        <h3 className={styles.name}>{current.name}</h3>
        <p className={styles.role}>{current.role}</p>
      </motion.div>

      <div className={styles.controls}>
        <div className={styles.progressTrack} aria-hidden="true">
          <motion.div
            className={styles.progressBar}
            animate={{ width: `${((active + 1) / total) * 100}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
          />
        </div>

        <div className={styles.dots} aria-label="Choose photo">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`${styles.dot} ${index === active ? styles.activeDot : ""}`}
              onClick={() => go(index)}
              aria-label={`Show ${slide.name} photo ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
            />
          ))}
        </div>

        <div className={styles.counter}>
          {String(active + 1).padStart(2, "0")}
          <span />
          {String(total).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}
