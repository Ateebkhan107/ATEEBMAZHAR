import { useState } from "react";
import { SparklesIcon, ShieldIcon, CheckIcon } from "../Icons";

export const CaseFlowMockup = () => {
  const [activePipelineStep, setActivePipelineStep] = useState(2); // 0..4

  const pipelineSteps = [
    { title: "Query Parsing", desc: "Extract legal intent & terms" },
    { title: "Dense Embeddings", desc: "Vector transformation" },
    { title: "Semantic Retrieval", desc: "Top-k chunk similarity" },
    { title: "Context Assembly", desc: "Inject statutory anchors" },
    { title: "Grounded LLM", desc: "Strict cited synthesis" },
  ];

  return (
    <div className="w-full bg-[#090b11] border-2 border-[#00ff66]/30 shadow-[0_0_40px_rgba(0,255,102,0.12)] rounded-sm overflow-hidden font-sans text-slate-200">
      {/* Top Header */}
      <div className="px-4 py-3 bg-[#0d101a] border-b border-[#00ff66]/20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] animate-pulse" />
          <span className="font-display font-bold text-white text-sm sm:text-base">
            CASEFLOW // Legal Document Intelligence
          </span>
          <span className="font-mono text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded-sm">
            RAG Pipeline
          </span>
        </div>
        <div className="font-mono text-[11px] text-[#00ff66] flex items-center gap-1.5">
          <ShieldIcon className="w-3.5 h-3.5" />
          <span>ZERO_HALLUCINATION_GUARD</span>
        </div>
      </div>

      {/* RAG Visual Pipeline Diagram */}
      <div className="p-4 bg-[#06080d] border-b border-white/5">
        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block mb-2">
          Retrieval-Augmented Generation (RAG) Architecture Pipeline
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
          {pipelineSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActivePipelineStep(idx)}
              className={`p-2.5 rounded-sm border text-left transition-all ${
                activePipelineStep === idx
                  ? "bg-[#00ff66]/15 border-[#00ff66] text-[#00ff66] shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                  : "bg-[#0f131e] border-white/5 text-slate-400 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500">0{idx + 1}</span>
                {activePipelineStep === idx && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-ping" />
                )}
              </div>
              <div className="font-bold text-slate-200 mt-1">{step.title}</div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">{step.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Split Interface: Left Legal Context / Right Grounded AI */}
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-white/5">
        
        {/* Left: Indexed Legal Document Chunks */}
        <div className="md:col-span-5 p-4 sm:p-5 space-y-3 bg-[#0a0c14]">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#00ff66] font-semibold">// INDEXED CORPUS CHUNKS</span>
            <span className="text-slate-400 text-[10px]">MSA_2024.pdf</span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="p-3 bg-[#111624] border border-[#00ff66]/40 rounded-sm space-y-1">
              <div className="flex items-center justify-between text-[10px] text-[#00ff66]">
                <span>CHUNK #48 • COSINE: 0.942</span>
                <span className="bg-[#00ff66]/20 px-1.5 py-0.5 rounded-sm">TOP-1 MATCH</span>
              </div>
              <p className="text-slate-200 text-[11px] leading-relaxed">
                &quot;§ 12.3 Indemnification: Each party shall indemnify the other against direct third-party damages up to an aggregate cap of 2x the Annual Contract Value (ACV). Consequential or punitive damages are expressly disclaimed.&quot;
              </p>
            </div>

            <div className="p-3 bg-[#0d101a] border border-white/5 rounded-sm space-y-1 text-slate-400 opacity-60">
              <div className="flex items-center justify-between text-[10px]">
                <span>CHUNK #52 • COSINE: 0.781</span>
                <span>MATCH 2</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                &quot;§ 14.1 Governing Law: This Agreement shall be construed in accordance with the laws of the jurisdiction specified in Exhibit A...&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Right: Context-Grounded AI Answer */}
        <div className="md:col-span-7 p-4 sm:p-5 space-y-4 bg-[#080a10]">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 font-semibold">// VERIFIED AI SYNTHESIS</span>
            <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-1">
              <CheckIcon className="w-3.5 h-3.5" /> Strict Citation Grounding
            </span>
          </div>

          <div className="p-3 bg-[#121622] rounded-sm border border-white/5 font-mono text-xs text-slate-300">
            <span className="text-slate-500 block mb-0.5">LEGAL QUERY:</span>
            &quot;What is the maximum liability cap for indemnification claims under the contract?&quot;
          </div>

          <div className="p-4 bg-[#0a1811] rounded-sm border border-[#00ff66]/30 space-y-2.5">
            <div className="flex items-center gap-2 font-mono text-xs text-[#00ff66] font-bold">
              <SparklesIcon className="w-4 h-4 text-[#00ff66]" />
              <span>CASEFLOW RAG RESPONSE:</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              Under <span className="font-mono text-[#00ff66] bg-[#00ff66]/10 px-1 py-0.5 rounded-sm">§ 12.3</span> of the Master Service Agreement, indemnification liability is strictly limited to an aggregate maximum of <strong className="text-white">2x the Annual Contract Value (ACV)</strong> for direct third-party damages.
            </p>

            <p className="text-xs text-slate-300 font-sans">
              Additionally, any consequential, special, or punitive damages are expressly barred under the same clause.
            </p>

            <div className="pt-2 border-t border-[#00ff66]/20 flex flex-wrap items-center gap-2 font-mono text-[10px]">
              <span className="text-slate-400">GROUNDED CITATION:</span>
              <span className="bg-[#00ff66]/15 text-[#00ff66] px-2 py-0.5 rounded-sm border border-[#00ff66]/30">
                [MSA_2024.pdf §12.3]
              </span>
              <span className="text-slate-500">Confidence: 99.4%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
