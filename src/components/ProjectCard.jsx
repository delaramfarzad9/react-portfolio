import { useRef, useState } from "react";
import { FiArrowUpRight, FiGithub, FiChevronDown } from "react-icons/fi";

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  const {
    title,
    img,
    description,
    tech,
    demo,
    github,
    status,
  } = project;

  const details = description
    .split("\n")
    .map((line) => line.trim().replace(/^·\s*/, ""))
    .filter(Boolean);

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
                 hover:shadow-[0_16px_40px_rgba(79,70,229,0.10)]
                 dark:bg-white/15 dark:shadow-black/10
                 dark:hover:shadow-[0_16px_40px_rgba(139,92,246,0.15)]
                 motion-reduce:hover:translate-y-0"
    >
      {/* LIGHT MODE cursor-following border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl
                   opacity-0 transition-opacity duration-300
                   group-hover:opacity-90 dark:hidden"
        style={{
          background: `radial-gradient(
            130px circle at var(--x, 50%) var(--y, 50%),
            rgba(79,70,229,0.95) 0%,
            rgba(99,102,241,0.88) 35%,
            rgba(129,140,248,0.60) 68%,
            transparent 100%
          )`,
        }}
      />

      {/* DARK MODE cursor-following border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden rounded-2xl
                   opacity-0 transition-opacity duration-300
                   group-hover:opacity-100 dark:block"
        style={{
          background: `radial-gradient(
            130px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,1) 0%,
            rgba(139,92,246,0.9) 35%,
            rgba(244,114,182,0.7) 65%,
            transparent 100%
          )`,
        }}
      />

      {/* LIGHT MODE external glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-2xl
                   opacity-0 blur-md transition-opacity duration-300
                   group-hover:opacity-40 dark:hidden"
        style={{
          background: `radial-gradient(
            85px circle at var(--x, 50%) var(--y, 50%),
            rgba(79,70,229,0.20),
            rgba(99,102,241,0.16) 50%,
            transparent 85%
          )`,
        }}
      />

      {/* DARK MODE external glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 hidden rounded-2xl
                   opacity-0 blur-md transition-opacity duration-300
                   group-hover:opacity-45 dark:block"
        style={{
          background: `radial-gradient(
            85px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,0.3),
            rgba(139,92,246,0.25) 50%,
            transparent 85%
          )`,
        }}
      />

      {/* Inner glass card */}
      <div
        className="relative flex h-full flex-1 flex-col
                   overflow-hidden rounded-[15px]
                   bg-white/90 backdrop-blur-md
                   transition-colors duration-300
                   group-hover:bg-indigo-50/90
                   dark:bg-blue-950/95
                   dark:group-hover:bg-blue-900/95"
      >
        {/* Project screenshot */}
        <div
          className="relative flex aspect-video items-center
                     justify-center overflow-hidden
                     bg-slate-100/90 p-3
                     transition-colors duration-300
                     group-hover:bg-indigo-100/70
                     dark:bg-blue-900/30
                     dark:group-hover:bg-blue-900/40"
        >
          <img
            src={img}
            alt={`${title} project screenshot`}
            loading="lazy"
            className="h-full w-full object-contain
                       transition-transform duration-500
                       group-hover:scale-[1.02]
                       motion-reduce:transform-none"
          />

          {status && (
            <span
              className="absolute right-4 top-4
                         rounded-full border border-theme-border
                         bg-white/90 px-3 py-1
                         font-sora text-xs text-primary
                         shadow-sm backdrop-blur-md
                         transition-colors duration-300
                         group-hover:bg-white
                         dark:border-white/20
                         dark:bg-blue-950/85
                         dark:text-slate-100
                         dark:group-hover:bg-blue-950/90"
            >
              {status}
            </span>
          )}
        </div>

        {/* Project information */}
        <div className="flex flex-1 flex-col p-6">
          <h2
            className="font-alan text-2xl font-bold text-primary
                       transition-colors duration-300
                       group-hover:text-accent"
          >
            {title}
          </h2>

          <p className="mt-4 font-sora text-sm leading-7 text-secondary">
            {details[0]}
          </p>

          {/* Expandable details */}
          {details.length > 1 && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                className="inline-flex cursor-pointer items-center gap-2
                           font-sora text-sm text-accent
                           transition-colors duration-300
                           hover:text-indigo-700
                           dark:hover:text-white
                           focus-visible:outline-2
                           focus-visible:outline-offset-4
                           focus-visible:outline-accent"
              >
                {expanded ? "Hide details" : "Show details"}

                <FiChevronDown
                  aria-hidden="true"
                  className={`transition-transform duration-300 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expanded && (
                <ul
                  className="mt-4 list-disc space-y-3 pl-5
                             font-sora text-sm leading-7 text-secondary"
                >
                  {details.slice(1).map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Technology tags */}
          <ul
            aria-label="Technologies used"
            className="mt-6 flex flex-wrap gap-2"
          >
            {tech.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-theme-border
                           bg-slate-100/80 px-3 py-1.5
                           font-sora text-xs text-secondary
                           transition-all duration-300
                           group-hover:border-indigo-400/35
                           group-hover:bg-indigo-100/75
                           group-hover:text-primary
                           dark:border-white/15
                           dark:bg-white/5
                           dark:text-slate-200
                           dark:group-hover:border-violet-400/40
                           dark:group-hover:bg-violet-400/10
                           dark:group-hover:text-white"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Project links */}
          <div className="mt-auto flex flex-wrap gap-5 pt-7">
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2
                           font-alan text-sm text-accent
                           transition-colors duration-300
                           hover:text-indigo-700
                           dark:hover:text-white
                           focus-visible:outline-2
                           focus-visible:outline-offset-4
                           focus-visible:outline-accent"
              >
                Live Demo
                <FiArrowUpRight aria-hidden="true" />
              </a>
            )}

            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2
                           font-alan text-sm text-secondary
                           transition-colors duration-300
                           hover:text-indigo-700
                           dark:hover:text-white
                           focus-visible:outline-2
                           focus-visible:outline-offset-4
                           focus-visible:outline-accent"
              >
                <FiGithub aria-hidden="true" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;