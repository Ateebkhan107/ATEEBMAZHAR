import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon, DownloadIcon } from "./Icons";
import { personalInfo, experiences, technologiesData } from "../constants";

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c0e14] border-2 border-[#00ff66]/40 shadow-[0_0_60px_rgba(0,255,102,0.25)] rounded-sm overflow-hidden z-10 flex flex-col my-auto text-slate-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#08090c] border-b border-[#00ff66]/20 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] animate-pulse" />
              <div>
                <span className="font-mono text-xs text-[#00ff66] font-semibold tracking-widest uppercase">
                  VERIFIED CURRICULUM VITAE // DOSSIER
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {personalInfo.name} — Resume
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download="Ateeb_Mazhar_Resume.pdf"
                className="px-3.5 py-1.5 rounded-sm bg-[#00ff66] hover:bg-[#33ff85] text-black font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-[#00ff66] p-1.5 rounded-sm bg-white/5 border border-white/10"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Document Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6 font-sans text-sm">
            {/* Top Identity Block */}
            <div className="border-b border-white/10 pb-6">
              <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight">
                {personalInfo.name}
              </h2>
              <p className="font-mono text-xs text-[#00ff66] font-semibold mt-1">
                {personalInfo.title}
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-400 font-mono">
                <span>📍 {personalInfo.location}</span>
                <span>✉️ {personalInfo.email}</span>
                <span>🐙 github.com/ateebmazhar</span>
                <span>🔗 linkedin.com/in/ateebmazhar</span>
              </div>
            </div>

            {/* Education */}
            <div>
              <h4 className="font-mono text-xs text-[#00ff66] tracking-widest uppercase font-bold mb-2">
                01. Education & Credentials
              </h4>
              <div className="bg-[#11141e] border border-white/5 p-4 rounded-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-white text-base">
                      {personalInfo.university}
                    </h5>
                    <p className="text-slate-300 text-xs mt-0.5">
                      {personalInfo.degree}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#00ff66] bg-[#00ff66]/10 px-2 py-1 rounded-sm border border-[#00ff66]/20">
                    2023 — 2027
                  </span>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h4 className="font-mono text-xs text-[#00ff66] tracking-widest uppercase font-bold mb-3">
                02. Engineering & Leadership Experience
              </h4>
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="bg-[#11141e] border border-white/5 p-4 rounded-sm">
                    <div className="flex flex-wrap justify-between items-start gap-1">
                      <div>
                        <h5 className="font-bold text-white text-sm">
                          {exp.title}
                        </h5>
                        <p className="font-mono text-xs text-[#00ff66] mt-0.5">
                          {exp.company_name} <span className="text-slate-500">• {exp.type}</span>
                        </p>
                      </div>
                      <span className="font-mono text-xs text-slate-400">
                        {exp.date}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-[#00ff66] font-mono mt-0.5">▸</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-mono text-xs text-[#00ff66] tracking-widest uppercase font-bold mb-3">
                03. Technical Competencies
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {technologiesData.map((techGrp, idx) => (
                  <div key={idx} className="p-3 bg-[#11141e] border border-white/5 rounded-sm">
                    <span className="font-mono text-[11px] text-[#00ff66] uppercase tracking-wider block mb-1">
                      {techGrp.category}
                    </span>
                    <span className="text-xs text-slate-200">
                      {techGrp.items.map((i) => i.name).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
