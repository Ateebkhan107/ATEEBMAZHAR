import { LazyMotion, MotionConfig } from "framer-motion";
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));
import { lazy, Suspense, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import DeferredScene from "./components/DeferredScene";
import { PerformanceContext, useDeviceEffects } from "./hooks/usePerformanceMode";
const Works = lazy(() => import("./components/Works"));
const Experience = lazy(() => import("./components/Experience"));
const Tech = lazy(() => import("./components/Tech"));
const Contact = lazy(() => import("./components/Contact"));
const CommandPalette = lazy(() => import("./components/CommandPalette"));
const InteractiveTerminal = lazy(() => import("./components/InteractiveTerminal"));
const ResumeModal = lazy(() => import("./components/ResumeModal"));
const CustomCursor = lazy(() => import("./components/CustomCursor"));
const loadMotionFeatures = () => import("./utils/motionFeatures").then((m) => m.default);
const sectionFallback = (id) => <section id={id} className="section-placeholder" aria-label={`Loading ${id}`} />;


const App = () => {
  const enhanced = useDeviceEffects();
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
    <PerformanceContext.Provider value={enhanced}>
    <MotionConfig reducedMotion={enhanced ? "user" : "always"}>
    <LazyMotion features={loadMotionFeatures} strict>

      <div data-effects={enhanced ? "full" : "light"} className="relative z-0 bg-[#08090c] text-slate-100 min-h-screen selection:bg-[#00ff66] selection:text-black">
        {/* Background Ambient Stars Field (Fixed behind all content) */}
        {enhanced && <DeferredScene scene={StarsCanvas} className="fixed inset-0 pointer-events-none" />}

        {/* Sleek Custom Cyber Cursor */}
        {enhanced && <Suspense fallback={null}><CustomCursor /></Suspense>}

        <div id="nav-sentinel" className="absolute top-0 h-10 w-px" aria-hidden="true" />
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
          <Suspense fallback={sectionFallback("projects")}> <Works /> </Suspense>

          {/* 4. Career Experience Timeline */}
          <Suspense fallback={sectionFallback("experience")}> <Experience /> </Suspense>

          {/* 5. Technology Constellation */}
          <Suspense fallback={sectionFallback("tech")}> <Tech /> </Suspense>

          {/* 6. Contact & Holographic Telemetry */}
          <Suspense fallback={sectionFallback("contact")}> <Contact /> </Suspense>

          {/* Footer */}
          <Footer />
        </main>

        {/* Modals & Overlays */}
        {isCommandPaletteOpen && <Suspense fallback={<div role="status" className="overlay-loading">Opening…</div>}> <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        /> </Suspense>}

        {isTerminalOpen && <Suspense fallback={<div role="status" className="overlay-loading">Opening…</div>}> <InteractiveTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
        /> </Suspense>}

        {isResumeOpen && <Suspense fallback={<div role="status" className="overlay-loading">Opening…</div>}> <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        /> </Suspense>}
      </div>

    </LazyMotion>
    </MotionConfig>
    </PerformanceContext.Provider>
  );
};

export default App;
