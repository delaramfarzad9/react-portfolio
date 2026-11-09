

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
      element.style.setProperty("--x", `${x * 100}%`);
      element.style.setProperty("--y", `${y * 100}%`);
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
          className="group relative rounded-full p-1
                     transition-transform duration-300 ease-out
                     motion-reduce:transform-none"
          style={{
            transform:
              "rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg))",
          }}
        >
          {/* Cursor-following glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3
                       rounded-full opacity-30 blur-2xl
                       transition-opacity duration-300
                       group-hover:opacity-70"
            style={{
              background:
                "radial-gradient(circle at var(--x, 50%) var(--y, 50%), #22d3ee, #8b5cf6 55%, transparent 80%)",
            }}
          />

          {/* Gradient border */}
          <div className="relative rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500 p-1">
            <img
              src={src}
              alt={alt}
              width="320"
              height="320"
              className="aspect-square w-56 rounded-full object-cover
                         sm:w-72 lg:w-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FloatingPortrait;
