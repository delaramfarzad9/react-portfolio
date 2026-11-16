
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
                 rounded-2xl bg-white/15 p-px
                 transition-transform duration-300
                 hover:-translate-y-0.5
                 motion-reduce:hover:translate-y-0
                 focus-visible:outline-2
                 focus-visible:outline-offset-4
                 focus-visible:outline-violet-400"
    >
      {/* Cursor-following border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   rounded-2xl opacity-0
                   transition-opacity duration-300
                   group-hover:opacity-100
                   group-focus-visible:opacity-100"
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

      {/* Soft external glow */}
      <span
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

      {/* Glass content */}
      <span
        className="relative z-10 flex w-full min-w-0 items-center
                   gap-4 rounded-[15px] bg-blue-950/95 p-4
                   backdrop-blur-md transition-colors duration-300
                   group-hover:bg-blue-900/95"
      >
        <span
          className="flex h-11 w-11 shrink-0 items-center
                     justify-center rounded-xl bg-violet-500/10
                     text-violet-400"
        >
          {icon}
        </span>

        <span className="min-w-0 break-all font-sora text-sm text-slate-300 group-hover:text-white">
          {children}
        </span>
      </span>
    </a>
  );
}

export default GlowContactLink;
