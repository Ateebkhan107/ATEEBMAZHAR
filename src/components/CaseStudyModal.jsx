import { motion, AnimatePresence } from "framer-motion";
import { 
  CloseIcon, 
  ExternalLinkIcon, 
  GithubIcon, 
  SparklesIcon, 
  CpuIcon, 
  LayersIcon, 
  ShieldIcon,
  CheckIcon
} from "./Icons";

const CaseStudyModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.35 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0e15] border-2 border-[#00ff66]/40 shadow-[0_0_60px_rgba(0,255,102,0.2)] rounded-sm overflow-hidden z-10 flex flex-col my-auto text-slate-200"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#08090c] border-b border-[#00ff66]/20 shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] animate-pulse" />
              <div>
                <span className="font-mono text-xs text-[#00ff66] font-semibold tracking-widest uppercase">
                  CASE_STUDY // {project.category}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {project.name}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-[#00ff66] transition-colors p-2 rounded-sm bg-white/5 border border-white/10 hover:border-[#00ff66]/40"
              aria-label="Close modal"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8 font-sans">
            {/* Top Quick Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-sm bg-[#11141e] border border-white/5">
              <div>
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                  Contribution
                </span>
                <span className="font-semibold text-sm text-white mt-1 block">
                  {project.role}
                </span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                  Category
                </span>
                <span className="font-semibold text-sm text-[#00ff66] mt-1 block">
                  {project.category}
                </span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                  Verification
                </span>
                <span className="font-semibold text-sm text-slate-200 mt-1 block flex items-center gap-1">
                  <ShieldIcon className="w-3.5 h-3.5 text-[#00ff66]" /> Confirmed Project
                </span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                  Status
                </span>
                <span className="font-semibold text-sm text-[#00ff66] mt-1 block">
                  {project.live ? "Live in Production" : "Active Repository"}
                </span>
              </div>
            </div>

            {/* Overview */}
            <div>
              <h4 className="font-mono text-xs text-[#00ff66] tracking-widest uppercase font-semibold mb-2 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4" /> 01. Executive Overview
              </h4>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>
            </div>

            {/* Engineering Challenges & Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-sm bg-[#090b10] border border-red-500/20">
                <h5 className="font-mono text-xs text-red-400 font-semibold tracking-wider uppercase mb-3 flex items-center gap-2">
                  <CpuIcon className="w-4 h-4" /> Key Engineering Challenges
                </h5>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.challenges?.map((ch, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5 font-mono">▸</span>
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-sm bg-[#090b10] border border-[#00ff66]/20">
                <h5 className="font-mono text-xs text-[#00ff66] font-semibold tracking-wider uppercase mb-3 flex items-center gap-2">
                  <LayersIcon className="w-4 h-4" /> Architectural Solution
                </h5>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Core Features */}
            <div>
              <h4 className="font-mono text-xs text-[#00ff66] tracking-widest uppercase font-semibold mb-3">
                02. Implemented Capabilities & Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features?.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#11141e] border border-white/5 rounded-sm flex items-start gap-2.5"
                  >
                    <CheckIcon className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-mono text-xs text-[#00ff66] tracking-widest uppercase font-semibold mb-3">
                03. Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-sm bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] font-mono text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 bg-[#08090c] border-t border-[#00ff66]/20 flex flex-wrap items-center justify-between gap-4 shrink-0">
            <div className="text-xs font-mono text-slate-400">
              Ateeb Mazhar Portfolio // Architecture Dossier
            </div>
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00ff66]/40 font-mono text-xs text-slate-200 transition-colors flex items-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-sm bg-[#00ff66] hover:bg-[#33ff85] text-black font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,255,102,0.3)] flex items-center gap-2"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLinkIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CaseStudyModal;
