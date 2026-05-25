import type { EducationItem, ExperienceItem } from "../../types/portfolio";
import { EDUCATION, EXPERIENCE } from "../../data/portfolioContent";
import { AnimatedSection } from "../motion/AnimatedSection";
import { SectionHeader } from "../ui/SectionHeader";

type ExperienceSectionProps = {
  experience?: ExperienceItem[];
  education?: EducationItem[];
};

export function ExperienceSection({
  experience = EXPERIENCE,
  education = EDUCATION,
}: ExperienceSectionProps) {
  return (
    <AnimatedSection
      id="experience"
      className="section-shell"
    >
      <div data-motion-reveal data-motion-variant="rise-soft">
        <SectionHeader number="02" title="Experience" />
      </div>

      <div>
        {experience.map((item, index) => (
          <div
            key={`${item.period}-${item.role}-${item.company}`}
            data-motion-reveal
            data-motion-variant={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <div
              className={`grid gap-3 sm:gap-6 md:gap-8 py-6 sm:py-8 border-[#e2e1da] dark:border-[#2a2927]
              ${index === 0 ? "border-t border-b" : "border-b"}
              grid-cols-1 md:grid-cols-[minmax(0,140px)_1fr]`}
            >
              <div className="font-mono text-[11px] tracking-[0.06em] text-[#6b6b6b] dark:text-[#9a9890] pt-0.5">
                {item.period}
              </div>
              <div>
                <div className="text-[15px] font-medium tracking-tight text-[#0f0f0f] dark:text-[#f0efe8] mb-0.5">
                  {item.role}
                </div>
                <div className="text-[13px] font-light text-[#6b6b6b] dark:text-[#9a9890] mb-3">
                  {item.company}
                </div>
                <p className="text-[13px] font-light text-[#6b6b6b] dark:text-[#9a9890] leading-[1.7]">
                  {item.desc}
                </p>
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-[13px] font-light text-[#6b6b6b] dark:text-[#9a9890] leading-[1.65] list-disc pl-4">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-[#6b6b6b] dark:text-[#9a9890] border border-[#e2e1da] dark:border-[#2a2927] px-2.5 py-0.5 rounded-full tracking-[0.04em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {education.map((item, index) => (
          <div
            key={item.school}
            data-motion-reveal
            data-motion-variant={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <div className="grid gap-3 sm:gap-6 md:gap-8 py-6 sm:py-8 border-b border-[#e2e1da] dark:border-[#2a2927] grid-cols-1 md:grid-cols-[minmax(0,140px)_1fr]">
              <div className="font-mono text-[11px] tracking-[0.06em] text-[#6b6b6b] dark:text-[#9a9890] pt-0.5">
                {item.period}
              </div>
              <div>
                <div className="text-[15px] font-medium tracking-tight text-[#0f0f0f] dark:text-[#f0efe8] mb-0.5">
                  {item.degree}
                </div>
                <div className="text-[13px] font-light text-[#6b6b6b] dark:text-[#9a9890]">
                  {item.school}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
