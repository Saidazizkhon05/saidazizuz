import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { AnimatedBackground } from "./AnimatedBackground";
import { Sidebar } from "./Sidebar";
import { MobileDrawer } from "./MobileDrawer";
import { TopBar } from "./TopBar";

export function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative min-h-screen text-text">
      <AnimatedBackground />

      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left"
        style={{
          background:
            "linear-gradient(90deg, var(--color-accent), var(--color-accent-teal), var(--color-accent-blue))",
          scaleX: progressScale,
        }}
      />

      <div className="mx-auto flex w-full max-w-[1280px] gap-0">
        <div className="hidden shrink-0 lg:block">
          <Sidebar />
        </div>

        <main className="min-w-0 flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-9 lg:pt-7">
          <TopBar onMenu={() => setDrawerOpen(true)} />

          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
