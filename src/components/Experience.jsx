import { useMobileLayout } from "../hooks/usePerformanceMode";
import { useState } from "react";
import { m as motion } from "framer-motion";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { TerminalIcon, CheckIcon } from "./Icons";
import { playKeySound } from "../utils/sound";

const Experience = () => {
  const mobile = useMobileLayout();
  const [filter, setFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: "All Milestones" },
    { id: "ventures", label: "Startups & Ventures" },
    { id: "engineering", label: "Engineering Roles" },
    { id: "education", label: "Education" },
  ];

  const filteredExperiences = experiences.filter((exp) => {
    if (filter === "ventures") return exp.type.includes("Startup") || exp.type.includes("Agency");
    if (filter === "engineering") return exp.title.includes("Developer");
    if (filter === "education") return exp.type.includes("Degree");
    return true;
  });

  return (
    <div className="relative w-full">
      {/* Section Header */}
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-2 mb-2 font-mono text-xs sm:text-sm text-[#00ff66] tracking-[0.2em] uppercase font-semibold">
          <TerminalIcon className="w-4 h-4 text-[#00ff66]" />
          <span>// 03. CAREER TIMELINE</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          {mobile ? "Experience & ventures" : "Verified Trajectory & Ventures"}
        </h2>
        <p className="mt-2 text-slate-400 font-mono text-xs sm:text-sm">
          {mobile ? "Startups, engineering roles, and education." : "// Documented entrepreneurial leadership, technical responsibilities, and academics"}
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="mt-8 flex flex-wrap gap-2 font-mono text-xs">
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => {
              playKeySound();
              setFilter(opt.id);
            }}
            className={`px-3.5 py-1.5 rounded-sm border transition-all ${
              filter === opt.id
                ? "bg-[#00ff66] border-[#00ff66] text-black font-bold shadow-[2px_2px_0px_#fff]"
                : "bg-[#0e121a] border-white/10 text-slate-400 hover:text-white hover:border-[#00ff66]/30"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Timeline List */}
      <div className="experience-list mt-12 space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-6 before:w-0.5 before:bg-[#00ff66]/20">
        {filteredExperiences.map((exp, index) => mobile ? (
          <details className="mobile-disclosure experience-disclosure" key={exp.company_name}>
            <summary>
              <span className="experience-summary">
                <span className="experience-meta"><span>{exp.company_name}</span><span>{exp.date}</span></span>
                <h3>{exp.title}</h3>
              </span>
              <span className="disclosure-mark" aria-hidden="true" />
            </summary>
            <div className="disclosure-content">
              <p className="text-xs text-slate-400 mb-3">{exp.type} · {exp.location}</p>
              <ul className="space-y-2 text-sm text-slate-300 leading-relaxed">
                {exp.points.map((point) => <li key={point} className="flex gap-2"><CheckIcon className="w-4 h-4 shrink-0 text-[#00ff66] mt-1" /><span>{point}</span></li>)}
              </ul>
              <div className="compact-tags mt-3">{exp.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </details>
        ) : (
          <motion.div
            key={index}
            variants={fadeIn("up", "tween", index * 0.1, 0.6)}
            className="relative pl-10 sm:pl-16 group"
          >
            {/* Timeline Node Icon */}
            <div className="absolute left-1 sm:left-4 top-1 w-5 h-5 rounded-full bg-[#08090c] border-2 border-[#00ff66] flex items-center justify-center -translate-x-1/2 group-hover:scale-125 transition-transform duration-200 shadow-[0_0_12px_rgba(0,255,102,0.4)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
            </div>

            {/* Experience Card */}
            <div className="p-6 sm:p-8 rounded-sm bg-[#0d1017] border border-[#00ff66]/20 group-hover:border-[#00ff66]/50 transition-all duration-300 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-4 mb-4">
                <div>
                  <span className="font-mono text-xs text-[#00ff66] font-semibold">
                    {exp.company_name}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mt-0.5">
                    {exp.title}
                  </h3>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className="bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 px-2.5 py-1 rounded-sm block">
                    {exp.date}
                  </span>
                  <span className="text-slate-400 text-[11px] mt-1 block">
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Verified Points */}
              <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                {exp.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5">
                    <CheckIcon className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {exp.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-black/40 border border-white/10 text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const WrappedExperience = SectionWrapper(Experience, "experience");
export default WrappedExperience;
