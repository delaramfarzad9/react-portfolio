
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  distance = 16,
  direction = "up",
  trigger = "view",
  className = "",
}) {
  const reduceMotion = useReducedMotion();

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: -distance },
    right: { x: distance },
  };

  const hidden = {
    opacity: 0,
    ...directions[direction],
  };

  const visible = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  const animationProps =
    trigger === "mount"
      ? { animate: visible }
      : {
          whileInView: visible,
          viewport: {
            once: true,
            amount: 0.15,
          },
        };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : hidden}
      {...animationProps}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
