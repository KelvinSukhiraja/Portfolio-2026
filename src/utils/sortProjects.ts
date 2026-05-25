import type { Project } from "../types/portfolio";

export function sortProjectsByYear(projects: Project[]): Project[] {
  return [...projects].sort(
    (a, b) => Number(b.year) - Number(a.year) || a.name.localeCompare(b.name),
  );
}
