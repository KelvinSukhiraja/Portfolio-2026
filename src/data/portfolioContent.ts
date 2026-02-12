import type { NavItem, ProjectItem } from "../types/portfolio";

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const projectItems: ProjectItem[] = [
  {
    title: "Portfolio Website",
    description:
      "A personal website focused on performance, accessibility, and clear storytelling.",
    stack: "React, Tailwind CSS, Vite, TypeScript",
  },
  {
    title: "Dashboard Prototype",
    description:
      "A data dashboard with reusable chart components and responsive card layouts.",
    stack: "React, Tailwind CSS, Recharts",
  },
  {
    title: "API Integration Demo",
    description:
      "A lightweight app demonstrating robust API states with loading and error handling.",
    stack: "React, TanStack Query, Tailwind CSS",
  },
];
