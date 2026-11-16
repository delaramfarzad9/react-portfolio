
import { useRef } from "react";

function SkillCard({ title, skills }) {
  const cardRef = useRef(null);

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
      className="group relative rounded-2xl
                 bg-white/15 p-px
                 shadow-lg shadow-black/10
                 transition-all duration-300
                 hover:-translate-y-1
                 hover:shadow-[0_12px_30px_rgba(139,92,246,0.15)]
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

      {/* Small light outside the card */}
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

      {/* Glass card content */}
      <div
        className="relative h-full rounded-[15px]
                   bg-blue-950/95 p-6
                   backdrop-blur-md
                   transition-colors duration-300
                   group-hover:bg-blue-900/95"
      >
        <h3
          className="mb-5 font-alan text-xl font-semibold
                     text-slate-100 transition-colors duration-300
                     group-hover:text-violet-400"
        >
          {title}
        </h3>

        <ul className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li key={skill}>
              <span
                className="inline-flex rounded-xl border border-white/15
                           bg-gradient-to-br from-white/15 to-white/5
                           px-4 py-2 font-sora text-sm text-slate-200
                           shadow-sm backdrop-blur-lg
                           transition-all duration-300
                           group-hover:border-violet-400/40
                           group-hover:text-white
                           group-hover:shadow-[0_4px_15px_rgba(139,92,246,0.12)]"
              >
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default SkillCard;
