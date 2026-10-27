import { useState } from "react";
import { NavLink } from "react-router";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      {/* Identity and mobile menu button */}
      <div className="flex items-center justify-between lg:block">
        <div>
          <h1 className="font-alan text-3xl font-bold text-gray-100">
            Dela<span className="text-violet-500">.</span>
          </h1>

          <p className="mt-2 font-sora text-sm text-gray-300">
            Front-End Developer
          </p>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="text-2xl text-gray-100 lg:hidden"
        >
          {isOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {/* Desktop navigation */}
      <nav aria-label="Desktop navigation" className="mt-16 hidden lg:block">
        <ul className="flex flex-col gap-6">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `font-alan text-xs tracking-widest transition-colors ${
                    isActive
                      ? "text-violet-500"
                      : "text-gray-400 hover:text-gray-100"
                  }`
                }
              >
                {link.name.toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile navigation */}
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`${isOpen ? "block" : "hidden"} mt-8 lg:hidden`}
      >
        <ul className="flex flex-col gap-6">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `font-alan text-sm tracking-widest transition-colors ${
                    isActive
                      ? "text-violet-500"
                      : "text-gray-400 hover:text-gray-100"
                  }`
                }
              >
                {link.name.toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;