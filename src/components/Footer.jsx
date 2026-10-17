import { GithubIcon, LinkedInIcon, ExternalLinkIcon } from "./Icons";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <footer className="w-full bg-[#050609] border-t border-[#00ff66]/20 py-12 px-6 sm:px-16 font-mono text-xs text-slate-400 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Left: Brand Identity */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-white text-lg tracking-tight">
              ATEEB <span className="text-[#00ff66]">MAZHAR</span>
            </span>
            <span className="text-[10px] bg-[#00ff66]/10 text-[#00ff66] px-2 py-0.5 rounded-sm border border-[#00ff66]/20">
              v2.0.26
            </span>
          </div>
          <p className="font-sans text-xs text-slate-400 max-w-md leading-relaxed">
            Software Engineer &amp; Co-Founder @ Prepzii. Designing intelligent architectures, full-stack systems, and memorable digital experiences.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-wrap items-center gap-6 text-slate-300">
          <a
            href="https://github.com/ateebmazhar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00ff66] transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/ateebmazhar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00ff66] transition-colors flex items-center gap-1.5"
          >
            <LinkedInIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://skalekraft.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00ff66] transition-colors flex items-center gap-1"
          >
            <span>SkaleKraft</span>
            <ExternalLinkIcon className="w-3 h-3 text-[#00ff66]" />
          </a>

          <button
            onClick={scrollToTop}
            className="hover:text-[#00ff66] transition-colors flex items-center gap-1 text-[#00ff66]"
          >
            <span>[ Back to Top ↑ ]</span>
          </button>
        </div>

      </div>

      {/* Bottom Telemetry Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
          <span>KOLKATA // TECHNO INDIA UNIVERSITY &apos;27</span>
        </div>
        <div>
          Designed &amp; Engineered with React 19, Three.js, Tailwind CSS &amp; Framer Motion.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
