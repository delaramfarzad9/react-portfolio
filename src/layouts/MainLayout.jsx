
import { Outlet } from "react-router";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";
import ScrollToTop from "../components/ScrollToTop";
import BackToTop from "../components/BackToTop";
import Reveal from "../animations/Reveal";
import SidebarReveal from "../animations/SidebarReveal";

function MainLayout() {
  return (
    <div
      className="min-h-screen bg-page text-primary
                 transition-colors duration-300 xl:flex"
    >
      <ScrollToTop />

      {/* Desktop sidebar — 1280px and above */}
      <aside
        className="relative hidden p-8
                   xl:sticky xl:top-0 xl:flex xl:h-screen
                   xl:w-60 xl:shrink-0 xl:flex-col
                   xl:justify-between 2xl:w-64"
      >
        {/* Gradient border */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0
                     h-full w-px bg-gradient-to-b
                     from-cyan-400/40 via-violet-500/60
                     to-pink-400/40"
        />

        {/* Animated desktop navigation */}
        <SidebarReveal>
          <Navbar />
        </SidebarReveal>

        {/* Desktop theme toggle and footer */}
        <Reveal
          trigger="mount"
          delay={0.45}
          duration={0.8}
          distance={12}
        >
          <div className="flex flex-col items-start gap-5">
            <ThemeToggle />
            <Footer />
          </div>
        </Reveal>
      </aside>

      {/* Main content layout */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        {/* Mobile/tablet navigation with integrated breadcrumbs */}
        <div className="relative z-50 xl:hidden">
          <Navbar />
        </div>

        {/* Page content */}
        <main className="min-w-0 flex-1 p-6 md:p-10 xl:p-16">
          <Outlet />
        </main>

        {/* Mobile/tablet footer */}
        <div className="p-6 xl:hidden">
          <Reveal
            trigger="view"
            duration={0.75}
            distance={12}
          >
            <div className="flex flex-col items-center gap-6">
              <Footer />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Floating Back to Top button */}
      <BackToTop />
    </div>
  );
}

export default MainLayout;
