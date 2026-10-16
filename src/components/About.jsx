import { motion } from "framer-motion";
import { personalInfo } from "../constants";
import { 
  SparklesIcon, 
  CpuIcon, 
  LayersIcon, 
  ShieldIcon, 
  TerminalIcon 
} from "./Icons";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const PILLARS = [
  {
    code: "01",
    title: "Full-Stack Product Engineering",
    description: "Designing end-to-end architectures from database schemas and authentication to responsive frontend client state and edge deployments.",
    icon: LayersIcon,
  },
  {
    code: "02",
    title: "AI & Document Intelligence",
    description: "Integrating LLMs, prompt engineering, and Retrieval-Augmented Generation (RAG) to build context-grounded AI tools that eliminate hallucinations.",
    icon: CpuIcon,
  },
  {
    code: "03",
    title: "Cross-Platform Mobile Development",
    description: "Crafting fluid, high-performance Flutter mobile applications with offline local persistence, gamification mechanics, and native device bridges.",
    icon: SparklesIcon,
  },
  {
    code: "04",
    title: "Creative Frontend & Systems Design",
    description: "Combining neo-brutalist structure, terminal aesthetics, and subtle 3D interactions to create digital experiences that leave a lasting mark.",
    icon: ShieldIcon,
  },
];

const About = () => {
  return (
    <div className="relative w-full">
      {/* Section Header */}
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-2 mb-2 font-mono text-xs sm:text-sm text-[#00ff66] tracking-[0.2em] uppercase font-semibold">
          <TerminalIcon className="w-4 h-4 text-[#00ff66]" />
          <span>// 01. ABOUT ME</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Curious Mind. Ambitious Builder.
        </h2>
        <p className="mt-2 text-slate-400 font-mono text-xs sm:text-sm">
          // Bridging technical rigor with thoughtful product craftsmanship
        </p>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Personal Story & Pillars */}
        <motion.div 
          variants={fadeIn("right", "tween", 0.2, 0.8)}
          className="lg:col-span-7 space-y-6"
        >
          <div className="prose prose-invert max-w-none text-slate-300 font-sans text-base sm:text-lg leading-relaxed space-y-4">
            <p>
              I am <span className="text-white font-semibold">Ateeb Mazhar</span>, a Computer Science and Engineering student at{" "}
              <span className="text-[#00ff66] font-mono font-medium">Techno India University, Kolkata</span>, graduating in{" "}
              <span className="text-white font-semibold">2027</span>.
            </p>
            <p>
              My journey is fueled by a relentless drive to build products that solve real problems. As a co-founder of{" "}
              <span className="text-[#00ff66] font-mono font-bold">Prepzii</span>, I lead full-stack development on an AI-powered EdTech platform engineered to give JEE and NEET aspirants an unfair advantage through real-time exam simulations, cut-off forecasting, and intelligent doubt resolution.
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              I believe great software lives at the intersection of architectural discipline and creative intuition. Whether constructing a legal document retrieval pipeline (RAG), launching responsive digital brand websites at SkaleKraft, or crafting offline-first Flutter mobile apps, my standard remains constant: reliable engineering, clean aesthetics, and measurable value.
            </p>
          </div>

          {/* Core Engineering Pillars */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.code}
                  className="p-5 rounded-sm bg-[#0e121a] border border-[#00ff66]/15 hover:border-[#00ff66]/50 transition-all duration-300 group hover:translate-y-[-2px] shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#00ff66] font-bold">
                      [{p.code}]
                    </span>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#00ff66] transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-white text-base group-hover:text-[#00ff66] transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Terminal Dossier & Hardware HUD */}
        <motion.div 
          variants={fadeIn("left", "tween", 0.3, 0.8)}
          className="lg:col-span-5 space-y-6"
        >
          {/* Cyber Terminal Inspector Card */}
          <div className="rounded-sm bg-[#090b10] border-2 border-[#00ff66]/30 shadow-[0_0_30px_rgba(0,255,102,0.1)] overflow-hidden font-mono">
            {/* Header */}
            <div className="px-4 py-3 bg-[#0f141f] border-b border-[#00ff66]/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] animate-pulse" />
                <span className="text-[#00ff66] font-bold">DEVELOPER_PROFILE.json</span>
              </div>
              <span className="text-slate-400 text-[10px]">READ_ONLY</span>
            </div>

            {/* Dossier Code Content */}
            <div className="p-5 text-xs text-slate-300 space-y-3 leading-relaxed scanline-overlay bg-black/60">
              <div>
                <span className="text-slate-500">// Personal Identity</span>
                <div className="text-[#00ff66]">&quot;name&quot;: &quot;{personalInfo.name}&quot;,</div>
                <div className="text-white">&quot;role&quot;: &quot;Software Engineer / AI Builder&quot;,</div>
              </div>

              <div>
                <span className="text-slate-500">// Academics</span>
                <div className="text-white">&quot;university&quot;: &quot;{personalInfo.university}&quot;,</div>
                <div className="text-[#00ff66]">&quot;graduation_year&quot;: 2027,</div>
                <div className="text-slate-300">&quot;degree&quot;: &quot;B.Tech in CSE (AI Specialization)&quot;,</div>
              </div>

              <div>
                <span className="text-slate-500">// Startup &amp; Ventures</span>
                <div className="text-white">&quot;co_founder&quot;: &quot;Prepzii (EdTech / AI)&quot;,</div>
                <div className="text-white">&quot;founder&quot;: &quot;SkaleKraft (Digital Agency)&quot;,</div>
              </div>

              <div>
                <span className="text-slate-500">// Philosophy</span>
                <div className="text-[#00ff66]">&quot;ethos&quot;: &quot;Ship real products. Measure impact. Never stop optimizing.&quot;</div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>STATUS: OPERATIONAL</span>
                <span className="text-[#00ff66]">● VERIFIED PROFILE</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-4 rounded-sm bg-[#0e121a] border border-[#00ff66]/20">
              <span className="text-2xl font-display font-black text-white block">
                2027
              </span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider mt-1 block">
                Graduating CSE @ Techno India
              </span>
            </div>

            <div className="p-4 rounded-sm bg-[#0e121a] border border-[#00ff66]/20">
              <span className="text-2xl font-display font-black text-[#00ff66] block">
                Co-Founder
              </span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider mt-1 block">
                @ Prepzii EdTech Platform
              </span>
            </div>

            <div className="p-4 rounded-sm bg-[#0e121a] border border-[#00ff66]/20">
              <span className="text-2xl font-display font-black text-white block">
                Full-Stack
              </span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider mt-1 block">
                Next.js • Supabase • Python
              </span>
            </div>

            <div className="p-4 rounded-sm bg-[#0e121a] border border-[#00ff66]/20">
              <span className="text-2xl font-display font-black text-[#00ff66] block">
                Mobile / AI
              </span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider mt-1 block">
                Flutter Apps • RAG Systems
              </span>
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

const WrappedAbout = SectionWrapper(About, "about");
export default WrappedAbout;
