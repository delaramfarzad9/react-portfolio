import { FaGithub, FaLinkedin } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="font-alan text-xs text-gray-300">
      <div className="flex items-center gap-5">
        <a
          href="https://github.com/delaramfarzad9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="text-xl transition-all duration-300 hover:-translate-y-1 hover:text-violet-500"
        >
          <FaGithub aria-hidden="true" />
        </a>

        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="text-xl transition-all duration-300 hover:-translate-y-1 hover:text-violet-500"
        >
          <FaLinkedin aria-hidden="true" />
        </a>
      </div>

      <p className="mt-5 font-space">© 2026 Dela</p>
    </footer>
  );
}

export default Footer;