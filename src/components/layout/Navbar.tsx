import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { NAV_SECTIONS } from "../../data/portfolioContent";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { MOTION_EASE, prefersReducedMotion } from "../../utils/motion";
import { KSMonogram } from "../ui/KSMonogram";

export function Navbar() {
  const scrolled = useScrollPosition();
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      const brand = nav.querySelector<HTMLElement>(":scope > :first-child");
      const links = nav.querySelectorAll("ul li");

      const tl = gsap.timeline({ defaults: { ease: MOTION_EASE.editorial } });

      if (brand) {
        tl.from(brand, { opacity: 0, y: -10, duration: 0.55 });
      }

      if (links.length) {
        tl.from(
          links,
          { opacity: 0, y: -5, duration: 0.48, stagger: 0.06 },
          "-=0.3",
        );
      }
    }, nav);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 flex items-center justify-between px-8 h-14 transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        bg-[#fafaf8]/90 dark:bg-[#111110]/90 backdrop-blur-md
        ${scrolled ? "border-b border-[#e2e1da] dark:border-[#2a2927]" : "border-b border-transparent"}`}
    >
      <KSMonogram size={36} />
      <ul className="flex gap-8 list-none">
        {NAV_SECTIONS.map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              className="text-[13px] text-[#6b6b6b] dark:text-[#9a9890] hover:text-[#0f0f0f] dark:hover:text-[#f0efe8] transition-[color,letter-spacing] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:tracking-[0.02em] no-underline"
            >
              {section}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
