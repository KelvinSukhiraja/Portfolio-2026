import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { SITE } from "../../data/portfolioContent";
import {
  MOTION_EASE,
  parseMotionVariant,
  prefersReducedMotion,
  revealFromVars,
} from "../../utils/motion";

type FooterProps = {
  copyright?: string;
};

export function Footer({ copyright = SITE.copyright }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const el = footerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-motion-reveal]");
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none none",
        },
        defaults: { ease: MOTION_EASE.smooth },
      });

      targets.forEach((target, index) => {
        const variant = parseMotionVariant(
          target.dataset.motionVariant ??
            (index === 0 ? "fade-right" : "fade-left"),
        );
        tl.from(target, revealFromVars(variant, index), index * 0.1);
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="section-shell !py-6 sm:!py-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-t border-[#e2e1da] dark:border-[#2a2927]"
    >
      <div
        data-motion-reveal
        data-motion-variant="fade-right"
        className="flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-[#6b6b6b] dark:text-[#9a9890]"
      >
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center p-2 rounded-md text-[#6b6b6b] dark:text-[#9a9890] hover:text-[#0f0f0f] dark:hover:text-[#f0efe8] hover:bg-[#e8e7e0]/80 dark:hover:bg-[#2a2927]/80 transition-[color,background-color,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
        <span>{copyright}</span>
      </div>
      <div
        data-motion-reveal
        data-motion-variant="fade-left"
        className="flex items-center gap-5"
      >
        <ThemeToggle />
        <span className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em] text-[#6b6b6b] dark:text-[#9a9890]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          available for work
        </span>
      </div>
    </footer>
  );
}
