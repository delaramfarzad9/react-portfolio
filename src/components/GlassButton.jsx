
import { Link } from "react-router";
import { HiArrowUpRight } from "react-icons/hi2";

function GlowButton({
  text,
  to,
  download = false,
  submit = false,
  wide = false,
}) {
  const moveGlow = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    button.style.setProperty("--x", `${e.clientX - rect.left}px`);
    button.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const buttonStyles = `
    relative z-10 inline-flex items-center justify-center gap-3
    rounded-[15px] bg-surface font-alan font-medium text-primary
    backdrop-blur-xl transition-all duration-300
    hover:bg-hover-surface active:scale-[0.98]
    focus-visible:outline-2 focus-visible:outline-offset-4
    focus-visible:outline-accent
  `;

  return (
    <div
      onPointerMove={moveGlow}
      onPointerDown={moveGlow}
      className={`group relative inline-flex rounded-2xl
                  bg-slate-300/60 p-px dark:bg-white/20
                  ${wide ? "w-full" : "w-fit"}`}
    >
      {/* Cursor-following colourful border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   rounded-2xl opacity-0
                   transition-opacity duration-300
                   group-hover:opacity-80
                   group-active:opacity-80"
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

      {/* Subtle external glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1
                   rounded-2xl opacity-0 blur-md
                   transition-opacity duration-300
                   group-hover:opacity-40
                   group-active:opacity-40"
        style={{
          background: `radial-gradient(
            65px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,0.3),
            rgba(139,92,246,0.25) 50%,
            transparent 85%
          )`,
        }}
      />

      {submit ? (
        <button
          type="submit"
          className={`${buttonStyles} cursor-pointer px-10 py-4
                      text-base font-semibold ${wide ? "w-full" : ""}`}
        >
          <span>{text}</span>
          <HiArrowUpRight aria-hidden="true" className="text-lg" />
        </button>
      ) : download ? (
        <a
          href={to}
          download
          className={`${buttonStyles} px-6 py-3 ${
            wide ? "w-full" : ""
          }`}
        >
          <span>{text}</span>
          <HiArrowUpRight aria-hidden="true" className="text-lg" />
        </a>
      ) : (
        <Link
          to={to}
          className={`${buttonStyles} px-6 py-3 ${
            wide ? "w-full" : ""
          }`}
        >
          <span>{text}</span>
          <HiArrowUpRight
            aria-hidden="true"
            className="text-lg transition-transform duration-300
                       group-hover:translate-x-1
                       group-hover:-translate-y-1
                       motion-reduce:transform-none"
          />
        </Link>
      )}
    </div>
  );
}

export default GlowButton;
