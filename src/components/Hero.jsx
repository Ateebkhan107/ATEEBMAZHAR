import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { personalInfo } from "../constants";
import HeroCoreCanvas from "./canvas/HeroCore";
import { 
  GithubIcon, 
  LinkedInIcon, 
  DownloadIcon, 
  ArrowRightIcon, 
  TerminalIcon, 
  CommandIcon
} from "./Icons";
import { playKeySound, playSuccessSound } from "../utils/sound";

const TERMINAL_LOGS = [
  "> initializing developer profile...",
  "> loading projects: Prepzii, CaseFlow, SkaleKraft, Flamzi...",
  "> connecting ideas to scalable reality...",
  "> system ready. Status: Co-Founder @ Prepzii | CSE @ Techno India '27",
];

const Hero = ({ onOpenCommandPalette, onOpenTerminal, onOpenResume }) => {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const isTypingDone = lineIdx >= TERMINAL_LOGS.length;

  useEffect(() => {
    if (lineIdx >= TERMINAL_LOGS.length) {
      return;
    }

    const currentLine = TERMINAL_LOGS[lineIdx];

    if (charIdx < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs((prev) => {
          const next = [...prev];
          next[lineIdx] = currentLine.slice(0, charIdx + 1);
          return next;
        });
        setCharIdx((c) => c + 1);
        // Play occasional key sound
        if (charIdx % 3 === 0) playKeySound();
      }, 26);
      return () => clearTimeout(timer);
    }

    const lineBreakTimer = setTimeout(() => {
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, 320);
    return () => clearTimeout(lineBreakTimer);
  }, [lineIdx, charIdx]);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden cyber-grid-bg">
      {/* Background ambient neon glow gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff66]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className={`${styles.paddingX} max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10`}>
        
        {/* Left Column: Hero Content & Terminal */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Top Status Badges */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] font-mono text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
              <span>SYS_STATUS: OPERATIONAL</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-xs">
              <span>📍 KOLKATA, INDIA</span>
            </div>

            <button
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#00ff66]/15 border border-white/10 hover:border-[#00ff66]/40 text-slate-300 hover:text-[#00ff66] font-mono text-xs transition-colors"
            >
              <CommandIcon className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>⌘K</span>
            </button>
          </motion.div>

          {/* Primary Name Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-[76px] tracking-tight text-white uppercase leading-[1.05]">
              ATEEB <span className="text-[#00ff66] glow-text">MAZHAR</span>
            </h1>

            <p className="mt-3 font-mono text-sm sm:text-lg text-slate-300 font-medium tracking-wide flex items-center gap-2">
              <span className="text-[#00ff66] font-bold">&gt;</span>
              <span>Software Engineer</span>
              <span className="text-[#00ff66]">•</span>
              <span>Full-Stack Developer</span>
              <span className="text-[#00ff66]">•</span>
              <span>AI Builder</span>
            </p>
          </motion.div>

          {/* Personal Value Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-slate-300 font-sans text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            "I build intelligent products, scalable applications, and digital experiences that solve real problems."
          </motion.p>

          {/* Animated Developer Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 w-full max-w-2xl bg-[#090b10] border-2 border-[#00ff66]/30 shadow-[0_0_30px_rgba(0,255,102,0.12)] rounded-sm overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f131c] border-b border-[#00ff66]/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66]/80" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  dev-session.sh // bash
                </span>
              </div>
              <button
                onClick={onOpenTerminal}
                className="font-mono text-[11px] text-[#00ff66] hover:underline flex items-center gap-1"
              >
                <TerminalIcon className="w-3 h-3" />
                <span>interactive cli</span>
              </button>
            </div>

            {/* Terminal Screen */}
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-[#00ff66] leading-relaxed min-h-[140px] bg-black/60 scanline-overlay">
              {displayedLogs.map((log, idx) => (
                <div key={idx} className="mb-1.5 flex items-start gap-1">
                  <span>{log}</span>
                </div>
              ))}
              {!isTypingDone && (
                <span className="cursor inline-block w-2" />
              )}
              {isTypingDone && (
                <div className="mt-2 text-slate-400 flex items-center gap-2 text-xs">
                  <span className="text-[#00ff66]">●</span>
                  <span>System operational. Explore verified work below.</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            {/* Explore My Work CTA */}
            <a
              href="#projects"
              onClick={() => playSuccessSound()}
              className="px-6 py-3.5 bg-[#00ff66] hover:bg-[#33ff85] text-black font-mono font-bold text-sm tracking-wider rounded-sm transition-all shadow-[4px_4px_0px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_0px_rgba(255,255,255,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center gap-2"
            >
              <span>Explore My Work</span>
              <ArrowRightIcon className="w-4 h-4" />
            </a>

            {/* Download Resume CTA */}
            <button
              onClick={() => {
                playSuccessSound();
                if (onOpenResume) onOpenResume();
                else window.open("/resume.pdf", "_blank");
              }}
              className="px-5 py-3.5 bg-[#11141e] hover:bg-[#181d2a] border border-[#00ff66]/30 hover:border-[#00ff66] text-white font-mono text-sm tracking-wider rounded-sm transition-all flex items-center gap-2"
            >
              <DownloadIcon className="w-4 h-4 text-[#00ff66]" />
              <span>Resume</span>
            </button>

            {/* GitHub Profile */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-[#11141e] hover:bg-[#181d2a] border border-white/10 hover:border-[#00ff66]/50 text-slate-300 hover:text-[#00ff66] rounded-sm transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            {/* LinkedIn Profile */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-[#11141e] hover:bg-[#181d2a] border border-white/10 hover:border-[#00ff66]/50 text-slate-300 hover:text-[#00ff66] rounded-sm transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </motion.div>

        </div>

        {/* Right Column: 3D Wireframe Cyber Sculpture */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <HeroCoreCanvas />
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
          SCROLL_TO_DISCOVER
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-[#00ff66]/40 flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-[#00ff66]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
