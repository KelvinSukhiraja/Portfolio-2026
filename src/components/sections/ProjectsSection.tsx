import { useMemo, useState } from "react";
import { PROJECTS } from "../../data/portfolioContent";
import type { Project } from "../../types/portfolio";
import {
  externalLinkProps,
  hasExternalProjectLink,
} from "../../utils/projectLinks";
import { sortProjectsByYear } from "../../utils/sortProjects";
import { AnimatedSection } from "../motion/AnimatedSection";
import { ProjectModal } from "../projects/ProjectModal";
import { SectionHeader } from "../ui/SectionHeader";

const INITIAL_VISIBLE = 4;

type ProjectsSectionProps = {
  projects?: Project[];
};

function ExternalLinkIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

export function ProjectsSection({ projects = PROJECTS }: ProjectsSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sortedProjects = useMemo(() => sortProjectsByYear(projects), [projects]);
  const hasMore = sortedProjects.length > INITIAL_VISIBLE;
  const visibleProjects = expanded
    ? sortedProjects
    : sortedProjects.slice(0, INITIAL_VISIBLE);
  const hiddenCount = sortedProjects.length - INITIAL_VISIBLE;

  return (
    <AnimatedSection id="projects" className="section-shell">
      <div data-motion-reveal data-motion-variant="rise-soft">
        <SectionHeader number="01" title="Projects" />
      </div>

      <div
        data-motion-reveal
        data-motion-variant="reveal-panel"
        className="border border-[#e2e1da] dark:border-[#2a2927] rounded-xl overflow-hidden"
      >
        {visibleProjects.map((project, index) => {
          const externalLink = hasExternalProjectLink(project.href);

          return (
            <div
              key={project.name}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedProject(project);
                }
              }}
              className={`group flex flex-col gap-4 p-4 sm:flex-row sm:gap-6 sm:p-6 md:p-8 cursor-pointer transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                bg-[#fafaf8] dark:bg-[#111110] hover:bg-[#f2f1ec] dark:hover:bg-[#1c1b19]
                ${index < visibleProjects.length - 1 || hasMore ? "border-b border-[#e2e1da] dark:border-[#2a2927]" : ""}`}
            >
              {project.imageUrl && (
                <div className="shrink-0 w-full sm:w-[140px] aspect-[16/10] sm:aspect-auto sm:h-[88px] rounded-lg overflow-hidden border border-[#e2e1da] dark:border-[#2a2927] bg-[#ebebeb] dark:bg-[#242320]">
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt ?? project.name}
                    width={280}
                    height={175}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                  <span className="font-mono text-[11px] tracking-[0.08em] text-[#6b6b6b] dark:text-[#9a9890]">
                    {project.year}
                  </span>
                  <span className="font-mono text-[11px] text-[#6b6b6b] dark:text-[#9a9890] bg-[#ebebeb] dark:bg-[#242320] px-2 py-0.5 rounded-full tracking-[0.04em]">
                    {project.type}
                  </span>
                </div>
                <div className="text-[15px] sm:text-[16px] font-medium tracking-tight text-[#0f0f0f] dark:text-[#f0efe8] mb-2">
                  {project.name}
                </div>
                <p className="text-[13px] font-light text-[#6b6b6b] dark:text-[#9a9890] leading-[1.65] mb-4">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-[#6b6b6b] dark:text-[#9a9890] border border-[#e2e1da] dark:border-[#2a2927] px-2.5 py-0.5 rounded-full tracking-[0.04em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {externalLink && (
                <a
                  {...externalLinkProps(project.href)}
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => event.stopPropagation()}
                  className="flex shrink-0 items-center justify-center min-h-11 min-w-11 sm:items-start sm:justify-start sm:min-h-0 sm:min-w-0 sm:pt-0.5 -m-2 sm:m-0 p-2 sm:p-0 no-underline text-[#6b6b6b] dark:text-[#9a9890]
                    group-hover:text-[#0f0f0f] dark:group-hover:text-[#f0efe8] transition-all
                    sm:group-hover:translate-x-0.5 sm:group-hover:-translate-y-0.5 self-end sm:self-auto"
                  aria-label={`Open ${project.name} website`}
                >
                  <ExternalLinkIcon />
                </a>
              )}
            </div>
          );
        })}

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="w-full flex items-center justify-center gap-2 min-h-12 py-4 sm:py-5 bg-[#fafaf8] dark:bg-[#111110] text-[13px] text-[#6b6b6b] dark:text-[#9a9890] hover:text-[#0f0f0f] dark:hover:text-[#f0efe8] hover:bg-[#f2f1ec] dark:hover:bg-[#1c1b19] transition-[color,background-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer border-0"
          >
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase">
              {expanded
                ? "Show less"
                : `Show more project${hiddenCount === 1 ? "" : "s"}`}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${expanded ? "rotate-180" : ""}`}
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </AnimatedSection>
  );
}
