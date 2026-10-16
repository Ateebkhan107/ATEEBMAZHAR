import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CommandIcon, 
  CloseIcon, 
  SparklesIcon,
  CheckIcon
} from "./Icons";
import { personalInfo } from "../constants";
import { setSoundEnabled, getSoundEnabled, playKeySound, playSuccessSound } from "../utils/sound";

const CommandPalette = ({ isOpen, onClose, onOpenTerminal, onOpenResume }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [soundActive, setSoundActive] = useState(getSoundEnabled());
  const inputRef = useRef(null);

  const commands = [
    {
      group: "Navigation",
      items: [
        { id: "hero", label: "Jump to Top // Hero", action: () => scrollToSection("hero") },
        { id: "about", label: "Jump to // About Me", action: () => scrollToSection("about") },
        { id: "projects", label: "Jump to // Featured Projects", action: () => scrollToSection("projects") },
        { id: "experience", label: "Jump to // Experience Timeline", action: () => scrollToSection("experience") },
        { id: "tech", label: "Jump to // Technologies", action: () => scrollToSection("tech") },
        { id: "contact", label: "Jump to // Contact & Telemetry", action: () => scrollToSection("contact") },
      ],
    },
    {
      group: "Flagship Projects",
      items: [
        { id: "prepzii", label: "Explore Prepzii (EdTech Flagship)", action: () => scrollToSection("project-prepzii") },
        { id: "caseflow", label: "Explore CaseFlow (AI/RAG LegalTech)", action: () => scrollToSection("project-caseflow") },
        { id: "skalekraft", label: "Explore SkaleKraft.in (Digital Agency)", action: () => window.open("https://skalekraft.in", "_blank") },
        { id: "flamzi", label: "Explore Flamzi (Flutter Mobile App)", action: () => scrollToSection("project-flamzi") },
      ],
    },
    {
      group: "Actions & Links",
      items: [
        {
          id: "resume",
          label: "View / Download Resume",
          action: () => {
            if (onOpenResume) onOpenResume();
            else window.open("/resume.pdf", "_blank");
          },
        },
        {
          id: "terminal",
          label: "Launch Interactive Terminal CLI",
          action: () => {
            onClose();
            if (onOpenTerminal) onOpenTerminal();
          },
        },
        {
          id: "github",
          label: "Open GitHub Profile (@ateebmazhar)",
          action: () => window.open(personalInfo.github, "_blank"),
        },
        {
          id: "linkedin",
          label: "Open LinkedIn Profile",
          action: () => window.open(personalInfo.linkedin, "_blank"),
        },
        {
          id: "copy-email",
          label: "Copy Email to Clipboard",
          action: () => {
            navigator.clipboard.writeText(personalInfo.email);
            setCopied(true);
            playSuccessSound();
            setTimeout(() => setCopied(false), 2000);
          },
        },
        {
          id: "toggle-sound",
          label: `Sound FX: ${soundActive ? "Mute Synthesizer" : "Enable Synthesizer"}`,
          action: () => {
            const next = !soundActive;
            setSoundEnabled(next);
            setSoundActive(next);
            if (next) playSuccessSound();
          },
        },
      ],
    },
  ];

  const scrollToSection = (id) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredCommands = commands
    .map((grp) => ({
      ...grp,
      items: grp.items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((grp) => grp.items.length > 0);

  const flatList = filteredCommands.flatMap((grp) => grp.items);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setQuery("");
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (flatList.length || 1));
      playKeySound();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatList.length) % (flatList.length || 1));
      playKeySound();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flatList[selectedIndex]) {
        playSuccessSound();
        flatList[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-xl bg-[#0c0e14] border-2 border-[#00ff66]/40 shadow-[0_0_50px_rgba(0,255,102,0.25)] rounded-sm overflow-hidden z-10"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#08090c] border-b border-[#00ff66]/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] animate-pulse" />
                <span className="font-mono text-xs text-[#00ff66] tracking-wider font-semibold">
                  COMMAND_PALETTE // ATEEB.SYS
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block font-mono text-[11px] text-slate-400">
                  ESC to close
                </span>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-[#00ff66] transition-colors p-1"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="relative px-4 py-3 border-b border-[#00ff66]/15 flex items-center gap-3 bg-[#0f121a]">
              <CommandIcon className="w-5 h-5 text-[#00ff66]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                  playKeySound();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search sections..."
                className="w-full bg-transparent font-mono text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
              {copied && (
                <span className="font-mono text-xs text-[#00ff66] bg-[#00ff66]/10 px-2 py-1 border border-[#00ff66]/30 rounded-sm flex items-center gap-1">
                  <CheckIcon className="w-3 h-3" /> Copied!
                </span>
              )}
            </div>

            {/* Results */}
            <div className="max-h-[340px] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center font-mono text-sm text-slate-400">
                  No matching commands found.
                </div>
              ) : (
                filteredCommands.map((grp) => (
                  <div key={grp.group} className="mb-3">
                    <div className="px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#00ff66]/70">
                      {grp.group}
                    </div>
                    <div className="space-y-1">
                      {grp.items.map((item) => {
                        const globalIndex = flatList.findIndex((i) => i.id === item.id);
                        const isSelected = globalIndex === selectedIndex;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              playSuccessSound();
                              item.action();
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm font-mono text-xs text-left transition-all ${
                              isSelected
                                ? "bg-[#00ff66]/15 text-[#00ff66] border-l-2 border-[#00ff66] translate-x-1"
                                : "text-slate-300 hover:bg-white/5"
                            }`}
                          >
                            <span>{item.label}</span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                              [EXEC]
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-[#08090c] border-t border-[#00ff66]/20 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-4">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
              <div className="text-[#00ff66]/80 flex items-center gap-1.5">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span>v2.0 • Cyber Edition</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
