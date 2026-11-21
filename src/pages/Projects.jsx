
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import ProjectCard from "../components/ProjectCard";
import Reveal from "../animations/Reveal";
import projectsData from "../data/projects";

const filters = [
  "All",
  "React",
  "Next.js",
  "Full Stack",
  "HTML & CSS",
];

function Projects() {
  // Manage the project collection using React state.
  const [projects] = useState(() => projectsData);

  // Manage the selected technology filter.
  const [activeFilter, setActiveFilter] = useState("All");

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTitle = searchParams.get("project");

  // Find a specific project when navigating from the Home slider.
  const selectedProject = projects.find(
    (project) => project.title === selectedTitle
  );

  // Filter the project collection based on the active category.
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

  // Scroll to the matching project when arriving from Home.
  useEffect(() => {
    if (!selectedProject || activeFilter !== "All") return;

    const frame = requestAnimationFrame(() => {
      document.getElementById("selected-project")?.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "center",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedProject, activeFilter]);

  function changeFilter(filter) {
    setActiveFilter(filter);

    // Clear the selected project when browsing filters.
    if (selectedTitle) {
      setSearchParams({});
    }
  }

  return (
    <section
      aria-labelledby="projects-heading"
      className="mx-auto max-w-7xl pt-2 pb-5 md:py-10"
    >
      {/* Page introduction */}
      <Reveal trigger="mount" delay={0} duration={0.7}>
        <p className="mb-4 font-sora text-sm tracking-widest text-accent">
          SELECTED WORK
        </p>
      </Reveal>

      <Reveal trigger="mount" delay={0.15} duration={0.8}>
        <h1
          id="projects-heading"
          className="font-alan text-4xl font-bold text-primary sm:text-5xl"
        >
          My <span className="text-accent">Projects.</span>
        </h1>
      </Reveal>

      <Reveal trigger="mount" delay={0.3} duration={0.8}>
        <p className="mt-5 max-w-2xl font-sora leading-8 text-secondary">
          A collection of projects combining frontend development,
          thoughtful design, responsive interfaces and interactive
          user experiences.
        </p>
      </Reveal>

      {/* Project filters */}
      <Reveal trigger="mount" delay={0.45} duration={0.75}>
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
      </Reveal>

      {/* Project count */}
      <Reveal trigger="mount" delay={0.55} duration={0.7}>
        <p
          className="mt-6 font-sora text-sm text-subtle"
          aria-live="polite"
        >
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </Reveal>

      {/* Project grid */}
      <div className="mt-6 grid gap-8 xl:grid-cols-2">
        {filteredProjects.map((project, index) => {
          const isSelected =
            selectedProject?.title === project.title;

          // Keep the selected card visible during direct navigation.
          if (isSelected) {
            return (
              <div
                key={project.title}
                className="min-w-0 h-full"
              >
                <ProjectCard
                  project={project}
                  selected
                />
              </div>
            );
          }

          return (
            <Reveal
              key={project.title}
              trigger="view"
              direction={index % 2 === 0 ? "left" : "right"}
              delay={(index % 2) * 0.12}
              duration={0.8}
              distance={18}
              className="min-w-0 h-full"
            >
              <div className="h-full">
                <ProjectCard project={project} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
