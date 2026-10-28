import { FiCode } from "react-icons/fi";
import GlowButton from "../components/GlassButton";
function Hero() {

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[75vh] flex-col justify-center py-16"
    >
      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4  h-64 w-64 rounded-full bg-violet-500/10
                   blur-3xl"
      />

      <div className="relative z-10 max-w-4xl">
        {/* Small introduction */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

          <span className="font-space text-xs tracking-widest text-violet-300">
            HELLO, WORLD!
          </span>

          <FiCode
            aria-hidden="true"
            className="text-lg text-violet-400"
          />
        </div>

        {/* Main heading */}
        <h2
          id="hero-heading"
          className="font-alan max-w-3xl text-4xl font-bold    leading-[1.2] 
                     sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          Digital experiences
          <br />
           that
          
          <span className="text-indigo-500">
            {" "}feel different.
          </span>
        </h2>

        {/* Description */}
        <p
          className="font-alan mt-8 max-w-xl text-base leading-8 text-slate-300 sm:text-lg"
        >
          I'm Dela, a front-end developer who loves turning
          creative ideas into responsive, interactive, and
          user-friendly web experiences.
        </p>

        {/* CTA buttons */}
    {/* CTA buttons */}
<div className="mt-10 flex flex-wrap items-center gap-4">
  <GlowButton text="Explore my work" to="/projects" />
  <GlowButton text="Let's connect" to="/contact" />
</div>
        {/* Tech stack */}
        {/* <div className="mt-16 border-t border-white/10 pt-6">
          <p className="font-space mb-4 text-[10px] tracking-[0.2em] text-slate-400">
            TECH I WORK WITH
          </p>

          <div className="flex flex-wrap gap-3">
            {["React", "JavaScript", "Next.js", "Tailwind CSS"].map(
              (tech) => (
                <span
                  key={tech}
                  className="font-space rounded-lg border
                             border-violet-400/20 bg-violet-400/5
                             px-3 py-2 text-xs text-violet-200"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default Hero;