import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV_SECTIONS } from "../../data/portfolioContent";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { MOTION_EASE, prefersReducedMotion } from "../../utils/motion";
import { KSMonogram } from "../ui/KSMonogram";

export function Navbar() {
  const scrolled = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuId = "site-nav-menu";

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      const brand = nav.querySelector<HTMLElement>("[data-nav-brand]");
      const links = nav.querySelectorAll("[data-nav-desktop] li");

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

  const navShellClass = `sticky top-0 z-50 transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
    bg-[#fafaf8]/90 dark:bg-[#111110]/90 backdrop-blur-md
    ${scrolled ? "border-b border-[#e2e1da] dark:border-[#2a2927]" : "border-b border-transparent"}`;

  const linkClass =
    "text-[13px] text-[#6b6b6b] dark:text-[#9a9890] hover:text-[#0f0f0f] dark:hover:text-[#f0efe8] transition-[color,letter-spacing] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:tracking-[0.02em] no-underline";

  return (
    <nav
      ref={navRef}
      className={navShellClass}
      style={{
        paddingLeft: "max(1rem, env(safe-area-inset-left, 0px))",
        paddingRight: "max(1rem, env(safe-area-inset-right, 0px))",
      }}
    >
      <div className="mx-auto flex h-14 max-w-[860px] items-center justify-between sm:px-4 md:px-0">
        <a href="#" data-nav-brand className="shrink-0 rounded-md no-underline">
          <KSMonogram size={36} />
        </a>

        <ul
          data-nav-desktop
          className="hidden list-none gap-6 md:flex md:gap-8"
        >
          {NAV_SECTIONS.map((section) => (
            <li key={section}>
              <a href={`#${section}`} className={linkClass}>
                {section}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-[#6b6b6b] transition-colors hover:bg-[#e8e7e0]/80 hover:text-[#0f0f0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f0f0f] dark:text-[#9a9890] dark:hover:bg-[#2a2927]/80 dark:hover:text-[#f0efe8] dark:focus-visible:outline-[#f0efe8] md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          id={menuId}
          className="border-t border-[#e2e1da] bg-[#fafaf8]/98 px-4 py-3 backdrop-blur-md dark:border-[#2a2927] dark:bg-[#111110]/98 md:hidden"
          style={{
            paddingLeft: "max(1rem, env(safe-area-inset-left, 0px))",
            paddingRight: "max(1rem, env(safe-area-inset-right, 0px))",
            paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))",
          }}
        >
          <ul className="m-0 list-none p-0">
            {NAV_SECTIONS.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={`${linkClass} flex min-h-11 items-center py-2 text-[15px] capitalize`}
                  onClick={() => setMenuOpen(false)}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
