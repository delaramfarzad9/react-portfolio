
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

import projects from "../data/projects";
import SliderProjectCard from "./SliderProjectCard";
import Reveal from "../animations/Reveal";

const featuredProjects = projects;
const total = featuredProjects.length;

// Extra cards allow a seamless transition back to the start.
const slides = [
  ...featuredProjects,
  ...featuredProjects.slice(0, 3),
];

const SWIPE_THRESHOLD = 50;

function ProjectSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Store touch coordinates without causing re-renders.
  const touchStartRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  // Autoplay: reset the timer after each slide change.
  useEffect(() => {
    if (paused || reducedMotion || total <= 1 || index >= total) {
      return;
    }

    const timer = setTimeout(() => {
      setAnimate(true);
      setIndex((prev) => prev + 1);
    }, 4000);

    return () => clearTimeout(timer);
  }, [index, paused, reducedMotion]);

  function next() {
    if (index >= total) return;

    setAnimate(true);
    setIndex((prev) => prev + 1);
  }

function previous() {
  if (index >= total) return;

  setAnimate(true);
  setIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
}

  // Remember where the user's finger first touches the slider.
  function handleTouchStart(e) {
    if (e.touches.length !== 1) return;

    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };

    setPaused(true);
  }

  // Detect a horizontal swipe when the finger is released.
  function handleTouchEnd(e) {
    const start = touchStartRef.current;
    touchStartRef.current = null;

    setPaused(false);

    if (!start || e.changedTouches.length !== 1) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const deltaX = endX - start.x;
    const deltaY = endY - start.y;

    const isHorizontalSwipe =
      Math.abs(deltaX) >= SWIPE_THRESHOLD &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.25;

    if (!isHorizontalSwipe) return;

    if (deltaX < 0) {
      next();
    } else {
      previous();
    }
  }

  function handleTouchCancel() {
    touchStartRef.current = null;
    setPaused(false);
  }

  function handleTransitionEnd(e) {
    if (
      e.target !== e.currentTarget ||
      e.propertyName !== "transform"
    ) {
      return;
    }

    if (index >= total) {
      setAnimate(false);
      setIndex(0);
    }
  }

  if (!total) return null;

  const arrowStyles = `
    flex h-10 w-10 cursor-pointer items-center
    justify-center rounded-xl
    border border-theme-border
    bg-white/80 text-secondary
    shadow-sm shadow-slate-900/5
    transition-colors duration-300
    hover:border-accent/50
    hover:bg-violet-50 hover:text-accent
    dark:bg-white/5 dark:text-slate-200
    dark:shadow-none
    dark:hover:bg-violet-500/15
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-accent
  `;

  return (
    <section
      aria-labelledby="featured-heading"
      className="mt-16 min-w-0 w-full"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setPaused(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setPaused(false);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      {/* 1. Heading and controls */}
      <Reveal trigger="view" delay={0} duration={0.75}>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sora text-xs tracking-widest text-accent">
              MY WORK
            </p>

            <h2
              id="featured-heading"
              className="mt-2 font-alan text-2xl font-bold
                         text-primary sm:text-3xl"
            >
              My <span className="text-accent">Projects.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* View More Projects */}
            <Link
              to="/projects"
              className="group inline-flex min-h-10
                         items-center justify-center gap-2
                         rounded-xl border border-theme-border
                         bg-surface px-4 py-2
                         font-alan text-sm text-primary
                         transition-colors duration-300
                         hover:border-accent/40
                         focus-visible:outline-2
                         focus-visible:outline-offset-4
                         focus-visible:outline-accent"
            >
              View More Projects

              <FiArrowUpRight
                aria-hidden="true"
                className="text-accent
                           transition-transform duration-300
                           group-hover:translate-x-0.5
                           group-hover:-translate-y-0.5
                           motion-reduce:transform-none"
              />
            </Link>

            {/* Navigation arrows */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous project"
                className={arrowStyles}
              >
                <FiArrowLeft aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next project"
                className={arrowStyles}
              >
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 2. Swipeable project carousel */}
      <Reveal
        trigger="view"
        delay={0.15}
        duration={0.9}
        distance={20}
      >
        <div
          className="w-full overflow-hidden pt-3 pb-5
                     touch-pan-y
                     [--visible:1] md:[--visible:2]
                     2xl:[--visible:3]"
          aria-roledescription="carousel"
          aria-label="Project previews"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          <div
            className={`flex w-full ${
              animate && !reducedMotion
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(calc(-${index} * 100% / var(--visible)))`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((project, i) => (
              <div
                key={`${project.title}-${i}`}
                className="w-full shrink-0 px-2
                           md:w-1/2 2xl:w-1/3"
              >
                <SliderProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 3. Pagination dots */}
      <Reveal
        trigger="view"
        delay={0.25}
        duration={0.65}
        distance={8}
      >
        <div className="mt-5 flex items-center justify-center gap-2">
          {featuredProjects.map((project, i) => (
            <button
              key={project.title}
              type="button"
              aria-label={`Go to ${project.title}`}
              aria-current={
                index % total === i ? "true" : undefined
              }
              onClick={() => {
                setAnimate(true);
                setIndex(i);
              }}
              className={`h-2 cursor-pointer rounded-full
                          transition-all duration-300
                          focus-visible:outline-2
                          focus-visible:outline-offset-4
                          focus-visible:outline-accent
                          ${
                            index % total === i
                              ? "w-7 bg-accent"
                              : `w-2 bg-slate-300
                                 hover:bg-violet-400/60
                                 dark:bg-white/25
                                 dark:hover:bg-white/50`
                          }`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default ProjectSlider;
