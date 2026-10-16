import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { PrepziiMockup } from "./mockups/PrepziiMockup";
import { CaseFlowMockup } from "./mockups/CaseFlowMockup";
import { SkaleKraftMockup } from "./mockups/SkaleKraftMockup";
import { FlamziMockup } from "./mockups/FlamziMockup";
import CaseStudyModal from "./CaseStudyModal";
import { 
  GithubIcon, 
  ExternalLinkIcon, 
  SparklesIcon, 
  CheckIcon,
  TerminalIcon
} from "./Icons";
import { playSuccessSound } from "../utils/sound";

const Works = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const renderMockup = (id) => {
    switch (id) {
      case "prepzii":
        return <PrepziiMockup />;
      case "caseflow":
        return <CaseFlowMockup />;
      case "skalekraft":
        return <SkaleKraftMockup />;
      case "flamzi":
        return <FlamziMockup />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full">
      {/* Section Header */}
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-2 mb-2 font-mono text-xs sm:text-sm text-[#00ff66] tracking-[0.2em] uppercase font-semibold">
          <TerminalIcon className="w-4 h-4 text-[#00ff66]" />
          <span>// 02. FEATURED PROJECTS</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Flagship Architectures &amp; Products
        </h2>
        <p className="mt-2 text-slate-400 font-mono text-xs sm:text-sm">
          // Large editorial showcases with real architectures and verified implementations
        </p>
      </motion.div>

      {/* Projects Stack */}
      <div className="mt-14 space-y-24">
        {projects.map((project, index) => {
          const isFlagship = project.id === "prepzii";
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              id={`project-${project.id}`}
              variants={fadeIn("up", "spring", 0.15 * index, 0.75)}
              className={`p-6 sm:p-10 rounded-sm bg-[#0a0c13] border-2 ${
                isFlagship ? "border-[#00ff66]/50 shadow-[0_0_50px_rgba(0,255,102,0.15)]" : "border-[#00ff66]/20"
              } transition-all duration-300`}
            >
              {/* Project Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#00ff66] font-bold">
                    [PROJECT 0{index + 1}]
                  </span>
                  <span className="font-mono text-[11px] bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30 px-2.5 py-0.5 rounded-sm font-semibold uppercase">
                    {project.badge}
                  </span>
                </div>

                <div className="font-mono text-xs text-slate-400 flex items-center gap-2">
                  <span className="text-white font-medium">{project.role}</span>
                  <span>•</span>
                  <span>{project.category}</span>
                </div>
              </div>

              {/* Editorial Layout */}
              <div className={`grid grid-cols-1 ${project.id === "flamzi" ? "lg:grid-cols-12" : "lg:grid-cols-12"} gap-8 sm:gap-12 items-center`}>
                
                {/* Left Description Column */}
                <div className={`space-y-5 ${project.id === "flamzi" ? "lg:col-span-7" : "lg:col-span-5"} ${!isEven && project.id !== "flamzi" ? "lg:order-2" : ""}`}>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
                    {project.name}
                  </h3>

                  <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 pt-1">
                    <span className="font-mono text-xs text-[#00ff66] font-semibold uppercase tracking-wider block">
                      Key Highlights &amp; Capabilities:
                    </span>
                    <ul className="space-y-1.5 font-sans text-xs sm:text-sm text-slate-300">
                      {project.features.slice(0, 4).map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-xs px-2.5 py-1 rounded-sm bg-[#11141f] border border-[#00ff66]/20 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-3 font-mono text-xs">
                    <button
                      onClick={() => {
                        playSuccessSound();
                        setSelectedCaseStudy(project);
                      }}
                      className="px-5 py-3 bg-[#00ff66] hover:bg-[#33ff85] text-black font-bold rounded-sm transition-all shadow-[3px_3px_0px_#fff] hover:shadow-[1px_1px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center gap-1.5"
                    >
                      <SparklesIcon className="w-4 h-4" />
                      <span>View Case Study</span>
                    </button>

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-[#11141e] hover:bg-[#181d2a] border border-[#00ff66]/40 hover:border-[#00ff66] text-white font-semibold rounded-sm transition-colors flex items-center gap-1.5"
                      >
                        <span>Live Site</span>
                        <ExternalLinkIcon className="w-3.5 h-3.5 text-[#00ff66]" />
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#11141e] hover:bg-[#181d2a] border border-white/10 hover:border-[#00ff66]/40 text-slate-300 hover:text-[#00ff66] rounded-sm transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Interactive Mockup Column */}
                <div className={`${project.id === "flamzi" ? "lg:col-span-5" : "lg:col-span-7"} ${!isEven && project.id !== "flamzi" ? "lg:order-1" : ""}`}>
                  {renderMockup(project.id) || (
                    <div className="p-8 bg-[#090b10] border border-white/10 rounded-sm text-center font-mono text-xs text-slate-400">
                      [Interactive Preview Dossier]
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}
    </div>
  );
};

const WrappedWorks = SectionWrapper(Works, "projects");
export default WrappedWorks;
