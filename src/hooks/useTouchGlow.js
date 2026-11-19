
import { useEffect, useRef, useState } from "react";

export default function useTouchGlow() {
  const [touchActive, setTouchActive] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  function updateGlowPosition(e) {
    const element = e.currentTarget;
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

  function handlePointerMove(e) {
    if (e.pointerType === "touch") return;

    updateGlowPosition(e);
  }

  function handlePointerDown(e) {
    updateGlowPosition(e);

    if (e.pointerType !== "touch") return;

    clearTimeout(timeoutRef.current);

    setTouchActive(true);

    timeoutRef.current = setTimeout(() => {
      setTouchActive(false);
    }, 450);
  }

  return {
    touchActive,
    handlePointerMove,
    handlePointerDown,
  };
}
