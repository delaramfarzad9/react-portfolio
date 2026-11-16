
import { useEffect, useRef } from "react";

function FloatingPortrait({ src, alt }) {
  const portraitRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handlePointerMove = (e) => {
    if (e.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const element = portraitRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      element.style.setProperty("--rotateX", `${(0.5 - y) * 8}deg`);
      element.style.setProperty("--rotateY", `${(x - 0.5) * 8}deg`);
      element.style.setProperty("--x", `${x * rect.width}px`);
      element.style.setProperty("--y", `${y * rect.height}px`);

      frameRef.current = null;
    });
  };

  const resetTilt = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    const element = portraitRef.current;
    if (!element) return;

    element.style.setProperty("--rotateX", "0deg");
    element.style.setProperty("--rotateY", "0deg");
  };

  return (
    <div className="flex justify-center lg:justify-end">
      <div className="[perspective:1000px]">
        <div
          ref={portraitRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
          className="group relative rounded-full
                     transition-transform duration-300 ease-out
                     motion-reduce:transform-none"
          style={{
            transform:
              "rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg))",
          }}
        >
          {/* Subtle cursor-following outer glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2
                       rounded-full opacity-0 blur-xl
                       transition-opacity duration-300
                       group-hover:opacity-40
                       dark:group-hover:opacity-70"
            style={{
              background: `radial-gradient(
                75px circle at var(--x, 50%) var(--y, 50%),
                rgba(34,211,238,0.6),
                rgba(139,92,246,0.4) 50%,
                transparent 85%
              )`,
            }}
          />

          {/* Portrait border */}
          <div
            className="relative rounded-full
                       bg-slate-300/80 p-[2px]
                       dark:bg-white/20"
          >
            {/* Colourful hover border */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0
                         rounded-full opacity-0
                         transition-opacity duration-300
                         group-hover:opacity-100"
              style={{
                background: `radial-gradient(
                  100px circle at var(--x, 50%) var(--y, 50%),
                  rgba(34,211,238,1),
                  rgba(139,92,246,0.9) 40%,
                  rgba(244,114,182,0.7) 70%,
                  transparent 100%
                )`,
              }}
            />

            <img
              src={src}
              alt={alt}
              width="320"
              height="320"
              className="relative block aspect-square w-56
                         rounded-full object-cover
                         sm:w-72 lg:w-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FloatingPortrait;
