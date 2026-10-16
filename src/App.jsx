import { MotionConfig } from "framer-motion";
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));
import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  Navbar,
  Hero,
  About,
  Works,
  Experience,
  Tech,
  Contact,
  Footer,
  CommandPalette,
  InteractiveTerminal,
  ResumeModal,
  CustomCursor,
} from "./components";

const App = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Global keyboard shortcuts (Cmd+K, Ctrl+K, `)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "`" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <div className="relative z-0 bg-[#08090c] text-slate-100 min-h-screen selection:bg-[#00ff66] selection:text-black">
        {/* Background Ambient Stars Field (Fixed behind all content) */}
        <Suspense fallback={null}><StarsCanvas /></Suspense>

        {/* Sleek Custom Cyber Cursor */}
        <CustomCursor />

        {/* Global Navigation Bar */}
        <Navbar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Semantic Main Content Container (z-10 in front of background) */}
        <main className="relative z-10 w-full overflow-hidden">
          {/* 1. Hero Section */}
          <Hero
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onOpenResume={() => setIsResumeOpen(true)}
          />

          {/* 2. About Me Section */}
          <About />

          {/* 3. Featured Projects (Flagship) */}
          <Works />

          {/* 4. Career Experience Timeline */}
          <Experience />

          {/* 5. Technology Constellation */}
          <Tech />

          {/* 6. Contact & Holographic Telemetry */}
          <Contact />

          {/* Footer */}
          <Footer />
        </main>

        {/* Modals & Overlays */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <InteractiveTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
        />

        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </BrowserRouter>
    </MotionConfig>
  );
};

export default App;
