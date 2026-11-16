
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

  // Track cursor position for the border glow
  const moveGlow = (e) => {
    if (e.pointerType === "touch") return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={moveGlow}
      className="group relative flex h-full flex-col
                 rounded-2xl bg-white/15 p-px
                 shadow-lg shadow-black/10
                 transition-all duration-300
                 hover:-translate-y-1
                 hover:shadow-[0_16px_40px_rgba(139,92,246,0.15)]
                 motion-reduce:hover:translate-y-0"
    >
      {/* Cursor-following colourful border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   rounded-2xl opacity-0
                   transition-opacity duration-300
                   group-hover:opacity-100"
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

      {/* Small external light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2
                   rounded-3xl opacity-0 blur-xl
                   transition-opacity duration-300
                   group-hover:opacity-60"
        style={{
          background: `radial-gradient(
            85px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,0.5),
            rgba(139,92,246,0.35) 50%,
            transparent 85%
          )`,
        }}
      />

      {/* Inner glass card */}
      <div
        className="relative flex h-full flex-1 flex-col
                   overflow-hidden rounded-[15px]
                   bg-blue-950/95 backdrop-blur-md
                   transition-colors duration-300
                   group-hover:bg-blue-900/95"
      >
        {/* Project screenshot */}
        <div
          className="relative flex aspect-video items-center
                     justify-center overflow-hidden
                     bg-blue-900/30 p-3"
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
                         rounded-full border border-white/20
                         bg-blue-950/85 px-3 py-1
                         font-sora text-xs text-slate-100
                         backdrop-blur-md"
            >
              {status}
            </span>
          )}
        </div>

        {/* Project information */}
        <div className="flex flex-1 flex-col p-6">
          <h2
            className="font-alan text-2xl font-bold text-slate-100
                       transition-colors duration-300
                       group-hover:text-violet-400"
          >
            {title}
          </h2>

          <p className="mt-4 font-sora text-sm leading-7 text-slate-300">
            {details[0]}
          </p>

          {/* Expandable details */}
          {details.length > 1 && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                className="inline-flex items-center gap-2
                           font-sora text-sm text-violet-300
                           hover:text-white
                           focus-visible:outline-2
                           focus-visible:outline-offset-4
                           focus-visible:outline-violet-400"
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
                             font-sora text-sm leading-7
                             text-slate-300"
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
                className="rounded-lg border border-white/15
                           bg-white/5 px-3 py-1.5
                           font-sora text-xs text-slate-200
                           transition-colors duration-300
                           group-hover:border-violet-400/40
                           group-hover:bg-violet-400/10"
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
                           font-alan text-sm text-violet-300
                           transition-colors hover:text-white
                           focus-visible:outline-2
                           focus-visible:outline-offset-4
                           focus-visible:outline-violet-400"
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
                           font-alan text-sm text-slate-300
                           transition-colors hover:text-white
                           focus-visible:outline-2
                           focus-visible:outline-offset-4
                           focus-visible:outline-violet-400"
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
