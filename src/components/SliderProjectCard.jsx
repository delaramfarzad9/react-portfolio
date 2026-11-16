
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";

function SliderProjectCard({ project }) {
  const cardRef = useRef(null);
  const projectUrl = project.demo || project.github;

  function moveGlow(e) {
    if (e.pointerType === "touch") return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    card.style.setProperty(
      "--x",
      `${e.clientX - rect.left}px`
    );

    card.style.setProperty(
      "--y",
      `${e.clientY - rect.top}px`
    );
  }

  const cardStyles = `
    group relative flex h-full flex-col
    rounded-2xl bg-slate-300/70 p-px
    shadow-lg shadow-slate-900/5
    transition-all duration-300
    hover:-translate-y-1
    hover:shadow-[0_16px_40px_rgba(139,92,246,0.10)]
    dark:bg-white/15 dark:shadow-black/10
    dark:hover:shadow-[0_16px_40px_rgba(139,92,246,0.15)]
    motion-reduce:hover:translate-y-0
  `;

  const content = (
    <>
     {/* Cursor-following colourful border */}
<span
  aria-hidden="true"
  className="pointer-events-none absolute inset-0
             rounded-2xl opacity-0
             transition-opacity duration-300
             group-hover:opacity-90
             group-active:opacity-90
             group-focus-visible:opacity-90"
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

      {/* Subtle external glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1
                   rounded-2xl opacity-0 blur-md
                   transition-opacity duration-300
                   group-hover:opacity-35
                   group-active:opacity-35
                   group-focus-visible:opacity-35
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

      {/* Glass card content */}
      <span
        className="relative   z-10 flex h-full flex-col
                   overflow-hidden rounded-[15px]
                   bg-white/90 backdrop-blur-md
                   transition-colors duration-300
                   group-hover:bg-indigo-50/90
                   dark:bg-blue-950/95
                   dark:group-hover:bg-blue-900/95"
      >
        {/* Project screenshot */}
        <span
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
        </span>

        {/* Project details */}
        <span className="flex flex-1 flex-col p-5">
          <span
            className="font-alan text-lg font-semibold
                       text-primary
                       transition-colors duration-300
                       group-hover:text-accent"
          >
            {project.title}
          </span>

          {/* Technology tags */}
          <span className="mt-4 flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech) => (
              <span
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
              </span>
            ))}
          </span>

          {/* Project link */}
          {projectUrl && (
            <span
              className="mt-auto flex items-center gap-2
                         pt-5 font-alan text-sm text-accent"
            >
              {project.demo
                ? "View Live Project"
                : "View on GitHub"}

              <FiArrowUpRight
                aria-hidden="true"
                className="transition-transform duration-300
                           group-hover:translate-x-1
                           group-hover:-translate-y-1
                           motion-reduce:transform-none"
              />
            </span>
          )}
        </span>
      </span>
    </>
  );

  if (!projectUrl) {
    return (
      <div className={cardStyles} ref={cardRef} onPointerMove={moveGlow}>
        {content}
      </div>
    );
  }

  return (
    <a
      ref={cardRef}
      href={projectUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.title} ${
        project.demo ? "live demo" : "GitHub repository"
      }`}
      onPointerMove={moveGlow}
      className={`${cardStyles}
                  cursor-pointer active:scale-[0.98]
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-accent`}
    >
      {content}
    </a>
  );
}

export default SliderProjectCard;
