"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children?: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  variant?: "content" | "image" | "line";
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  variant = "content",
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  const entrance = variant === "line"
    ? { scaleX: 0, opacity: 1 }
    : {
        opacity: variant === "image" ? 0.72 : 0.58,
        x: direction === "left" ? -28 : direction === "right" ? 28 : 0,
        y: direction === "up" ? (variant === "image" ? 34 : 24) : 0,
        ...(variant === "image" ? { clipPath: "inset(0 0 8% 0)" } : {}),
      };
  const settled = variant === "line"
    ? { scaleX: 1, opacity: 1 }
    : { opacity: 1, x: 0, y: 0, ...(variant === "image" ? { clipPath: "inset(0 0 0% 0)" } : {}) };

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : entrance}
      whileInView={settled}
      viewport={{ once: true, amount: variant === "image" ? 0.2 : 0.12 }}
      transition={{ duration: reducedMotion ? 0 : variant === "line" ? 1.1 : 0.9, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      style={variant === "line" ? { transformOrigin: "left center" } : undefined}
    >
      {children}
    </motion.div>
  );
}
