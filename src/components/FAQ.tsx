import { FAQList } from "@/components/FAQList";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/data/wedding";

export function FAQ() {
  return (
    <section id="faqs" className="faq section-space" aria-labelledby="faq-title">
      <div className="site-container faq__layout">
        <Reveal>
          <header className="faq__heading">
            <p className="eyebrow">FAQs</p>
            <h2 id="faq-title">Good to Know</h2>
          </header>
        </Reveal>
        <FAQList items={wedding.faqs} />
      </div>
    </section>
  );
}
