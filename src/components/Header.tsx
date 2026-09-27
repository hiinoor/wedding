"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Schedule", href: "#schedule" },
  { label: "Dress Code", href: "#dress-code" },
  { label: "Travel", href: "#travel" },
  { label: "FAQs", href: "#faqs" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const brandLink = useRef<HTMLAnchorElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    setMenuOpen(false);
    window.history.pushState(null, "", href);
    window.requestAnimationFrame(() => {
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 72);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top,
        behavior: !reducedMotion && Math.abs(window.scrollY - top) < 1800 ? "smooth" : "auto",
      });
    });
  };

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const links = document.querySelectorAll<HTMLAnchorElement>("#mobile-navigation a");
        const lastLink = links[links.length - 1];
        if (event.shiftKey && document.activeElement === brandLink.current) {
          event.preventDefault();
          lastLink?.focus();
        } else if (!event.shiftKey && document.activeElement === lastLink) {
          event.preventDefault();
          brandLink.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-open" : ""}`}>
      <div className="site-header__inner site-container">
        <a ref={brandLink} className="site-header__brand" href="#home" aria-label="Khushboo and Parag — home" onClick={(event) => navigateToSection(event, "#home")}>
          <span className="site-header__mark" aria-hidden="true" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(({ label, href }) => (
            <a key={href} href={href} onClick={(event) => navigateToSection(event, href)}>{label}</a>
          ))}
        </nav>

        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" inert={!menuOpen}>
        <div className="mobile-navigation__inner">
          <p className="eyebrow">Khushboo & Parag</p>
          <ol>
            {navigation.map(({ label, href }, index) => (
              <li key={href}>
                <a href={href} onClick={(event) => navigateToSection(event, href)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
          <span className="mobile-navigation__mark" aria-hidden="true" />
        </div>
      </nav>
    </header>
  );
}
