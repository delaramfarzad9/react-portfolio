
import { Link } from "react-router";
import { HiArrowUpRight } from "react-icons/hi2";
import useTouchGlow from "../hooks/useTouchGlow";

function GlowButton({
  text,
  to,
  download = false,
  submit = false,
  wide = false,
}) {
  const {
    touchActive,
    handlePointerMove,
    handlePointerDown,
  } = useTouchGlow();

  const buttonStyles = `
    relative z-10 inline-flex items-center justify-center gap-3
    rounded-[15px] bg-surface
    font-alan font-medium text-primary
    backdrop-blur-xl
    transition-colors duration-300

    [@media(hover:hover)]:group-hover:bg-indigo-50/90
    dark:[@media(hover:hover)]:group-hover:bg-blue-900/95

    active:scale-[0.98]
    focus-visible:outline-2
    focus-visible:outline-offset-4
    focus-visible:outline-accent
  `;

  const content = (
    <>
      <span>{text}</span>

      <HiArrowUpRight
        aria-hidden="true"
        className="text-lg transition-transform duration-300
                   [@media(hover:hover)]:group-hover:translate-x-1
                   [@media(hover:hover)]:group-hover:-translate-y-1
                   motion-reduce:transform-none"
      />
    </>
  );

  return (
    <div
      data-touch-active={touchActive}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      className={`group relative inline-flex rounded-2xl
                  bg-slate-300/70 p-px
                  dark:bg-white/15
                  ${wide ? "w-full" : "w-fit"}`}
    >
      {/* Light mode: indigo cursor-following border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   rounded-2xl opacity-0
                   transition-opacity duration-75
                   sm:duration-300
                   [@media(hover:hover)]:group-hover:opacity-90
                   group-data-[touch-active=true]:opacity-90
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

      {/* Dark mode: cyan, violet and pink border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   hidden rounded-2xl opacity-0
                   transition-opacity duration-75
                   sm:duration-300
                   [@media(hover:hover)]:group-hover:opacity-80
                   group-data-[touch-active=true]:opacity-80
                   dark:block"
        style={{
          background: `radial-gradient(
            130px circle at var(--x, 50%) var(--y, 50%),
            rgba(34,211,238,1) 0%,
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
                   transition-opacity duration-75
                   sm:duration-300
                   [@media(hover:hover)]:group-hover:opacity-35
                   group-data-[touch-active=true]:opacity-25
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
                   transition-opacity duration-75
                   sm:duration-300
                   [@media(hover:hover)]:group-hover:opacity-35
                   group-data-[touch-active=true]:opacity-25
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

      {/* Button variants */}
      {submit ? (
        <button
          type="submit"
          className={`${buttonStyles}
                      cursor-pointer px-10 py-4
                      text-base font-semibold
                      ${wide ? "w-full" : ""}`}
        >
          {content}
        </button>
      ) : download ? (
        <a
          href={to}
          download
          className={`${buttonStyles} px-6 py-3
                      ${wide ? "w-full" : ""}`}
        >
          {content}
        </a>
      ) : (
        <Link
          to={to}
          className={`${buttonStyles} px-6 py-3
                      ${wide ? "w-full" : ""}`}
        >
          {content}
        </Link>
      )}
    </div>
  );
}

export default GlowButton;
