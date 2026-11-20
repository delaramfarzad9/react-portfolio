
import useTouchGlow from "../hooks/useTouchGlow";

function GlowIconLink({ href, label, children }) {
  const {
    touchActive,
    handlePointerMove,
    handlePointerDown,
  } = useTouchGlow();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-touch-active={touchActive}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      className="group relative inline-flex rounded-xl
                 bg-slate-300/60 p-px dark:bg-white/15
                 transition-transform duration-300
                 [@media(hover:hover)]:hover:-translate-y-0.5
                 motion-reduce:hover:translate-y-0
                 focus-visible:outline-2
                 focus-visible:outline-offset-4
                 focus-visible:outline-accent"
    >
      {/* Light mode: indigo cursor-following border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   rounded-xl opacity-0
                   transition-opacity duration-75
                   sm:duration-300
                   [@media(hover:hover)]:group-hover:opacity-90
                   group-data-[touch-active=true]:opacity-90
                   group-focus-visible:opacity-90
                   dark:hidden"
        style={{
          background: `radial-gradient(
            65px circle at var(--x, 50%) var(--y, 50%),
            rgba(79,70,229,0.95) 0%,
            rgba(67,56,202,0.9) 45%,
            rgba(55,48,163,0.7) 75%,
            transparent 100%
          )`,
        }}
      />

      {/* Dark mode: cyan, violet and pink border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   hidden rounded-xl opacity-0
                   transition-opacity duration-75
                   sm:duration-300
                   [@media(hover:hover)]:group-hover:opacity-80
                   group-data-[touch-active=true]:opacity-80
                   group-focus-visible:opacity-80
                   dark:block"
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

      {/* Light mode: subtle indigo external glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1
                   rounded-xl opacity-0 blur-md
                   transition-opacity duration-75
                   sm:duration-300
                   [@media(hover:hover)]:group-hover:opacity-35
                   group-data-[touch-active=true]:opacity-25
                   group-focus-visible:opacity-35
                   dark:hidden"
        style={{
          background: `radial-gradient(
            45px circle at var(--x, 50%) var(--y, 50%),
            rgba(79,70,229,0.25),
            rgba(67,56,202,0.2) 45%,
            transparent 80%
          )`,
        }}
      />

      {/* Dark mode: original external glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1
                   hidden rounded-xl opacity-0 blur-md
                   transition-opacity duration-75
                   sm:duration-300
                   [@media(hover:hover)]:group-hover:opacity-40
                   group-data-[touch-active=true]:opacity-25
                   group-focus-visible:opacity-40
                   dark:block"
        style={{
          background: `radial-gradient(
            45px circle at var(--x, 50%) var(--y, 50%),
            rgba(139,92,246,0.35),
            rgba(34,211,238,0.2) 45%,
            transparent 80%
          )`,
        }}
      />

      {/* Icon content */}
      <span
        className="relative z-10 flex h-12 w-12
           items-center justify-center rounded-[11px]
           bg-surface text-secondary
           transition-colors duration-300
           [@media(hover:hover)]:group-hover:text-accent"
      >
        {children}
      </span>
    </a>
  );
}

export default GlowIconLink;
