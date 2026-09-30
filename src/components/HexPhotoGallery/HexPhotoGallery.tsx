"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
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

export function HexPhotoGallery() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="portraits" className={styles.section} aria-labelledby="gallery-title">
      <h2 id="gallery-title" className={styles.visuallyHidden}>Moments with Khushboo and Parag</h2>
      <div className={styles.gallery}>
        {rows.map((row, rowIndex) => (
          <div className={styles.row} key={rowIndex}>
            {row.map((photo, columnIndex) => {
              const index = (rowIndex === 0 ? 0 : rowIndex === 1 ? 2 : 5) + columnIndex;

              return (
                <motion.div
                  className={styles.cell}
                  key={photo.src}
                  initial={reducedMotion ? false : { opacity: 0.45, scale: 0.88, y: 18 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
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
