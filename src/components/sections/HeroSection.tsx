import gsap from "gsap";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { useTheme } from "../../context/ThemeContext";
import { HeroEasterEggDot } from "../motion/HeroEasterEggDot";
import { HeroParticleBackground } from "../motion/HeroParticleBackground";
import { SkeletonPeeker } from "../motion/SkeletonPeeker";
import { HERO_STATS } from "../../data/portfolioContent";
import type { HeroStat } from "../../types/portfolio";
import { MOTION_EASE, prefersReducedMotion } from "../../utils/motion";

type HeroSiteSettings = {
  heroEyebrow?: string;
  heroBody?: string;
  heroStats?: HeroStat[];
};

type HeroSectionProps = {
  siteSettings?: HeroSiteSettings;
  loading?: boolean;
};

export function HeroSection({ siteSettings, loading }: HeroSectionProps) {
  const { theme } = useTheme();
  const [skeletonPeek, setSkeletonPeek] = useState(false);
  const lightEasterEgg = theme === "light";

  const eyebrow =
    siteSettings?.heroEyebrow ?? "front-end developer · jakarta, id";
  const body =
    siteSettings?.heroBody ??
    "I craft fast, accessible, and thoughtfully designed web experiences — turning complex problems into clean, intuitive products.";
  const stats = siteSettings?.heroStats ?? HERO_STATS;
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const eyebrowLine = root.querySelector(".hero-eyebrow-line");
    const eyebrowText = root.querySelector(".hero-eyebrow-text");
    const title = root.querySelector(".hero-title");
    const titleAccent = root.querySelector(".hero-title-accent");
    const body = root.querySelector(".hero-body");
    const ctaItems = root.querySelectorAll(".hero-cta > *");
    const statItems = root.querySelectorAll(".hero-stat");

    if (prefersReducedMotion()) {
      gsap.set(
        [
          eyebrowLine,
          eyebrowText,
          title,
          titleAccent,
          body,
          ...ctaItems,
          ...statItems,
        ].filter(Boolean),
        { autoAlpha: 1, x: 0, y: 0, scaleX: 1, scale: 1 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: MOTION_EASE.smooth } });

      if (eyebrowLine) {
        gsap.set(eyebrowLine, { scaleX: 0, transformOrigin: "left center" });
        tl.to(eyebrowLine, {
          scaleX: 1,
          duration: 0.7,
          ease: MOTION_EASE.editorial,
        });
      }

      if (eyebrowText) {
        gsap.set(eyebrowText, { autoAlpha: 0, x: -6 });
        tl.to(
          eyebrowText,
          { autoAlpha: 1, x: 0, duration: 0.55, ease: MOTION_EASE.editorial },
          "-=0.35",
        );
      }

      if (title) {
        gsap.set(title, { autoAlpha: 0, y: 20 });
        tl.to(
          title,
          { autoAlpha: 1, y: 0, duration: 0.85, ease: MOTION_EASE.editorial },
          "-=0.2",
        );
      }

      if (titleAccent) {
        gsap.set(titleAccent, { autoAlpha: 0, y: 6 });
        tl.to(
          titleAccent,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: MOTION_EASE.soft,
          },
          "-=0.55",
        );
      }

      if (body) {
        gsap.set(body, { autoAlpha: 0, y: 14 });
        tl.to(body, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.45");
      }

      if (ctaItems.length) {
        gsap.set(ctaItems, { autoAlpha: 0, y: 10, x: -4 });
        tl.to(
          ctaItems,
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: MOTION_EASE.editorial,
          },
          "-=0.35",
        );
      }

      if (statItems.length) {
        gsap.set(statItems, { autoAlpha: 0, y: 12 });
        tl.to(
          statItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.09,
            ease: MOTION_EASE.smooth,
          },
          "-=0.25",
        );
      }

      const statsLine = root.querySelector(".hero-stats-line");
      if (statsLine) {
        gsap.set(statsLine, { scaleX: 0, transformOrigin: "left center" });
        tl.to(
          statsLine,
          { scaleX: 1, duration: 0.85, ease: MOTION_EASE.editorial },
          "-=0.55",
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <HeroParticleBackground />
      <section
        ref={rootRef}
        className="section-shell relative z-10 !pt-20 sm:!pt-24 md:!pt-28 !pb-16 sm:!pb-20 md:!pb-24"
      >
        <div className="hero-eyebrow flex items-center gap-2 mb-6">
          <span className="hero-eyebrow-line block w-6 h-px bg-[#6b6b6b] dark:bg-[#9a9890]" />
          <span className="hero-eyebrow-text font-mono text-[10px] sm:text-[11px] tracking-[0.1em] sm:tracking-[0.12em] uppercase text-[#6b6b6b] dark:text-[#9a9890]">
            {eyebrow}
          </span>
        </div>

        <h1 className="hero-title font-serif text-[clamp(2.25rem,9vw,4.2rem)] font-normal leading-[1.12] tracking-tight text-[#0f0f0f] dark:text-[#f0efe8] mb-5 sm:mb-6">
          Building interfaces
          <br />
          that{" "}
          <em className="hero-title-accent italic text-[#6b6b6b] dark:text-[#9a9890]">
            feel
          </em>{" "}
          right.
        </h1>

        <p
          className={`hero-body text-[15px] sm:text-[16px] font-light text-[#6b6b6b] dark:text-[#9a9890] max-w-[480px] leading-[1.75] mb-8 sm:mb-10 transition-opacity duration-300 ${loading ? "opacity-60" : ""}`}
        >
          {body}
        </p>

        <div className="hero-cta flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <a
            href="#projects"
            className="inline-flex min-h-11 items-center justify-center bg-[#0f0f0f] dark:bg-[#f0efe8] text-[#fafaf8] dark:text-[#0f0f0f] px-6 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-opacity hover:opacity-75 no-underline text-center"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 text-[13px] text-[#6b6b6b] dark:text-[#9a9890] hover:text-[#0f0f0f] dark:hover:text-[#f0efe8] transition-colors no-underline"
          >
            Get in touch
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="hero-stats-row relative mt-10 sm:mt-14 pt-6 sm:pt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:flex sm:gap-12">
          <span
            className="hero-stats-line absolute top-0 left-0 right-0 block h-px bg-[#e2e1da] dark:bg-[#2a2927] origin-left"
            style={{ transformOrigin: "left center" } as CSSProperties}
          />
          {stats.map(({ value, label }) => (
            <div key={label} className="hero-stat">
              <div className="font-serif text-[1.65rem] sm:text-[2rem] leading-none text-[#0f0f0f] dark:text-[#f0efe8]">
                {value}
              </div>
              <div className="font-mono text-[11px] tracking-[0.05em] text-[#6b6b6b] dark:text-[#9a9890] mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>
      {lightEasterEgg && (
        <>
          <HeroEasterEggDot
            active={skeletonPeek}
            onToggle={() => setSkeletonPeek((v) => !v)}
          />
          <SkeletonPeeker visible={skeletonPeek} />
        </>
      )}
    </div>
  );
}
