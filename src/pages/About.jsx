
import profileImage from "../assets/images/about.png";
import GlowButton from "../components/GlassButton";
import SkillCard from "../components/SkillCard";
import FloatingPortrait from "../components/FloatingPortrait";
import Highlight from "../components/Highlight";
import Reveal from "../animations/Reveal";

const skillGroups = [
  {
    title: "Core Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Currently Learning",
    skills: ["TypeScript"],
  },
  {
    title: "Design",
    skills: ["UI/UX", "Figma", "Responsive Design"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Vercel"],
  },
  {
    title: "Quality-Focused Development",
    skills: ["Accessibility", "Reusable Components", "Semantic HTML"],
  },
  {
    title: "Backend & APIs",
    skills: ["REST APIs", "Node.js", "Express", "PostgreSQL"],
  },
];

const skillDirections = [
  "left",
  "down",
  "right",
  "left",
  "up",
  "right",
];

function About() {
  return (
    <section
      aria-labelledby="about-heading"
      className="mx-auto max-w-6xl pt-2 pb-5 md:py-10 text-primary"
    >
      {/* Introduction */}
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          {/* Intro label */}
          <Reveal trigger="mount" delay={0}>
            <p className="mb-4 font-sora text-sm tracking-widest text-accent">
              THE PERSON BEHIND THE CODE
            </p>
          </Reveal>

          {/* Heading */}
          <Reveal trigger="mount" delay={0.15}>
            <h2
              id="about-heading"
              className="font-alan text-4xl font-bold sm:text-5xl"
            >
              About <span className="text-accent">Me.</span>
            </h2>
          </Reveal>

          {/* Introduction paragraphs */}
          <div className="mt-8 space-y-5 font-sora leading-8 text-secondary">
            <Reveal trigger="mount" delay={0.25}>
              <p>
                I'm Dela, a UK-based front-end developer with professional
                experience building responsive interfaces and reusable UI
                components using <Highlight>JavaScript</Highlight>,{" "}
                <Highlight>React</Highlight> and{" "}
                <Highlight>Tailwind CSS</Highlight>.
              </p>
            </Reveal>

            <Reveal trigger="mount" delay={0.35}>
              <p>
                I've built and deployed projects using{" "}
                <Highlight>Next.js</Highlight> and{" "}
                <Highlight>REST APIs</Highlight>. I'm also developing a
                React travel application with a backend built using{" "}
                <Highlight>Node.js</Highlight>,{" "}
                <Highlight>Express</Highlight> and{" "}
                <Highlight>PostgreSQL</Highlight>, while improving my{" "}
                <Highlight>TypeScript</Highlight> skills.
              </p>
            </Reveal>

            <Reveal trigger="mount" delay={0.45}>
              <p>
                With a background in <Highlight>architecture</Highlight>,{" "}
                <Highlight>UI/UX design</Highlight> training and professional{" "}
                <Highlight>UI development</Highlight> experience, I bring
                a design-focused approach to creating accessible,
                intuitive web experiences.
              </p>
            </Reveal>

            <Reveal trigger="mount" delay={0.55}>
              <p>
                I speak <Highlight>English</Highlight>,{" "}
                <Highlight>German</Highlight> and{" "}
                <Highlight>Persian</Highlight>.
              </p>
            </Reveal>
          </div>

          {/* CV download */}
          <Reveal trigger="mount" delay={0.65}>
            <div className="mt-8">
              <GlowButton
                text="Download CV"
                to="/Delaram_Farzad_CV_2026-10-21 -$.pdf"
                download
              />
            </div>
          </Reveal>
        </div>

        {/* Profile portrait — no position-changing transform */}
        <Reveal
          trigger="view"
          delay={0.2}
          duration={1}
          distance={0}
        >
          <FloatingPortrait
            src={profileImage}
            alt="Portrait of Dela"
          />
        </Reveal>
      </div>

      {/* Skills */}
      <section
        aria-labelledby="skills-heading"
        className="mt-10 sm:mt-15 md:mt-24"
      >
        <Reveal trigger="view" duration={0.7}>
          <p className="mb-3 font-sora text-sm tracking-widest text-accent">
            MY TOOLKIT
          </p>

          <h2
            id="skills-heading"
            className="mb-10 font-alan text-3xl font-bold
                       text-primary sm:text-4xl"
          >
            My <span className="text-accent">Skills.</span>
          </h2>
        </Reveal>

        {/* Skills grid */}
   
<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
  {skillGroups.map((group, index) => (
    <Reveal
      key={group.title}
      trigger="view"
      direction={skillDirections[index]}
      delay={(index % 3) * 0.15}
      duration={0.8}
      distance={22}
      className="min-w-0 h-full"
    >
      <div className="h-full">
        <SkillCard
          title={group.title}
          skills={group.skills}
        />
      </div>
    </Reveal>
  ))}
</div>

      </section>
    </section>
  );
}

export default About;
