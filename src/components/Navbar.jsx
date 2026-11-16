
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

  const navLinkStyles = (isActive, mobile = false) => `
    group/link relative inline-flex w-fit items-center
    font-alan tracking-widest transition-colors duration-300
    ${mobile ? "text-sm" : "text-xs"}
    ${
      isActive
        ? "text-accent"
        : "text-subtle hover:text-primary"
    }
  `;

  return (
    <header>
      {/* Identity and mobile menu */}
      <div className="flex items-center justify-between lg:block">
        <div>
          <h1 className="font-alan text-3xl font-bold text-primary">
            Dela<span className="text-accent">.</span>
          </h1>

          <p className="mt-2 font-sora text-sm text-secondary">
            Front-End Developer
          </p>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="cursor-pointer rounded-lg p-2
                     text-2xl text-primary
                     transition-colors duration-300
                     hover:bg-hover-surface hover:text-accent
                     focus-visible:outline-2
                     focus-visible:outline-offset-2
                     focus-visible:outline-accent
                     lg:hidden"
        >
          {isOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {/* Desktop navigation */}
      <nav
        aria-label="Desktop navigation"
        className="mt-16 hidden lg:block"
      >
        <ul className="flex flex-col gap-6">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  navLinkStyles(isActive)
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name.toUpperCase()}

                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1 left-0 h-px
                                  bg-accent transition-all duration-300
                                  ${
                                    isActive
                                      ? "w-full opacity-100"
                                      : "w-0 opacity-0 group-hover/link:w-full group-hover/link:opacity-60"
                                  }`}
                    />
                  </>
                )}
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
                  navLinkStyles(isActive, true)
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
