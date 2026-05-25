import { CONTACT_LINKS, SITE } from "../../data/portfolioContent";
import { AnimatedSection } from "../motion/AnimatedSection";
import { SectionHeader } from "../ui/SectionHeader";

export function ContactSection() {
  return (
    <AnimatedSection id="contact" className="section-shell">
      <div data-motion-reveal data-motion-variant="rise-soft">
        <SectionHeader number="03" title="Contact" />
      </div>

      <div
        data-motion-reveal
        data-motion-variant="reveal-panel"
        className="border border-[#e2e1da] dark:border-[#2a2927] rounded-xl p-5 sm:p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
      >
        <div>
          <h3 className="font-serif text-[1.65rem] sm:text-[2rem] font-normal leading-[1.2] tracking-tight text-[#0f0f0f] dark:text-[#f0efe8] mb-4">
            Let&apos;s build something together.
          </h3>
          <p className="text-[13px] font-light text-[#6b6b6b] dark:text-[#9a9890] leading-[1.75] mb-6">
            Open to freelance projects, full-time roles, and interesting
            collaborations. Response within 24 hours.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex min-h-11 items-center bg-[#0f0f0f] dark:bg-[#f0efe8] text-[#fafaf8] dark:text-[#0f0f0f] px-6 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-opacity hover:opacity-75 no-underline"
          >
            Send a message ↗
          </a>
        </div>

        <div>
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex items-center justify-between gap-3 min-h-12 py-3 sm:py-4 border-b border-[#e2e1da] dark:border-[#2a2927] first:border-t no-underline transition-[color,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hover:translate-x-0.5"
            >
              <span className="text-[13px] text-[#0f0f0f] dark:text-[#f0efe8] group-hover:text-[#6b6b6b] dark:group-hover:text-[#9a9890] transition-colors">
                {link.label}
              </span>
              <span className="font-mono text-[11px] text-[#6b6b6b] dark:text-[#9a9890] tracking-[0.04em]">
                {link.handle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
