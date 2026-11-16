
import { useRef } from "react";

function GlowContactLink({ href, icon, children }) {
  const cardRef = useRef(null);

  function moveGlow(e) {
    if (e.pointerType === "touch") return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <a
      ref={cardRef}
      href={href}
      onPointerMove={moveGlow}
      className="group relative flex min-w-0 items-center
                 rounded-2xl bg-slate-300/70 p-px
                 shadow-sm shadow-slate-900/5
                 transition-transform duration-300
                 hover:-translate-y-0.5
                 dark:bg-white/15 dark:shadow-none
                 motion-reduce:hover:translate-y-0
                 focus-visible:outline-2
                 focus-visible:outline-offset-4
                 focus-visible:outline-accent"
    >
      {/* Light mode: indigo cursor-following border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   rounded-2xl opacity-0
                   transition-opacity duration-300
                   group-hover:opacity-90
                   group-active:opacity-90
                   group-focus-visible:opacity-90
                   dark:hidden"
        style={{
          background: `radial-gradient(
            130px circle at var(--x, 50%) var(--y, 50%),
            rgba(79,70,229,0.95) 0%,
            rgba(67,56,202,0.9) 40%,
            rgba(55,48,163,0.7) 70%,
            transparent 100%
          )`,
        }}
      />

      {/* Dark mode: original colourful border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   hidden rounded-2xl opacity-0
                   transition-opacity duration-300
                   group-hover:opacity-80
                   group-active:opacity-80
                   group-focus-visible:opacity-80
                   dark:block"
        style={{
          background: `radial-gradient(
            130px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,1),
            rgba(139,92,246,0.9) 40%,
            rgba(244,114,182,0.7) 70%,
            transparent 100%
          )`,
        }}
      />

      {/* Light mode: subtle indigo external glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1
                   rounded-2xl opacity-0 blur-md
                   transition-opacity duration-300
                   group-hover:opacity-35
                   group-active:opacity-35
                   group-focus-visible:opacity-35
                   dark:hidden"
        style={{
          background: `radial-gradient(
            75px circle at var(--x, 50%) var(--y, 50%),
            rgba(79,70,229,0.25),
            rgba(67,56,202,0.2) 50%,
            transparent 85%
          )`,
        }}
      />

      {/* Dark mode: original external glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1
                   hidden rounded-2xl opacity-0 blur-md
                   transition-opacity duration-300
                   group-hover:opacity-35
                   group-active:opacity-35
                   group-focus-visible:opacity-35
                   dark:block"
        style={{
          background: `radial-gradient(
            75px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,0.25),
            rgba(139,92,246,0.2) 50%,
            transparent 85%
          )`,
        }}
      />

      {/* Glass content */}
      <span
        className="relative z-10 flex w-full min-w-0
                   items-center gap-4 rounded-[15px]
                   bg-white/90 p-4
                   backdrop-blur-md
                   transition-colors duration-300
                   group-hover:bg-indigo-50/90
                   dark:bg-blue-950/95
                   dark:group-hover:bg-blue-900/95"
      >
        {/* Icon */}
        <span
          className="flex h-11 w-11 shrink-0 items-center
                     justify-center rounded-xl
                     bg-indigo-50 text-indigo-700
                     dark:bg-violet-500/10
                     dark:text-accent"
        >
          {icon}
        </span>

        {/* Email */}
        <span
          className="min-w-0 break-all font-sora text-sm
                     text-secondary
                     transition-colors duration-300
                     group-hover:text-primary"
        >
          {children}
        </span>
      </span>
    </a>
  );
}

export default GlowContactLink;
