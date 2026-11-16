
import { useRef } from "react";

function GlowIconLink({ href, label, children }) {
  const linkRef = useRef(null);

  function moveGlow(e) {
    if (e.pointerType === "touch") return;

    const element = linkRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    element.style.setProperty(
      "--x",
      `${e.clientX - rect.left}px`
    );

    element.style.setProperty(
      "--y",
      `${e.clientY - rect.top}px`
    );
  }

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onPointerMove={moveGlow}
      className="group relative inline-flex rounded-xl
                 bg-slate-300/60 p-px dark:bg-white/15
                 transition-transform duration-300
                 hover:-translate-y-0.5
                 motion-reduce:hover:translate-y-0
                 focus-visible:outline-2
                 focus-visible:outline-offset-4
                 focus-visible:outline-accent"
    >
      {/* Cursor-following colourful border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   rounded-xl opacity-0
                   transition-opacity duration-300
                   group-hover:opacity-70
                   group-active:opacity-70
                   group-focus-visible:opacity-70"
        style={{
          background: `radial-gradient(
            65px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,0.7),
            rgba(139,92,246,0.6) 45%,
            rgba(244,114,182,0.35) 75%,
            transparent 100%
          )`,
        }}
      />

      {/* Subtle external glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1
                   rounded-xl opacity-0 blur-md
                   transition-opacity duration-300
                   group-hover:opacity-40
                   group-active:opacity-40
                   group-focus-within:opacity-40"
        style={{
          background: `radial-gradient(
            45px circle at var(--x, 50%) var(--y, 50%),
            rgba(139,92,246,0.35),
            rgba(34,211,238,0.2) 45%,
            transparent 80%
          )`,
        }}
      />

      {/* Theme-aware glass icon */}
      <span
        className="relative z-10 flex h-12 w-12
                   items-center justify-center rounded-[11px]
                   bg-surface text-secondary
                   transition-colors duration-300
                   group-hover:bg-hover-surface
                   group-hover:text-accent"
      >
        {children}
      </span>
    </a>
  );
}

export default GlowIconLink;
