import { useEffect, useState } from "react";

import {
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiGit,
  SiHtml5,
  SiPostgresql,
  SiFigma,SiGithub,  SiVercel,
  SiNodedotjs,
  SiExpress,
} from "react-icons/si";



import { FaCss3Alt } from "react-icons/fa";

// Original multicolour Figma logo
function FigmaColorIcon({ className, style }) {
  return (
    <svg
      viewBox="0 0 38 57"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0"
        fill="#1ABCFE"
      />
      <path
        d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0"
        fill="#0ACF83"
      />
      <path
        d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19Z"
        fill="#FF7262"
      />
      <path
        d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5"
        fill="#F24E1E"
      />
      <path
        d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5"
        fill="#A259FF"
      />
    </svg>
  );
}

const technologies = [
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
    position: "left-[3%] top-[4%]",
    size: 64,
    delay: "0s",
    duration: "6s",
  },
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
    position: "left-[-6%] bottom-[5%]",
    size: 78,
    delay: "-1s",
    duration: "7s",
  },
  {
    name: "HTML5",
    icon: SiHtml5,
    color: "#E34F26",
    position: "left-[43%] top-[7%]",
    size: 54,
    delay: "-2s",
    duration: "6.5s",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    position: "left-[4%] top-[37%]",
    size: 76,
    delay: "-3s",
    duration: "5.5s",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#FFFFFF",
    position: "right-[58%] bottom-[25%]",
    size: 62,
    delay: "-1.5s",
    duration: "7.5s",
  },
  {
    name: "CSS3",
    icon: FaCss3Alt,
    color: "#1572B6",
    position: "left-[43%] top-[36%]",
    size: 54,
    delay: "-2.5s",
    duration: "6s",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    position: "right-[2%] top-[2%]",
    size: 60,
    delay: "-1s",
    duration: "7s",
  },
  {
    name: "Git",
    icon: SiGit,
    color: "#F05032",
    position: "right-[25%] bottom-[25%]",
    size: 54,
    delay: "-2s",
    duration: "6s",
  },
  {
    name: "Figma",
    icon: SiFigma,
    color: "#F24E1E",
    position: "left-[43%] bottom-0",
    size: 54,
    delay: "-3s",
    duration: "7.5s",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#4169E1",
    position: "right-[2%] bottom-[4%]",
    size: 48,
    delay: "-1.5s",
    duration: "6.5s",
  },
  {
  name: "GitHub",
  icon: SiGithub,
  color: "#FFFFFF",
  position: "right-[2%] top-[37%]",
  size: 50,
  delay: "-2.5s",
  duration: "7s",
},
{
  name: "Vercel",
  icon: SiVercel,
  color: "#FFFFFF",
  position: "left-[-28%] top-[20%]",
  size: 54,
  delay: "-1.8s",
  duration: "6.8s",
  visibility: "hidden min-[1800px]:block",
},
{
  name: "Node.js",
  icon: SiNodedotjs,
  color: "#5FA04E",
  position: "left-[-40%] top-[43%]",
  size: 58,
  delay: "-2.2s",
  duration: "7.2s",
  visibility: "hidden min-[1800px]:block",
},
{
  name: "Express",
  icon: SiExpress,
  color: "#FFFFFF",
  position: "left-[-30%] top-[65%]",
  size: 54,
  delay: "-3.2s",
  duration: "6.2s",
  visibility: "hidden min-[1800px]:block",
},
];

// Number of layers that simulate physical thickness
const EXTRUSION_LAYERS = 10;


