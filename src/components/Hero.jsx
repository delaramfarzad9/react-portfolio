
import { FiCode } from "react-icons/fi";
import GlowButton from "../components/GlassButton";
import AnimatedTechIcons from "./AnimatedTechIcons";

function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-0 flex-col
             justify-start pt-2 pb-8
             text-primary
             sm:pt-8 sm:pb-12
             xl:min-h-[75vh] xl:justify-center
             xl:py-16"
    >
      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4
                   h-64 w-64 rounded-full
                   bg-hero-glow blur-3xl"
      />

      <div
        className="relative z-10 grid items-center
                   gap-12 xl:grid-cols-[minmax(0,1fr)_420px]"
      >
        {/* Left — Hero content */}
        <div className="min-w-0">
          <div className="mb-8 flex items-center gap-3">
            <span
              className="h-2 w-2 animate-pulse
                         rounded-full bg-emerald-900 dark:bg-emerald-400"
            />

            <span
              className="font-space text-xs tracking-widest
                         text-accent"
            >
              HELLO, WORLD!
            </span>

            <FiCode
              aria-hidden="true"
              className="text-lg text-accent"
            />
          </div>

          <h2
            id="hero-heading"
            className="font-alan max-w-3xl
                       text-4xl font-bold leading-[1.2]
                       sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Digital experiences
            <br />
            that
            <span className="text-hero-highlight">
              {" "}feel different.
            </span>
          </h2>

          <p
            className="font-alan mt-8 max-w-xl
                       text-base leading-8 text-secondary
                       sm:text-lg"
          >
            I'm Dela, a front-end developer who loves turning
            creative ideas into responsive, interactive, and
            user-friendly web experiences.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <GlowButton text="Explore my work" to="/projects" />
            <GlowButton text="Let's connect" to="/contact" />
          </div>
        </div>

        {/* Right — Floating technologies */}
        <div
          className="flex justify-center xl:justify-end
                     min-[1800px]:-translate-x-20"
        >
          <AnimatedTechIcons />
        </div>
      </div>
    </section>
  );
}

export default Hero;
