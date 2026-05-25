import { useEffect, useId, useRef } from "react";
import type { Project } from "../../types/portfolio";
import {
  externalLinkProps,
  hasExternalProjectLink,
} from "../../utils/projectLinks";
import { getProjectGallery } from "../../utils/projectImages";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = project != null;
  const gallery = project ? getProjectGallery(project) : [];
  const showWebsiteLink = project != null && hasExternalProjectLink(project.href);
  const bodyCopy = project?.details?.trim() || project?.desc;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-[#0f0f0f]/40 dark:bg-black/60 backdrop-blur-[2px]"
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-h-[92vh] sm:max-h-[88vh] max-w-[860px] flex flex-col
          bg-[#fafaf8] dark:bg-[#111110] border border-[#e2e1da] dark:border-[#2a2927]
          rounded-t-2xl sm:rounded-xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.35)]
          overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 sm:pt-7 pb-4 border-b border-[#e2e1da] dark:border-[#2a2927] shrink-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-[11px] tracking-[0.08em] text-[#6b6b6b] dark:text-[#9a9890]">
                {project.year}
              </span>
              <span className="font-mono text-[11px] text-[#6b6b6b] dark:text-[#9a9890] bg-[#ebebeb] dark:bg-[#242320] px-2 py-0.5 rounded-full tracking-[0.04em]">
                {project.type}
              </span>
            </div>
            <h2
              id={titleId}
              className="text-[20px] sm:text-[22px] font-medium tracking-tight text-[#0f0f0f] dark:text-[#f0efe8]"
            >
              {project.name}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 p-2 -m-2 rounded-lg text-[#6b6b6b] dark:text-[#9a9890]
              hover:text-[#0f0f0f] dark:hover:text-[#f0efe8] hover:bg-[#f2f1ec] dark:hover:bg-[#1c1b19]
              transition-colors cursor-pointer border-0 bg-transparent"
            aria-label="Close project details"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain px-6 sm:px-8 py-6 sm:py-7">
          <div
            className={
              gallery.length > 0
                ? "flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8"
                : ""
            }
          >
            {gallery.length > 0 && (
              <div className="shrink-0 w-full sm:w-[min(38%,300px)] flex flex-col gap-3">
                {gallery.map((image, index) => (
                  <figure
                    key={`${image.url}-${index}`}
                    className="m-0 rounded-lg border border-[#e2e1da] dark:border-[#2a2927] bg-[#ebebeb] dark:bg-[#242320] overflow-hidden"
                  >
                    <img
                      src={image.url}
                      alt={image.alt ?? project.name}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-auto"
                    />
                  </figure>
                ))}
              </div>
            )}

            <div className="flex-1 min-w-0 flex flex-col">
              <p className="text-[14px] sm:text-[15px] font-light text-[#3d3d3d] dark:text-[#c8c6be] leading-[1.7] mb-6">
                {bodyCopy}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-[#6b6b6b] dark:text-[#9a9890] border border-[#e2e1da] dark:border-[#2a2927] px-2.5 py-0.5 rounded-full tracking-[0.04em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {showWebsiteLink && (
                <a
                  {...externalLinkProps(project.href)}
                  className="inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-lg no-underline
                    text-[13px] font-medium text-[#fafaf8] dark:text-[#111110]
                    bg-[#0f0f0f] dark:bg-[#f0efe8]
                    hover:opacity-90 transition-opacity"
                >
                  Visit website
                  <svg
                    width="16"
                    height="16"
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
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
