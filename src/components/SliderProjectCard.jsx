
import { useRef } from "react";
import { Link } from "react-router";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

function SliderProjectCard({ project }) {
  const cardRef = useRef(null);

  const detailsUrl = `/projects?project=${encodeURIComponent(
    project.title
  )}`;

  function moveGlow(e) {
    if (e.pointerType === "touch") return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <article
      ref={cardRef}
      onPointerMove={moveGlow}
      className="group relative flex h-full flex-col
                 rounded-2xl bg-slate-300/70 p-px
                 shadow-lg shadow-slate-900/5
                 transition-all duration-300
                 hover:-translate-y-1
                 hover:shadow-[0_16px_40px_rgba(139,92,246,0.10)]
                 dark:bg-white/15 dark:shadow-black/10
                 dark:hover:shadow-[0_16px_40px_rgba(139,92,246,0.15)]
                 motion-reduce:hover:translate-y-0"
    >
      {/* Cursor-following border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   rounded-2xl opacity-0
                   transition-opacity duration-300
                   group-hover:opacity-90"
        style={{
          background: `radial-gradient(
            130px circle at var(--x, 50%) var(--y, 50%),
            rgba(99,102,241,0.95) 0%,
            rgba(79,70,229,0.9) 35%,
            rgba(67,56,202,0.8) 65%,
            transparent 100%
          )`,
        }}
      />

      {/* External glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1
                   rounded-2xl opacity-0 blur-md
                   transition-opacity duration-300
                   group-hover:opacity-35
                   dark:group-hover:opacity-45"
        style={{
          background: `radial-gradient(
            85px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,0.3),
            rgba(139,92,246,0.25) 50%,
            transparent 85%
          )`,
        }}
      />

      {/* Glass card */}
      <div
        className="relative z-10 flex h-full flex-col
                   overflow-hidden rounded-[15px]
                   bg-white/90 backdrop-blur-md
                   transition-colors duration-300
                   group-hover:bg-indigo-50/90
                   dark:bg-indigo-950/95
                   dark:group-hover:bg-indigo-900/95"
      >
        {/* Main card link */}
        <Link
          to={detailsUrl}
          aria-label={`View details for ${project.title}`}
          className="absolute inset-0 z-10 rounded-[15px]
                     focus-visible:outline-2
                     focus-visible:-outline-offset-2
                     focus-visible:outline-accent"
        />

        {/* Screenshot */}
        <div
          className="flex aspect-video items-center
                     justify-center bg-slate-100/90 p-3
                     dark:bg-blue-900/30"
        >
          <img
            src={project.img}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="h-full w-full object-contain
                       transition-transform duration-500
                       group-hover:scale-[1.02]
                       motion-reduce:transform-none"
          />
        </div>

        {/* Project information */}
        <div className="flex flex-1 flex-col p-5">
          <h3
            className="font-alan text-lg font-semibold
                       text-primary transition-colors duration-300
                       group-hover:text-accent"
          >
            {project.title}
          </h3>

          {/* Technologies */}
          <ul
            aria-label="Technologies used"
            className="mt-4 flex flex-wrap gap-2"
          >
            {project.tech.slice(0, 3).map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-theme-border
                           bg-slate-100/80 px-2.5 py-1
                           font-sora text-xs text-secondary
                           transition-colors duration-300
                           group-hover:border-accent/30
                           dark:border-white/15
                           dark:bg-white/5
                           dark:text-slate-300"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* View details indicator */}
          <div
            className="mt-5 flex items-center gap-2
                       font-alan text-sm text-accent"
          >
            View Details
            <FiArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-300
                         group-hover:translate-x-1
                         group-hover:-translate-y-1"
            />
          </div>

          {/* Separate external links */}
          {(project.demo || project.github) && (
            <div
              className="relative z-20 mt-auto flex
                         flex-wrap items-center gap-5
                         border-t border-theme-border pt-4
                         mt-4"
            >
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5
                             font-alan text-xs text-accent
                             transition-colors duration-300
                             hover:text-indigo-700
                             dark:hover:text-white
                             focus-visible:outline-2
                             focus-visible:outline-offset-2
                             focus-visible:outline-accent"
                >
                  Live Demo
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5
                             font-alan text-xs text-secondary
                             transition-colors duration-300
                             hover:text-accent
                             dark:hover:text-white
                             focus-visible:outline-2
                             focus-visible:outline-offset-2
                             focus-visible:outline-accent"
                >
                  <FiGithub aria-hidden="true" />
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default SliderProjectCard;
