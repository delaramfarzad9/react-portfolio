import { Link } from "react-router";
import { HiArrowUpRight } from "react-icons/hi2";


function GlowButton({ text, to }) {
  const moveGlow = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      onPointerMove={moveGlow}
      onPointerDown={moveGlow}
      className="group relative inline-flex w-fit rounded-2xl  bg-slate-300/60 p-px dark:bg-white/20"
    >
      {/* Cursor-following multicolour border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl  opacity-0 transition-opacity duration-300 group-hover:opacity-100
                   group-active:opacity-100"
        style={{
          background: `radial-gradient(
            85px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,1) 0%,
            rgba(139,92,246,0.9) 35%,
            rgba(244,114,182,0.7) 65%,
            transparent 100%
          )`,
        }}
      />

      {/* External glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2   rounded-3xl opacity-0 blur-xl
                   transition-opacity duration-300   group-hover:opacity-60
                   group-active:opacity-60"
        style={{
          background: `radial-gradient(
            75px circle at
            calc(var(--x, 50%) + 8px)
            calc(var(--y, 50%) + 8px),
            rgba(34,211,238,0.5),
            rgba(139,92,246,0.35) 50%,
            transparent 85%
          )`,
        }}
      />

      {/* Glass button */}
      <Link
        to={to}
        className="relative z-10 inline-flex items-center gap-3   rounded-[15px]
                   bg-slate-100/90 px-6 py-3   font-alan font-medium text-slate-800
                   backdrop-blur-xl   transition-all duration-300   hover:bg-slate-100
                   active:scale-[0.98]  dark:bg-blue-950/95     dark:text-slate-200
                   dark:hover:bg-blue-900/95  focus-visible:outline-2  focus-visible:outline-offset-4
                   focus-visible:outline-violet-400"
      >
        <span>{text}</span>

        <HiArrowUpRight
          aria-hidden="true"
          className="text-lg transition-transform duration-300   group-hover:translate-x-1
                     group-hover:-translate-y-1"
        />
      </Link>
    </div>
  );
}

export default GlowButton;