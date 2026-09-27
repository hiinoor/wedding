"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { FAQItem } from "@/data/wedding";

export function FAQList({ items }: { items: readonly FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <div className="faq__list">
      {items.map((item, index) => {
        const open = openIndex === index;
        const answerId = `faq-answer-${index}`;
        const questionId = `faq-question-${index}`;

        return (
          <motion.div
            className="faq__item"
            key={item.question}
            initial={reducedMotion ? false : { opacity: 0.65, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : Math.min(index * 0.07, 0.28), ease: [0.22, 1, 0.36, 1] }}
          >
            <h3>
              <button
                id={questionId}
                type="button"
                aria-expanded={open}
                aria-controls={answerId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span>{item.question}</span>
                <span className="faq__plus" aria-hidden="true" />
              </button>
            </h3>
            <motion.div
              id={answerId}
              className="faq__answer"
              role="region"
              aria-labelledby={questionId}
              initial={false}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
              inert={!open}
            >
              <div className="faq__answer-inner">
                <p>{item.answer}</p>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
