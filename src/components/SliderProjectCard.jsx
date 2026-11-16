
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

  const content = (
    <>
      {/* Cursor-following border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   rounded-2xl opacity-0
                   transition-opacity duration-300
                   group-hover:opacity-100
                   group-active:opacity-100
                   group-focus-visible:opacity-100"
        style={{
          background: `radial-gradient(
            130px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,1),
            rgba(139,92,246,0.9) 35%,
            rgba(244,114,182,0.7) 65%,
            transparent 100%
          )`,
        }}
      />

      {/* External glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2
                   rounded-3xl opacity-0 blur-xl
                   transition-opacity duration-300
                   group-hover:opacity-60
                   group-active:opacity-60"
        style={{
          background: `radial-gradient(
            85px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,0.5),
            rgba(139,92,246,0.35) 50%,
            transparent 85%
          )`,
        }}
      />

      {/* Card content */}
      <span
        className="relative z-10 flex h-full flex-col
                   overflow-hidden rounded-[15px]
                   bg-blue-950/95
                   transition-colors duration-300
                   group-hover:bg-blue-900/95"
      >
        {/* Screenshot */}
        <span
          className="flex aspect-video items-center
                     justify-center bg-blue-900/30 p-3"
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

        {/* Details */}
        <span className="flex flex-1 flex-col p-5">
          <span
            className="font-alan text-lg font-semibold
                       text-slate-100
                       transition-colors duration-300
                       group-hover:text-violet-300"
          >
            {project.title}
          </span>

          <span className="mt-4 flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/15
                           bg-white/5 px-2.5 py-1
                           font-sora text-xs text-slate-300"
              >
                {tech}
              </span>
            ))}
          </span>

          <span
            className="mt-auto flex items-center gap-2
                       pt-5 font-alan text-sm
                       text-violet-300"
          >
            {project.demo ? "View Live Project" : "View on GitHub"}

            <FiArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-300
                         group-hover:translate-x-1
                         group-hover:-translate-y-1"
            />
          </span>
        </span>
      </span>
    </>
  );

  if (!projectUrl) {
    return (
      <div
        className="relative flex h-full flex-col
                   rounded-2xl bg-white/15 p-px"
      >
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
      className="group relative flex h-full flex-col
                 rounded-2xl bg-white/15 p-px
                 shadow-lg shadow-black/10
                 transition-all duration-300
                 hover:-translate-y-1
                 hover:shadow-[0_16px_40px_rgba(139,92,246,0.15)]
                 active:scale-[0.98]
                 focus-visible:outline-2
                 focus-visible:outline-offset-4
                 focus-visible:outline-violet-400
                 motion-reduce:hover:translate-y-0"
    >
      {content}
    </a>
  );
}

export default SliderProjectCard;
