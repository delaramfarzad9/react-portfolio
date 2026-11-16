
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
                 bg-white/20 p-px
                 transition-transform duration-300
                 hover:-translate-y-1
                 motion-reduce:hover:translate-y-0
                 focus-visible:outline-2
                 focus-visible:outline-offset-4
                 focus-visible:outline-violet-400"
    >
      {/* Cursor-following border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   rounded-xl opacity-0
                   transition-opacity duration-300
                   group-hover:opacity-100
                   group-focus-visible:opacity-100"
        style={{
          background: `radial-gradient(
            85px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,1),
            rgba(139,92,246,0.9) 40%,
            rgba(244,114,182,0.7) 70%,
            transparent 100%
          )`,
        }}
      />

      {/* Soft external light */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2
                   rounded-2xl opacity-0 blur-xl
                   transition-opacity duration-300
                   group-hover:opacity-60"
        style={{
          background: `radial-gradient(
            75px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,0.5),
            rgba(139,92,246,0.35) 50%,
            transparent 85%
          )`,
        }}
      />

      {/* Icon */}
      <span
        className="relative z-10 flex h-12 w-12
                   items-center justify-center rounded-[11px]
                   bg-blue-950/95 text-slate-300
                   transition-colors duration-300
                   group-hover:bg-blue-900/95
                   group-hover:text-violet-300"
      >
        {children}
      </span>
    </a>
  );
}

export default GlowIconLink;
