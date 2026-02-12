export type SectionId = "home" | "projects" | "about" | "contact";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  stack: string;
}
