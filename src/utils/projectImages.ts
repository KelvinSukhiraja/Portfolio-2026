import type { Project, ProjectImage } from "../types/portfolio";

export function getProjectGallery(project: Project): ProjectImage[] {
  if (project.images?.length) {
    return project.images;
  }
  if (project.imageUrl) {
    return [
      {
        url: project.imageUrl,
        alt: project.imageAlt ?? project.name,
      },
    ];
  }
  return [];
}
