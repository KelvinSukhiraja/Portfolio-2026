export interface ProjectImage {
  url: string;
  alt?: string;
}

export interface Project {
  year: string;
  type: string;
  name: string;
  desc: string;
  /** Longer copy for the project detail modal */
  details?: string;
  tags: string[];
  href: string;
  imageUrl?: string;
  imageAlt?: string;
  images?: ProjectImage[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  desc: string;
  highlights?: string[];
  tags?: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  school: string;
}

export interface ContactLink {
  label: string;
  handle: string;
  href: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export type NavSection = "projects" | "experience" | "contact";
