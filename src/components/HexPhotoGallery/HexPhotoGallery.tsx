"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./HexPhotoGallery.module.css";

const rows = [
  [
    { src: "/images/hex-gallery/khushboo-mint.jpg", alt: "Khushboo in a mint outfit among trees", position: "50% 43%" },
    { src: "/images/hex-gallery/khushboo-mountains.jpg", alt: "Khushboo beside a mountain lake", position: "50% 50%" },
  ],
  [
    { src: "/images/hex-gallery/khushboo-city.jpg", alt: "Khushboo overlooking a city", position: "50% 50%" },
    { src: "/images/hex-gallery/khushboo-sunset.jpg", alt: "Khushboo by the ocean at sunset", position: "50% 48%" },
    { src: "/images/hex-gallery/parag-boat.jpg", alt: "Parag sitting on a boat by the sea", position: "50% 47%" },
  ],
  [
    { src: "/images/hex-gallery/khushboo-white.jpg", alt: "Khushboo in a white dress on a city street", position: "50% 65%" },
    { src: "/images/hex-gallery/khushboo-ferris.jpg", alt: "Khushboo beside a waterfront Ferris wheel", position: "50% 65%" },
  ],
] as const;

const spotlightGroups = [[0, 1], [2], [4], [5, 6], [3]] as const;
const spotlightDurations = [1900, 1550, 1550, 1900, 2300] as const;
const entranceOrder = [0, 0, 1, 4, 2, 3, 3] as const;

export function HexPhotoGallery() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let wasVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.intersectionRatio >= 0.25;
        if (visible && !wasVisible) setActiveStep(0);
        wasVisible = visible;
        setInView(visible);
      },
      { threshold: [0, 0.25] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!inView || !pageVisible || reducedMotion || hoveredIndex !== null) return;

    const timeout = window.setTimeout(
      () => setActiveStep((step) => (step + 1) % spotlightGroups.length),
      spotlightDurations[activeStep],
    );
    return () => window.clearTimeout(timeout);
  }, [activeStep, hoveredIndex, inView, pageVisible, reducedMotion]);

  return (
    <section ref={sectionRef} id="portraits" className={styles.section} aria-labelledby="gallery-title">
      <h2 id="gallery-title" className={styles.visuallyHidden}>Moments with Khushboo and Parag</h2>
      <div className={styles.gallery}>
        {rows.map((row, rowIndex) => (
          <div className={styles.row} key={rowIndex}>
            {row.map((photo, columnIndex) => {
              const index = (rowIndex === 0 ? 0 : rowIndex === 1 ? 2 : 5) + columnIndex;
              const spotlit = reducedMotion || (hoveredIndex !== null
                ? hoveredIndex === index
                : inView && spotlightGroups[activeStep].some((cell) => cell === index));

              return (
                <motion.div
                  className={`${styles.cell}${spotlit ? ` ${styles.spotlight}` : ""}`}
                  key={photo.src}
                  initial={reducedMotion ? false : { opacity: 0.45, scale: 0.88, y: 18 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : entranceOrder[index] * 0.22, ease: [0.22, 1, 0.36, 1] }}
                  onPointerEnter={(event) => { if (event.pointerType !== "touch") setHoveredIndex(index); }}
                  onPointerLeave={(event) => { if (event.pointerType !== "touch") setHoveredIndex((current) => current === index ? null : current); }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 380px) 29vw, (max-width: 440px) 110px, (max-width: 1000px) 25vw, 250px"
                    style={{ objectPosition: photo.position }}
                    className={styles.photo}
                  />
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
