import { useState } from "react";
import { motion } from "framer-motion";
import { technologiesData } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { 
  TerminalIcon, 
  ReactTechIcon, 
  NextTechIcon, 
  TypeScriptIcon, 
  TailwindIcon, 
  NodeIcon, 
  SupabaseIcon, 
  PostgresIcon, 
  PythonIcon, 
  RagBrainIcon, 
  FlutterIcon, 
  DartIcon, 
  GitIcon, 
  GithubIcon, 
  VercelIcon,
  CpuIcon
} from "./Icons";
import { playHoverSound, playKeySound } from "../utils/sound";

const ICON_MAP = {
  react: ReactTechIcon,
  nextjs: NextTechIcon,
  typescript: TypeScriptIcon,
  tailwind: TailwindIcon,
  nodejs: NodeIcon,
  supabase: SupabaseIcon,
  postgres: PostgresIcon,
  python: PythonIcon,
  ai: CpuIcon,
  rag: RagBrainIcon,
  flutter: FlutterIcon,
  dart: DartIcon,
  git: GitIcon,
  github: GithubIcon,
  vercel: VercelIcon,
};

const Tech = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTech, setSelectedTech] = useState(technologiesData[0].items[0]);

  const categories = [
    { id: "all", label: "All Technologies" },
    { id: "Frontend", label: "Frontend" },
    { id: "Backend & Database", label: "Backend & DB" },
    { id: "AI & Development", label: "AI & RAG" },
    { id: "Mobile", label: "Mobile" },
    { id: "Tools & DevOps", label: "Tools & DevOps" },
  ];

  const displayedGroups = technologiesData.filter((grp) =>
    activeCategory === "all" ? true : grp.category === activeCategory
  );

  return (
    <div className="relative w-full">
      {/* Section Header */}
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-2 mb-2 font-mono text-xs sm:text-sm text-[#00ff66] tracking-[0.2em] uppercase font-semibold">
          <TerminalIcon className="w-4 h-4 text-[#00ff66]" />
          <span>// 04. TECHNICAL STACK</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Architecture &amp; Core Tooling
        </h2>
        <p className="mt-2 text-slate-400 font-mono text-xs sm:text-sm">
          // Battle-tested technologies utilized across production applications and startup platforms
        </p>
      </motion.div>

      {/* Category Filter Pills */}
      <div className="mt-8 flex flex-wrap gap-2 font-mono text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              playKeySound();
              setActiveCategory(cat.id);
            }}
            className={`px-3.5 py-1.5 rounded-sm border transition-all ${
              activeCategory === cat.id
                ? "bg-[#00ff66] border-[#00ff66] text-black font-bold shadow-[2px_2px_0px_#fff]"
                : "bg-[#0d1017] border-white/10 text-slate-400 hover:text-white hover:border-[#00ff66]/30"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Two Column Layout: Technology Node Grid & Expandable Inspector */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Tech Cards Grid */}
        <div className="lg:col-span-8 space-y-8">
          {displayedGroups.map((group) => (
            <div key={group.category} className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#00ff66] uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
                <span>{group.category}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {group.items.map((tech) => {
                  const Icon = ICON_MAP[tech.iconType] || CpuIcon;
                  const isSelected = selectedTech?.name === tech.name;

                  return (
                    <motion.button
                      type="button"
                      aria-pressed={isSelected}
                      key={tech.name}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        playHoverSound();
                        setSelectedTech(tech);
                      }}
                      className={`p-4 rounded-sm border cursor-pointer transition-all duration-200 flex flex-col items-center text-center ${
                        isSelected
                          ? "bg-[#00ff66]/15 border-[#00ff66] shadow-[0_0_25px_rgba(0,255,102,0.2)]"
                          : "bg-[#0b0e15] border-[#00ff66]/15 hover:border-[#00ff66]/50 hover:bg-[#121622]"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-sm bg-black/40 border border-white/5 flex items-center justify-center mb-3">
                        <Icon className="w-7 h-7 text-[#00ff66]" />
                      </div>
                      <span className="font-display font-bold text-sm text-white block">
                        {tech.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#00ff66] mt-0.5">
                        {tech.level}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Expandable Technical Inspector HUD */}
        <div className="lg:col-span-4 sticky top-28">
          <div className="p-6 rounded-sm bg-[#090b10] border-2 border-[#00ff66]/30 shadow-[0_0_35px_rgba(0,255,102,0.12)] font-mono text-xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#00ff66]/20 pb-3">
              <span className="text-[#00ff66] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                TECH_INSPECTOR.sys
              </span>
              <span className="text-slate-400 text-[10px]">ACTIVE_NODE</span>
            </div>

            {selectedTech ? (
              <div className="space-y-4 font-sans">
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block">
                    SELECTED COMPONENT
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mt-0.5">
                    {selectedTech.name}
                  </h3>
                  <span className="font-mono text-xs text-[#00ff66] bg-[#00ff66]/10 px-2 py-0.5 rounded-sm border border-[#00ff66]/20 inline-block mt-1">
                    Proficiency: {selectedTech.level}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                    ENGINEERING APPLICATION
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {selectedTech.description}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-1.5">
                    VERIFIED IN PROJECTS
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {selectedTech.projectsUsed?.map((proj, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-2 py-1 rounded-sm bg-[#121622] border border-white/10 text-slate-200"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 font-mono text-[10px] text-slate-500 flex justify-between">
                  <span>TELEMETRY: VERIFIED</span>
                  <span className="text-[#00ff66]">READY FOR PRODUCTION</span>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500">
                Click any technology node to inspect implementation notes.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

const WrappedTech = SectionWrapper(Tech, "tech");
export default WrappedTech;
