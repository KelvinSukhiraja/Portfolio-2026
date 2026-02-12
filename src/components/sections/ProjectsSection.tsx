import type { ProjectItem } from "../../types/portfolio";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="section">
      <div className="container-page">
        <h2 className="section-title">Project Experience</h2>
        <p className="section-intro">
          Selected work focused on practical UI architecture, accessibility, and
          product-focused outcomes.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="card">
              <h3 className="card-title">{project.title}</h3>
              <p className="card-description">{project.description}</p>
              <p className="card-meta">{project.stack}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
