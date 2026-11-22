
import { Link, useLocation } from "react-router";
import { FiChevronRight } from "react-icons/fi";

const pageNames = {
  "/about": "About",
  "/projects": "Projects",
  "/contact": "Contact",
};

function Breadcrumbs() {
  const { pathname } = useLocation();
  const currentPage = pageNames[pathname];

  if (!currentPage) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 font-sora text-xs">
        <li>
          <Link
            to="/"
            className="text-subtle transition-colors
                       hover:text-accent
                       focus-visible:outline-2
                       focus-visible:outline-offset-2
                       focus-visible:outline-accent"
          >
            Home
          </Link>
        </li>

        <li aria-hidden="true">
          <FiChevronRight className="text-subtle/60" />
        </li>

        <li
          aria-current="page"
          className="font-medium text-accent"
        >
          {currentPage}
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
