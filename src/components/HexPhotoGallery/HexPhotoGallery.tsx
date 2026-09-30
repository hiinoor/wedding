"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./HexPhotoGallery.module.css";

const rows = [
  [
    { src: "/images/hex-gallery/top-left.jpg", alt: "Khushboo standing by the sea at sunset", position: "50% 50%" },
    { src: "/images/hex-gallery/top-right.jpg", alt: "Khushboo on a city street in a white dress", position: "50% 55%" },
  ],
  [
    { src: "/images/hex-gallery/middle-left.jpg", alt: "Parag sitting on a boat at Kilim Geoforest Park", position: "50% 45%" },
    { src: "/images/hex-gallery/center.jpg", alt: "Parag on a wooden boat at sea", position: "50% 47%" },
    { src: "/images/hex-gallery/middle-right.jpg", alt: "Parag smiling beneath string lights", position: "50% 45%" },
  ],
  [
    { src: "/images/hex-gallery/bottom-left.jpg", alt: "Khushboo holding red roses on a boat", position: "50% 50%" },
    { src: "/images/hex-gallery/bottom-right.jpg", alt: "Khushboo in a mint outfit among trees", position: "50% 50%" },
  ],
] as const;

const spotlightGroups = [[0, 1], [2, 4], [5, 6], [3]] as const;
const spotlightDurations = [1200, 1200, 1200, 1600] as const;
const entranceOrder = [0, 0, 1, 3, 1, 2, 2] as const;

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
