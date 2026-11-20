
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projects";

const filters = [
  "All",
  "React",
  "Next.js",
  "Full Stack",
  "HTML & CSS",
];

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTitle = searchParams.get("project");

  const selectedProject = projectsData.find(
    (project) => project.title === selectedTitle
  );

  const filteredProjects = projectsData.filter((project) => {
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

  // Scroll to the matching card when arriving from Home.
  useEffect(() => {
    if (!selectedProject || activeFilter !== "All") return;

    const frame = requestAnimationFrame(() => {
      document.getElementById("selected-project")?.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "instant"
          : "smooth",
        block: "center",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedProject, activeFilter]);

  function changeFilter(filter) {
    setActiveFilter(filter);

    // Return to normal browsing after changing filters.
    if (selectedTitle) {
      setSearchParams({});
    }
  }

  return (
    <section
      aria-labelledby="projects-heading"
      className="mx-auto max-w-7xl pt-2 pb-5 md:py-10"
    >
      <p className="mb-4 font-sora text-sm tracking-widest text-accent">
        SELECTED WORK
      </p>

      <h1
        id="projects-heading"
        className="font-alan text-4xl font-bold text-primary sm:text-5xl"
      >
        My <span className="text-accent">Projects.</span>
      </h1>

      <p className="mt-5 max-w-2xl font-sora leading-8 text-secondary">
        A collection of projects combining frontend development,
        thoughtful design, responsive interfaces and interactive
        user experiences.
      </p>

      {/* Filters */}
      <div
        role="group"
        aria-label="Filter projects"
        className="mt-10 flex flex-wrap gap-3"
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => changeFilter(filter)}
              aria-pressed={isActive}
              className={`cursor-pointer rounded-xl border
                          px-4 py-2.5 font-alan text-sm
                          transition-all duration-300
                          focus-visible:outline-2
                          focus-visible:outline-offset-4
                          focus-visible:outline-accent
                          ${
                            isActive
                              ? `border-violet-500/60
                                 bg-violet-100 text-violet-800
                                 shadow-sm shadow-violet-500/10
                                 dark:border-violet-400
                                 dark:bg-violet-500/20
                                 dark:text-white`
                              : `border-theme-border
                                 bg-glass text-secondary
                                 hover:border-accent/50
                                 hover:bg-hover-surface
                                 hover:text-primary`
                          }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <p
        className="mt-6 font-sora text-sm text-subtle"
        aria-live="polite"
      >
        Showing {filteredProjects.length} of {projectsData.length} projects
      </p>

      {/* Project grid */}
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {filteredProjects.map((project) => {
          const isSelected =
            selectedProject?.title === project.title;

          return (
            <ProjectCard
              key={`${project.title}-${isSelected}`}
              project={project}
              selected={isSelected}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
