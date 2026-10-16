import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import { styles } from "../styles";
import { 
  CommandIcon, 
  TerminalIcon, 
  VolumeOnIcon, 
  VolumeMuteIcon, 
  CloseIcon
} from "./Icons";
import { setSoundEnabled, getSoundEnabled, playKeySound, playSuccessSound } from "../utils/sound";

const Navbar = ({ onOpenCommandPalette, onOpenTerminal }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(getSoundEnabled());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundEnabled(next);
    setSoundActive(next);
    if (next) playSuccessSound();
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090c]/90 backdrop-blur-md border-b border-[#00ff66]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          onClick={() => {
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-8 h-8 rounded-sm bg-[#00ff66]/10 border border-[#00ff66]/40 flex items-center justify-center group-hover:border-[#00ff66] transition-colors">
            <span className="font-mono text-sm text-[#00ff66] font-black group-hover:glow-text">
              &gt;_
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-display font-black text-white text-base tracking-tight group-hover:text-[#00ff66] transition-colors">
              ATEEB MAZHAR
            </span>
            <span className="font-mono text-[10px] text-[#00ff66]/80 -mt-1 hidden sm:block">
              software_engineer.sys
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="list-none hidden md:flex flex-row items-center gap-8">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`font-mono text-xs cursor-pointer tracking-wider transition-all duration-200 ${
                active === link.title
                  ? "text-[#00ff66] font-bold border-b-2 border-[#00ff66] pb-0.5"
                  : "text-slate-400 hover:text-[#00ff66]"
              }`}
              onClick={() => {
                playKeySound();
                setActive(link.title);
              }}
            >
              <a href={`#${link.id}`} className="flex items-center gap-1">
                <span className="text-[#00ff66]/60 text-[10px]">// {link.code}.</span>
                <span>{link.title}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Utility Tools (Command Palette, Audio Toggle, Terminal) */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundActive ? "Mute synthesizer sound" : "Enable futuristic sound FX"}
            className={`p-2 rounded-sm border transition-colors ${
              soundActive
                ? "bg-[#00ff66]/15 border-[#00ff66] text-[#00ff66]"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            {soundActive ? (
              <VolumeOnIcon className="w-4 h-4" />
            ) : (
              <VolumeMuteIcon className="w-4 h-4" />
            )}
          </button>

          {/* Interactive Terminal Trigger */}
          <button
            onClick={() => {
              playSuccessSound();
              if (onOpenTerminal) onOpenTerminal();
            }}
            title="Launch Interactive Terminal CLI"
            className="p-2 rounded-sm bg-white/5 hover:bg-[#00ff66]/15 border border-white/10 hover:border-[#00ff66]/40 text-slate-400 hover:text-[#00ff66] transition-colors"
          >
            <TerminalIcon className="w-4 h-4" />
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              playSuccessSound();
              if (onOpenCommandPalette) onOpenCommandPalette();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#11141e] hover:bg-[#181d2a] border border-[#00ff66]/30 hover:border-[#00ff66] text-xs font-mono text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <CommandIcon className="w-3.5 h-3.5 text-[#00ff66]" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] text-slate-400">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleSound}
            className={`p-2 rounded-sm border ${
              soundActive
                ? "bg-[#00ff66]/15 border-[#00ff66] text-[#00ff66]"
                : "bg-white/5 border-white/10 text-slate-400"
            }`}
          >
            {soundActive ? <VolumeOnIcon className="w-4 h-4" /> : <VolumeMuteIcon className="w-4 h-4" />}
          </button>

          <button
            className="p-2 text-[#00ff66] font-mono text-lg bg-[#0e121a] border border-[#00ff66]/30 rounded-sm"
            onClick={() => {
              playKeySound();
              setToggle(!toggle);
            }}
            aria-label="Toggle Navigation"
          >
            {toggle ? <CloseIcon className="w-5 h-5" /> : "[≡]"}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {toggle && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0c13] border-b border-[#00ff66]/30 shadow-2xl p-6 z-50">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className="font-mono text-sm"
                onClick={() => {
                  setToggle(false);
                  setActive(link.title);
                }}
              >
                <a
                  href={`#${link.id}`}
                  className="flex items-center justify-between text-slate-200 hover:text-[#00ff66] py-2 border-b border-white/5"
                >
                  <span>// {link.code}. {link.title}</span>
                  <span className="text-[#00ff66] text-xs font-mono">→</span>
                </a>
              </li>
            ))}

            <li className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setToggle(false);
                  if (onOpenCommandPalette) onOpenCommandPalette();
                }}
                className="w-full py-2.5 rounded-sm bg-[#11141e] border border-[#00ff66]/30 text-[#00ff66] font-mono text-xs flex items-center justify-center gap-2"
              >
                <CommandIcon className="w-4 h-4" />
                <span>Open Command Palette (⌘K)</span>
              </button>

              <button
                onClick={() => {
                  setToggle(false);
                  if (onOpenTerminal) onOpenTerminal();
                }}
                className="w-full py-2.5 rounded-sm bg-white/5 border border-white/10 text-slate-300 font-mono text-xs flex items-center justify-center gap-2"
              >
                <TerminalIcon className="w-4 h-4 text-[#00ff66]" />
                <span>Interactive CLI Terminal</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;