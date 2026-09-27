import { BrandMark } from "@/components/BrandMark";
import { Reveal } from "@/components/Reveal";
import { wedding, weddingDateRange } from "@/data/wedding";

const footerLinks = [
  { label: "Schedule", href: "#schedule" },
  { label: "Dress Code", href: "#dress-code" },
  { label: "Travel", href: "#travel" },
  { label: "FAQs", href: "#faqs" },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <Reveal className="site-container site-footer__inner">
        <a href="#home" aria-label="Khushboo and Parag — back to top">
          <BrandMark className="site-footer__mark" decorative />
        </a>
        <p className="site-footer__names">{wedding.couple.bride} <span>&</span> {wedding.couple.groom}</p>
        <p className="site-footer__dates">{weddingDateRange}</p>
        <p className="site-footer__thanks">Thank you for being part of the celebrations.</p>
        <nav aria-label="Footer navigation">
          {footerLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
        </nav>
      </Reveal>
    </footer>
  );
}
