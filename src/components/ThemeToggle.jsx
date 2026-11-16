
import { useRef } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const toggleRef = useRef(null);
  const isDark = theme === "dark";

  function moveGlow(e) {
    if (e.pointerType === "touch") return;

    const element = toggleRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    element.style.setProperty("--x", `${e.clientX - rect.left}px`);
    element.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={toggleRef}
      onPointerMove={moveGlow}
      className="group relative isolate inline-flex rounded-full"
    >
      {/* Original subtle external glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2
                   -z-10 rounded-full opacity-0 blur-md
                   transition-opacity duration-300
                   group-hover:opacity-40
                   group-active:opacity-40
                   group-has-[:focus-visible]:opacity-40
                   motion-reduce:transition-none"
        style={{
          background: `radial-gradient(
            55px circle at var(--x, 50%) var(--y, 50%),
            rgba(139,92,246,0.4),
            rgba(34,211,238,0.2) 50%,
            transparent 85%
          )`,
        }}
      />

      {/* Original glass pill */}
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Dark mode"
        onClick={toggleTheme}
        className="relative flex h-11 w-[92px]
                   cursor-pointer items-center
                   rounded-full border border-theme-border
                   bg-glass p-1 shadow-lg shadow-black/10
                   backdrop-blur-xl
                   transition-colors duration-300
                  hover:border-transparent
                   focus-visible:outline-2
                   focus-visible:outline-offset-4
                   focus-visible:outline-accent"
      >
        {/* colourful border, only on interaction */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px
                     rounded-full opacity-0
                     transition-opacity duration-300
                     group-hover:opacity-100
                     group-active:opacity-100
                     group-has-[:focus-visible]:opacity-100"
          style={{
            background: `radial-gradient(
              85px circle at var(--x, 50%) var(--y, 50%),
              rgba(34,211,238,1) 0%,
              rgba(139,92,246,0.9) 35%,
              rgba(244,114,182,0.7) 65%,
              transparent 100%
            )`,
            padding: "1px",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Original sliding selection indicator */}
        <span
          aria-hidden="true"
          className={`absolute left-1 top-1
                      h-[34px] w-[40px] rounded-full
                      dark:bg-accent bg-indigo-500 shadow-md shadow-violet-500/20
                      transition-transform duration-300 ease-in-out
                      motion-reduce:transition-none ${
                        isDark ? "translate-x-10" : "translate-x-0"
                      }`}
        />

        {/* Original Sun */}
        <span
          aria-hidden="true"
          className={`relative z-10 flex h-[34px] w-[40px]
                      items-center justify-center
                      transition-colors duration-300 ${
                        !isDark ? "text-white" : "text-secondary"
                      }`}
        >
          <FiSun size={19} />
        </span>

        {/* Original Moon */}
        <span
          aria-hidden="true"
          className={`relative z-10 flex h-[34px] w-[40px]
                      items-center justify-center
                      transition-colors duration-300 ${
                        isDark ? "text-white" : "text-secondary"
                      }`}
        >
          <FiMoon size={19} />
        </span>
      </button>
    </div>
  );
}

export default ThemeToggle;
