import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen bg-blue-950 lg:flex">

      {/* Desktop sidebar */}
   <aside
  className="relative hidden lg:sticky lg:top-0 lg:flex  lg:h-screen lg:w-64 lg:shrink-0
             lg:flex-col lg:justify-between p-8"
>
  {/* Gradient border */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute right-0 top-0  h-full w-px  bg-gradient-to-b
               from-cyan-400/40    via-violet-500/60  to-pink-400/40"
  />
        <Navbar />
        <Footer />
      </aside>

      {/* Mobile and tablet layout */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">

        <div className="lg:hidden p-6">
          <Navbar />
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-10 lg:p-16">
          <Outlet />
        </main>

        {/* Mobile footer */}
        <div className="lg:hidden p-6">
          <Footer />
        </div>

      </div>
    </div>
  );
}

export default MainLayout;