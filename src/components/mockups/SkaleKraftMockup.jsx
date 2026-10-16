import { ExternalLinkIcon } from "../Icons";

export const SkaleKraftMockup = () => {
  return (
    <div className="w-full bg-[#080a10] border-2 border-[#00ff66]/30 shadow-[0_0_40px_rgba(0,255,102,0.12)] rounded-sm overflow-hidden font-sans text-slate-200">
      {/* Browser Chrome Header */}
      <div className="px-4 py-2.5 bg-[#0e111a] border-b border-[#00ff66]/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66]/80" />
        </div>

        {/* Address bar */}
        <div className="flex items-center gap-2 bg-black/50 border border-white/10 px-3 py-1 rounded-sm text-xs font-mono text-slate-300 w-full max-w-xs justify-center">
          <span className="text-[#00ff66]">🔒</span>
          <span>https://skalekraft.in</span>
        </div>

        <a
          href="https://skalekraft.in"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-[#00ff66] hover:underline flex items-center gap-1 font-semibold"
        >
          <span>Open Live</span>
          <ExternalLinkIcon className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Website Viewport */}
      <div className="p-6 sm:p-8 space-y-6 bg-gradient-to-b from-[#090b12] to-[#06080d] cyber-grid-bg relative">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xl tracking-tight text-white">
              SKALE<span className="text-[#00ff66]">KRAFT</span>
            </span>
            <span className="font-mono text-[10px] bg-[#00ff66]/15 text-[#00ff66] px-2 py-0.5 border border-[#00ff66]/30 rounded-sm">
              DIGITAL AGENCY
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 font-mono text-xs text-slate-400">
            <span>// SERVICES</span>
            <span>// WORK</span>
            <span>// CONTACT</span>
          </div>
        </div>

        {/* Agency Hero Statement */}
        <div className="max-w-2xl space-y-3">
          <span className="font-mono text-xs text-[#00ff66] font-semibold uppercase tracking-wider block">
            Digital Solutions &amp; Web Experience Brand
          </span>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
            Engineering High-Performance Digital Dominance.
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
            SkaleKraft empowers ambitious businesses with next-generation websites, full-stack applications, seamless AI integrations, and bespoke digital experiences that drive genuine growth.
          </p>
        </div>

        {/* Agency Services Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 bg-[#0f131f] border border-white/5 rounded-sm hover:border-[#00ff66]/40 transition-colors">
            <span className="font-mono text-xs text-[#00ff66] block mb-1">01. Web Applications</span>
            <span className="font-display font-bold text-sm text-white block">Next.js &amp; Full-Stack</span>
            <span className="text-[11px] text-slate-400 mt-1 block">Production performance, SEO &amp; scalability.</span>
          </div>

          <div className="p-4 bg-[#0f131f] border border-white/5 rounded-sm hover:border-[#00ff66]/40 transition-colors">
            <span className="font-mono text-xs text-[#00ff66] block mb-1">02. AI Integrations</span>
            <span className="font-display font-bold text-sm text-white block">Intelligent Workflows</span>
            <span className="text-[11px] text-slate-400 mt-1 block">Custom LLM prompts, bots &amp; automation.</span>
          </div>

          <div className="p-4 bg-[#0f131f] border border-white/5 rounded-sm hover:border-[#00ff66]/40 transition-colors">
            <span className="font-mono text-xs text-[#00ff66] block mb-1">03. Brand Experience</span>
            <span className="font-display font-bold text-sm text-white block">Creative Design</span>
            <span className="text-[11px] text-slate-400 mt-1 block">Fluid animations, typography &amp; UI/UX.</span>
          </div>
        </div>

        {/* Direct Action Link */}
        <div className="pt-2 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">// PRODUCTION READY &amp; DEPLOYED</span>
          <a
            href="https://skalekraft.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#00ff66] hover:bg-[#33ff85] text-black font-bold rounded-sm flex items-center gap-1.5 transition-colors"
          >
            <span>Visit skalekraft.in</span>
            <ExternalLinkIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
