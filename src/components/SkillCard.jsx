
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
                 bg-slate-300/70 p-px
                 shadow-lg shadow-slate-900/5
                 transition-all duration-300
                 hover:-translate-y-1
                 hover:shadow-[0_12px_30px_rgba(139,92,246,0.10)]
                 dark:bg-white/15 dark:shadow-black/10
                 dark:hover:shadow-[0_12px_30px_rgba(139,92,246,0.15)]
                 motion-reduce:hover:translate-y-0"
    >
   
{/* Cursor-following border */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-0
             rounded-2xl opacity-0
             transition-opacity duration-300
             group-hover:opacity-90"
  style={{
    background: `radial-gradient(
      130px circle at var(--x, 50%) var(--y, 50%),
      var(--skill-glow-1) 0%,
      var(--skill-glow-2) 35%,
      var(--skill-glow-3) 65%,
      transparent 100%
    )`,
  }}
/>


    
{/* Subtle external glow */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute -inset-1
             rounded-2xl opacity-0 blur-md
             transition-opacity duration-300
             group-hover:opacity-35"
  style={{
    background: `radial-gradient(
      85px circle at var(--x, 50%) var(--y, 50%),
      var(--skill-glow-outer-1),
      var(--skill-glow-outer-2) 50%,
      transparent 85%
    )`,
  }}
/>


      {/* Glass card content */}
      <div
        className="relative h-full rounded-[15px]
                   bg-gray-50 p-6 backdrop-blur-md
                   transition-colors duration-300
                   group-hover:bg-indigo-50/99
                   dark:bg-indigo-950/95
                   dark:group-hover:bg-indigo-900/95"
      >
        <h3
          className="mb-5 font-alan text-xl font-semibold
                     text-primary transition-colors duration-300
                     group-hover:text-accent"
        >
          {title}
        </h3>

        <ul className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li key={skill}>
              <span
                className="inline-flex rounded-xl
                           border border-theme-border
                           bg-gradient-to-br
                           from-slate-50 to-white
                           px-4 py-2 font-sora text-sm
                           text-secondary shadow-sm
                           backdrop-blur-lg
                           transition-all duration-300
                           group-hover:border-accent/40
                           group-hover:text-primary
                           dark:from-white/15 dark:to-white/5
                           dark:text-slate-200
                           dark:group-hover:text-white"
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
