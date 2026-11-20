import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Let the Projects page handle targeted project navigation.
    if (pathname === "/projects" && new URLSearchParams(search).has("project")) {
      return;
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, search]);

  return null;
}

export default ScrollToTop;