// Animation timing in milliseconds.
const INITIAL_DELAY = 1200;
const ICON_INTERVAL = 160;
const GROUP_HOLD = 550;
const FADE_DURATION = 500;
const GROUP_PAUSE = 100;
function AnimatedTechIcons() {
  const [activeIcon, setActiveIcon] = useState(null);

 // Tracks icons illuminated by the animation independently of manual selection.
  const [illuminatedIcons, setIlluminatedIcons] = useState([]);

useEffect(() => {
  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (motionPreference.matches) return;

  const timers = [];
  let stopped = false;

  const schedule = (callback, delay) => {
    const timer = setTimeout(() => {
      if (!stopped) callback();
    }, delay);

    timers.push(timer);
  };

  const illuminateGroup = () => {
    if (stopped) return;

    // Exclude icons hidden below the 1800px breakpoint from the sequence.
    const availableIcons = technologies.filter(
      (tech) =>
        !tech.visibility || window.innerWidth >= 1800
    );

    // Shuffle the entire group randomly.
    const shuffledIcons = [...availableIcons];

    for (let i = shuffledIcons.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [shuffledIcons[i], shuffledIcons[randomIndex]] = [
        shuffledIcons[randomIndex],
        shuffledIcons[i],
      ];
    }

    // Illuminate icons one after another.
    shuffledIcons.forEach((tech, index) => {
      schedule(() => {
        setIlluminatedIcons((previous) => [
          ...previous,
          tech.name,
        ]);
      }, index * ICON_INTERVAL);
    });

    const sequenceDuration =
      (shuffledIcons.length - 1) * ICON_INTERVAL;

    // Keep the complete group illuminated briefly.
    schedule(() => {
      setIlluminatedIcons([]);
    }, sequenceDuration + GROUP_HOLD);

    // Restart with a new random order.
    schedule(() => {
      illuminateGroup();
    }, sequenceDuration + GROUP_HOLD + FADE_DURATION + GROUP_PAUSE);
  };

  schedule(illuminateGroup, INITIAL_DELAY);

  return () => {
    stopped = true;
    timers.forEach(clearTimeout);
  };
}, []);
  return (
    <div
      className="relative h-[360px] w-full max-w-[460px]  sm:h-[430px] lg:h-[500px]"
      aria-label="Technologies I work with"
    >
      {technologies.map(
      ({
  name,
  icon: Icon,
  color,
  position,
  size,
  delay,
  duration,
  visibility = "",
}) => {
        const isActive =
  activeIcon === name ||
  illuminatedIcons.includes(name);

          return (
            <div
              key={name}
             className={`absolute ${position} ${visibility} motion-reduce:!animate-none`}
              style={{
                animation: `techFloat ${duration} ease-in-out ${delay} infinite`,
              }}
            >
              <button
                type="button"
                aria-label={name}
                aria-pressed={isActive}
                onClick={() =>
                  setActiveIcon(isActive ? null : name)
                }
                style={{
                  "--brand-color": color,
                  "--icon-size": `${size}px`,
                }}
                className="group relative flex h-20 w-20
                           items-center justify-center
                           bg-transparent
                           focus-visible:rounded-xl
                           focus-visible:outline-2
                           focus-visible:outline-offset-4
                           focus-visible:outline-violet-400"
              >
                {/* Coloured glow */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute
                    inset-0 rounded-full
                    bg-[var(--brand-color)]
                    blur-2xl
                    transition-opacity duration-500
                    group-hover:opacity-30
                    group-focus-visible:opacity-30
                    motion-reduce:transition-none
                    ${isActive ? "opacity-30" : "opacity-0"}`}
                />

                {/* Permanent 3D perspective */}
                <span
                  className="relative flex h-20 w-20
                             items-center justify-center
                             transform-gpu"
                  style={{
                    transform:
                      "perspective(650px) rotateX(18deg) rotateY(-20deg) translateY(-8px) scale(1.1)",
                  }}
                >
                  {/* EXTRUSION: 10 offset copies create thickness */}
                  {Array.from(
                    { length: EXTRUSION_LAYERS },
                    (_, index) => {
                      const depth = EXTRUSION_LAYERS - index;

                      return (
                        <span
                          key={index}
                          aria-hidden="true"
                          className="pointer-events-none absolute"
                          style={{
                            transform: `translate(${depth * 0.7}px, ${depth * 0.9}px)`,
                           color:
  index % 2 === 0
    ? "rgba(18, 27, 48, 0.45)"
    : "rgba(105, 125, 160, 0.12)",
                          }}
                        >
                          <Icon
                            style={{
                              width: "var(--icon-size)",
                              height: "var(--icon-size)",
                            }}
                          />
                        </span>
                      );
                    }
                  )}

                   {/* Subtle offset highlight suggests light reflecting along the glass edge. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute
                               -translate-x-[2px]
                               -translate-y-[2px]
                               text-slate-300/25"
                  >
                    <Icon
                      style={{
                        width: "var(--icon-size)",
                        height: "var(--icon-size)",
                      }}
                    />
                  </span>

                   {/* Default tinted face transitions to the brand colour when illuminated. */}
                  {name === "Figma" ? (
                    <span
                      className="relative block"
                      style={{
                        width: "var(--icon-size)",
                        height: "var(--icon-size)",
                      }}
                    >
                      <SiFigma
                        aria-hidden="true"
                        className={`absolute inset-0 h-full w-full
                          text-blue-900/55
                          transition-opacity duration-500
                          group-hover:opacity-0
                          group-focus-visible:opacity-0
                          ${isActive ? "opacity-0" : "opacity-100"}`}
                      />

                      <FigmaColorIcon
                        className={`absolute inset-0 h-full w-full
                          transition-opacity duration-500
                          group-hover:opacity-100
                          group-focus-visible:opacity-100
                          ${isActive ? "opacity-100" : "opacity-0"}`}
                      />
                    </span>
                  ) : (
                    <Icon
                      aria-hidden="true"
                      className="relative text-blue-900/55
                                 transition-colors duration-500
                                 group-hover:text-[var(--brand-color)]
                                 group-focus-visible:text-[var(--brand-color)]
                                 motion-reduce:transition-none"
                      style={{
                        width: "var(--icon-size)",
                        height: "var(--icon-size)",
                        color: isActive ? color : undefined,
                      }}
                    />
                  )}
                </span>
              </button>
            </div>
          );
        }
      )}
    </div>
  );
}

export default AnimatedTechIcons;