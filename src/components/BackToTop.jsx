
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop() {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
     behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-40
                  flex h-12 w-12 cursor-pointer
                  items-center justify-center
                  rounded-xl border border-theme-border
                  bg-surface text-accent
                  shadow-lg shadow-slate-900/10
                  backdrop-blur-md
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-accent/50
                  hover:shadow-xl
                  dark:shadow-black/20
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-accent
                  motion-reduce:transform-none
                  ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-4 opacity-0"
                  }`}
    >
      <FiArrowUp aria-hidden="true" size={20} />
    </button>
  );
}

export default BackToTop;
