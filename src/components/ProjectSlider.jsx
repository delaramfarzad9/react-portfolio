
import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import projects from "../data/projects";
import SliderProjectCard from "./SliderProjectCard";

const featuredProjects = projects;
const total = featuredProjects.length;

// Extra cards allow a seamless transition back to the start.
const slides = [
  ...featuredProjects,
  ...featuredProjects.slice(0, 3),
];

function ProjectSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || total <= 1) return;

    const timer = setInterval(() => {
      setAnimate(true);
      setIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, [paused, reducedMotion]);

  function next() {
    if (index >= total) return;

    setAnimate(true);
    setIndex((prev) => prev + 1);
  }

  function previous() {
    setAnimate(false);
    setIndex((prev) => (prev + total - 1) % total);
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
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      {/* Heading and controls */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-sora text-xs tracking-widest text-accent">
            FEATURED WORK
          </p>

          <h2
            id="featured-heading"
            className="mt-2 font-alan text-2xl font-bold
                       text-primary sm:text-3xl"
          >
            Selected <span className="text-accent">Projects.</span>
          </h2>
        </div>

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

      {/* Carousel viewport */}
    <div
  className="w-full overflow-hidden pt-3 pb-5
             [--visible:1] md:[--visible:2]
             2xl:[--visible:3]"
  aria-roledescription="carousel"
  aria-label="Project previews"
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

      {/* Pagination dots */}
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
    </section>
  );
}

export default ProjectSlider;
