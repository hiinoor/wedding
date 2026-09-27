"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef, type ReactNode } from "react";

export function ScheduleTimeline({ children }: { children: ReactNode }) {
  const listRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 25%"],
  });

  return (
    <div ref={listRef} className="schedule__timeline">
      <span className="schedule__rail" aria-hidden="true" />
      <motion.span
        className="schedule__rail-progress"
        aria-hidden="true"
        style={{ scaleY: reducedMotion ? 1 : scrollYProgress }}
      />
      <ol className="schedule__events">{children}</ol>
    </div>
  );
}
