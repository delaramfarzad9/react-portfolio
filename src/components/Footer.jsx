
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import GlowIconLink from "./GlowIconLink";

function Footer() {
  return (
    <footer className="font-alan text-xs text-secondary">
      {/* Social media icons */}
      <div className="flex items-center gap-4">
        <GlowIconLink
          href="https://github.com/delaramfarzad9"
          label="Visit my GitHub profile"
        >
          <FaGithub size={22} aria-hidden="true" />
        </GlowIconLink>

        <GlowIconLink
          href="https://www.linkedin.com/in/delaram-farzad"
          label="Visit my LinkedIn profile"
        >
          <FaLinkedin size={22} aria-hidden="true" />
        </GlowIconLink>
      </div>

      {/* Copyright */}
      <p className="mt-5 font-space text-xs text-secondary">
        © 2026 Dela
      </p>
    </footer>
  );
}

export default Footer;
