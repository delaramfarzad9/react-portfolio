
import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projects";

const filters = ["All", "React", "Next.js", "Full Stack", "HTML & CSS"];

function Projects() {
  const [projects] = useState(projectsData);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter((project) => {
    switch (activeFilter) {
      case "React":
        return project.tech.includes("React");

      case "Next.js":
        return project.tech.includes("Next.js");

      case "Full Stack":
        return project.tech.includes("Node.js");

     case "HTML & CSS":
  return (
    project.tech.includes("HTML5") ||
    project.tech.includes("CSS3")
  );

      default:
        return true;
    }
  });

  return (
    <section
      aria-labelledby="projects-heading"
      className="mx-auto max-w-7xl py-10"
    >
      <p className="mb-4 font-sora text-sm tracking-widest text-violet-300">
        SELECTED WORK
      </p>

      <h1
        id="projects-heading"
        className="font-alan text-4xl font-bold text-slate-100 sm:text-5xl"
      >
        My <span className="text-violet-400">Projects.</span>
      </h1>

      <p className="mt-5 max-w-2xl font-sora leading-8 text-slate-300">
        A collection of projects combining frontend development,
        thoughtful design, responsive interfaces and interactive
        user experiences.
      </p>

      <div
        role="group"
        aria-label="Filter projects"
        className="mt-10 flex flex-wrap gap-3"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={`rounded-xl border px-4 py-2.5
                        font-alan text-sm transition-all duration-300
                        focus-visible:outline-2
                        focus-visible:outline-offset-4
                        focus-visible:outline-violet-400
                        ${
                          activeFilter === filter
                            ? "border-violet-400 bg-violet-500/20 text-white"
                            : "border-white/15 bg-white/5 text-slate-300 hover:border-violet-400/50 hover:text-white"
                        }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <p className="mt-6 font-sora text-sm text-slate-400" aria-live="polite">
        Showing {filteredProjects.length} of {projects.length} projects
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
