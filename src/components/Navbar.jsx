
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Detect scrolling for the compact glass navbar.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close the menu when navigating to another page.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  function closeMenu(restoreFocus = true) {
    setIsOpen(false);

    if (restoreFocus) {
      menuButtonRef.current?.focus({
        preventScroll: true,
      });
    }
  }

  function openMenu(e) {
    setIsOpen(true);

    // Move keyboard focus into the opened menu.
    if (e.detail === 0) {
      requestAnimationFrame(() => {
        firstLinkRef.current?.focus({
          preventScroll: true,
        });
      });
    }
  }

  // Prevent background scrolling while menu is open.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Close mobile menu when switching to desktop.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    function handleResize(e) {
      if (e.matches) {
        setIsOpen(false);
      }
    }

    media.addEventListener("change", handleResize);

    return () => {
      media.removeEventListener("change", handleResize);
    };
  }, []);

  // Keyboard accessibility.
  function handleKeyDown(e) {
    if (!isOpen) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key !== "Tab") return;

    const header = headerRef.current;
    if (!header) return;

    const focusableElements = Array.from(
      header.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => element.getClientRects().length > 0);

    if (!focusableElements.length) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const navLinkStyles = (isActive) => `
    group/link relative inline-flex w-fit items-center
    font-alan text-xs tracking-widest
    transition-colors duration-300
    ${
      isActive
        ? "text-accent"
        : "text-subtle hover:text-primary"
    }
  `;

  return (
    <>
      {/* Reserve space for the fixed mobile navbar */}
      <div
        aria-hidden="true"
        className={`
          transition-[height] duration-300 ease-in-out
          lg:hidden
          ${isScrolled ? "h-[68px]" : "h-[92px]"}
        `}
      />

      <header
        ref={headerRef}
        onKeyDown={handleKeyDown}
        className={`
          fixed inset-x-0 top-0 z-50
          transition-shadow duration-300

          lg:relative lg:inset-auto lg:z-auto
          lg:shadow-none

          ${
            isScrolled
              ? "shadow-lg shadow-black/5 dark:shadow-black/20"
              : "shadow-none"
          }
        `}
      >
        {/* Mobile header / Desktop branding */}
        <div
          className={`
            relative z-50
            flex items-center justify-between
            px-4

            transition-[padding,background-color,backdrop-filter]
            duration-300 ease-in-out

            lg:block lg:bg-transparent lg:p-0
            lg:backdrop-blur-none

            ${
              isScrolled
                ? `
                  bg-page/85 py-2
                  backdrop-blur-xl
                  border-b border-theme-border/50
                  lg:border-0
                `
                : `
                  bg-page py-4
                `
            }
          `}
        >
          {/* Branding */}
          <div>
            <Link
              to="/"
              aria-label="Dela — Go to homepage"
              onClick={() => setIsOpen(false)}
              className="
                inline-block rounded-lg
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-accent
              "
            >
              <h1
                className={`
                  font-arch font-bold text-primary
                  transition-all duration-300
                  lg:text-3xl

                  ${
                    isScrolled
                      ? "text-2xl"
                      : "text-3xl"
                  }
                `}
              >
                <span
                  className="
                    text-accent text-2xl
                  "
                >
                  {"<"}
                </span>

                Dela{" "}

                <span
                  className="
                    text-accent text-2xl
                  "
                >
                  {"/>"}
                </span>
              </h1>
            </Link>

            <p
              className={`
                font-alan text-secondary
                transition-all duration-300
                lg:mt-2 lg:text-sm

                ${
                  isScrolled
                    ? "mt-0.5 text-xs"
                    : "mt-2 text-sm"
                }
              `}
            >
              Front-End Developer
            </p>
          </div>

          {/* Mobile hamburger / close button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={(e) => {
              if (isOpen) {
                closeMenu();
              } else {
                openMenu(e);
              }
            }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="
              flex h-11 w-11 cursor-pointer
              items-center justify-center
              rounded-lg text-2xl text-primary
              transition-colors duration-300

              hover:bg-hover-surface
              hover:text-accent

              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-accent

              lg:hidden
            "
          >
            {isOpen ? (
              <HiX aria-hidden="true" />
            ) : (
              <HiOutlineMenuAlt3 aria-hidden="true" />
            )}
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
                        className={`
                          absolute -bottom-1 left-0 h-px
                          bg-accent
                          transition-all duration-300

                          ${
                            isActive
                              ? "w-full opacity-100"
                              : `
                                w-0 opacity-0
                                group-hover/link:w-full
                                group-hover/link:opacity-60
                              `
                          }
                        `}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <>
            {/* Dark blurred backdrop */}
            <div
              aria-hidden="true"
              onClick={() => closeMenu()}
              className="
                fixed inset-0 z-40
                bg-slate-950/45 backdrop-blur-sm
                dark:bg-black/60
                lg:hidden
              "
            />

            {/* Mobile navigation panel */}
            <nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="
                absolute inset-x-0 top-full z-50
                max-h-[calc(100dvh-6rem)]
                overflow-y-auto

                rounded-b-2xl
                border-b border-theme-border
                bg-page

                px-4 pb-5 pt-2

                shadow-2xl shadow-slate-950/20
                dark:shadow-black/40

                lg:hidden
              "
            >
              {/* Navigation links */}
              <ul className="flex flex-col gap-1">
                {links.map((link, index) => (
                  <li key={link.path}>
                    <NavLink
                      ref={
                        index === 0
                          ? firstLinkRef
                          : undefined
                      }
                      to={link.path}
                      end={link.path === "/"}
                      onClick={() => closeMenu(false)}
                      className={({ isActive }) => `
                        flex min-h-12 w-full items-center
                        rounded-xl px-4 py-3

                        font-alan text-sm tracking-widest
                        transition-colors duration-300

                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-accent

                        ${
                          isActive
                            ? `
                              bg-indigo-50 text-indigo-700
                              dark:bg-violet-500/15
                              dark:text-violet-300
                            `
                            : `
                              text-secondary
                              hover:bg-hover-surface
                              hover:text-primary
                            `
                        }
                      `}
                    >
                      {link.name.toUpperCase()}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Contact CTA */}
              <NavLink
                to="/contact"
                onClick={() => closeMenu(false)}
                className="
                  mt-5 flex min-h-12 w-full
                  items-center justify-center gap-2

                  rounded-xl bg-indigo-700
                  px-5 py-3

                  font-alan text-sm font-semibold
                  text-white

                  transition-colors duration-300

                  hover:bg-indigo-800

                  dark:bg-violet-500
                  dark:hover:bg-violet-600

                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-accent
                "
              >
                Let's Connect

                <FiArrowUpRight aria-hidden="true" />
              </NavLink>

              {/* Appearance settings */}
              <div
                className="
                  mt-5 flex items-center
                  justify-between gap-4

                  border-t border-theme-border pt-5
                "
              >
                <span className="font-sora text-sm text-secondary">
                  Appearance
                </span>

                <ThemeToggle />
              </div>
            </nav>
          </>
        )}
      </header>
    </>
  );
}

export default Navbar;
