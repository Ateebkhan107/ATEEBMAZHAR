import { createPortal } from "react-dom";
import useDialog from "../hooks/useDialog";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon, TerminalIcon } from "./Icons";
import { personalInfo, projects } from "../constants";
import { playKeySound, playSuccessSound } from "../utils/sound";

const InteractiveTerminal = ({ isOpen, onClose }) => {
  const dialogRef = useDialog(isOpen, onClose);
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "ATEEB MAZHAR OS [Version 2.0.26]\n(c) 2026 Ateeb Mazhar. All rights reserved.\nType 'help' to display available commands.",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandLog, setCommandLog] = useState([]);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [history]);

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setCommandLog((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const newHistory = [...history, { type: "user", text: `ateeb@workstation:~$ ${rawCmd}` }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
  about       - Display background, education, and credentials
  projects    - List verified engineering projects
  skills      - Print primary technology stack
  contact     - Display direct communication channels
  whoami      - Print current active session identity
  clear       - Clear the terminal console buffer
  sudo        - Elevate privileges
  matrix      - Trigger digital rain sequence
  exit        - Close interactive terminal session`,
        });
        break;

      case "about":
        newHistory.push({
          type: "output",
          text: `NAME: ${personalInfo.name}
ROLE: ${personalInfo.title}
EDUCATION: ${personalInfo.degree} @ ${personalInfo.university} (Class of ${personalInfo.graduationYear})
LOCATION: ${personalInfo.location}
VENTURES: Co-Founder @ Prepzii | Founder @ SkaleKraft
PHILOSOPHY: "${personalInfo.headline}"`,
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          text: projects
            .map(
              (p, i) =>
                `[0${i + 1}] ${p.name.toUpperCase()} (${p.category})
     Role: ${p.role}
     Tech: ${p.technologies.join(", ")}
     Info: ${p.shortDescription}`
            )
            .join("\n\n"),
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          text: `CORE TECHNOLOGY MATRIX:
• FRONTEND:   React, Next.js, TypeScript, Tailwind CSS
• BACKEND:    Node.js, Supabase, PostgreSQL
• AI & DATA:  Python, RAG Architecture, LLM Integrations
• MOBILE:     Flutter, Dart
• TOOLS:      Git, GitHub, Vercel`,
        });
        break;

      case "contact":
        newHistory.push({
          type: "output",
          text: `COMMUNICATION CHANNELS:
• Email:    ${personalInfo.email}
• GitHub:   ${personalInfo.github}
• LinkedIn: ${personalInfo.linkedin}
• Location: ${personalInfo.location}`,
        });
        break;

      case "whoami":
        newHistory.push({
          type: "output",
          text: `user@guest-session-42 [AUTHORIZED GUEST INSPECTOR]`,
        });
        break;

      case "sudo":
      case "sudo rm -rf /":
      case "rm -rf /":
        newHistory.push({
          type: "error",
          text: `sudo: Permission denied. Access level 0 required.
Security subsystem prevents destruction of developer workspace.`,
        });
        break;

      case "matrix":
        newHistory.push({
          type: "matrix",
          text: `WAKE UP, NEO... THE MATRIX HAS YOU.
[System initialized in hyper-focus developer state.]`,
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        return;

      default:
        newHistory.push({
          type: "error",
          text: `bash: command not found: ${rawCmd}. Type 'help' for command list.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
    playSuccessSound();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandLog.length > 0) {
        const nextIdx = historyIndex + 1 < commandLog.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(commandLog[commandLog.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandLog[commandLog.length - 1 - nextIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
          ref={dialogRef} role="dialog" aria-modal="true" aria-label="Interactive terminal" tabIndex={-1}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            className="relative w-full max-w-2xl bg-[#08090c] border-2 border-[#00ff66]/60 shadow-[0_0_60px_rgba(0,255,102,0.3)] rounded-sm overflow-hidden z-10 font-mono text-xs sm:text-sm"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1219] border-b border-[#00ff66]/30">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#00ff66]/80 inline-block" />
                <span className="ml-2 text-slate-300 font-semibold text-xs tracking-wider flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-[#00ff66]" />
                  terminal@ateeb-mazhar:~
                </span>
              </div>
              <button
                aria-label="Close interactive terminal"
                onClick={onClose}
                className="text-slate-400 hover:text-[#00ff66] transition-colors p-1"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Output screen */}
            <div className="h-[360px] overflow-y-auto p-4 space-y-3 bg-[#08090c]/95 scanline-overlay text-slate-300">
              {history.map((item, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {item.type === "user" && (
                    <span className="text-[#00ff66] font-semibold">{item.text}</span>
                  )}
                  {item.type === "system" && (
                    <span className="text-slate-400">{item.text}</span>
                  )}
                  {item.type === "output" && (
                    <span className="text-slate-200">{item.text}</span>
                  )}
                  {item.type === "error" && (
                    <span className="text-red-400">{item.text}</span>
                  )}
                  {item.type === "matrix" && (
                    <span className="text-[#00ff66] glow-text font-bold">{item.text}</span>
                  )}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Prompt input */}
            <div className="flex items-center px-4 py-3 bg-[#0d1017] border-t border-[#00ff66]/30 gap-2">
              <span className="text-[#00ff66] font-bold">ateeb@sys:~$</span>
              <input
                aria-label="Terminal command"
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  playKeySound();
                }}
                onKeyDown={handleKeyDown}
                placeholder="type a command (try 'help')..."
                className="w-full bg-transparent text-[#00ff66] focus:outline-none placeholder:text-slate-600 font-mono"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>, document.body
  );
};

export default InteractiveTerminal;
