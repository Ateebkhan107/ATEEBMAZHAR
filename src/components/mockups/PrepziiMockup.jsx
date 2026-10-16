import { useState } from "react";
import { SparklesIcon } from "../Icons";

export const PrepziiMockup = () => {
  const [activeTab, setActiveTab] = useState("exam"); // "exam" | "zi" | "analytics"
  const [selectedOption, setSelectedOption] = useState("B");

  return (
    <div className="w-full bg-[#0a0c12] border-2 border-[#00ff66]/30 shadow-[0_0_40px_rgba(0,255,102,0.15)] rounded-sm overflow-hidden font-sans text-slate-200">
      {/* Top Navbar */}
      <div className="px-4 py-3 bg-[#0f131d] border-b border-[#00ff66]/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-display font-black text-white text-base">
            <span className="w-5 h-5 rounded-sm bg-[#00ff66] text-black flex items-center justify-center font-mono text-xs font-bold">
              P
            </span>
            <span>PREPZII</span>
          </div>
          <span className="font-mono text-[10px] bg-[#00ff66]/15 text-[#00ff66] px-2 py-0.5 border border-[#00ff66]/30 rounded-sm font-semibold">
            PRO // JEE-ADVANCED 2026
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="hidden sm:flex items-center gap-1 bg-black/40 p-1 rounded-sm border border-white/5 font-mono text-xs">
          <button
            onClick={() => setActiveTab("exam")}
            className={`px-3 py-1 rounded-sm transition-colors ${
              activeTab === "exam"
                ? "bg-[#00ff66] text-black font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Mock Test Engine
          </button>
          <button
            onClick={() => setActiveTab("zi")}
            className={`px-3 py-1 rounded-sm transition-colors flex items-center gap-1.5 ${
              activeTab === "zi"
                ? "bg-[#00ff66] text-black font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <SparklesIcon className="w-3 h-3" />
            <span>Zi AI Tutor</span>
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-3 py-1 rounded-sm transition-colors ${
              activeTab === "analytics"
                ? "bg-[#00ff66] text-black font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Rank Predictor
          </button>
        </div>

        {/* Student Stats */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-amber-400 font-semibold flex items-center gap-1">
            🔥 14D Streak
          </span>
          <span className="text-[#00ff66] font-semibold bg-[#00ff66]/10 px-2 py-1 rounded-sm border border-[#00ff66]/20">
            2,480 XP
          </span>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="sm:hidden flex border-b border-[#00ff66]/20 bg-black/60 font-mono text-[11px]">
        <button
          onClick={() => setActiveTab("exam")}
          className={`flex-1 py-2 text-center ${
            activeTab === "exam" ? "text-[#00ff66] border-b-2 border-[#00ff66]" : "text-slate-400"
          }`}
        >
          Exam Test
        </button>
        <button
          onClick={() => setActiveTab("zi")}
          className={`flex-1 py-2 text-center ${
            activeTab === "zi" ? "text-[#00ff66] border-b-2 border-[#00ff66]" : "text-slate-400"
          }`}
        >
          Zi AI Assistant
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex-1 py-2 text-center ${
            activeTab === "analytics" ? "text-[#00ff66] border-b-2 border-[#00ff66]" : "text-slate-400"
          }`}
        >
          Rank Predictor
        </button>
      </div>

      {/* Tab 1: Mock Exam Engine */}
      {activeTab === "exam" && (
        <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/5 pb-2">
              <span className="text-[#00ff66]">QUESTION 14 OF 30 // PHYSICS</span>
              <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-sm">
                ⏱ REMAINING: 02:44:18
              </span>
            </div>

            <div className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
              A solid uniform sphere of mass <span className="font-mono text-[#00ff66]">M</span> and radius <span className="font-mono text-[#00ff66]">R</span> rolls without slipping down an inclined plane of inclination <span className="font-mono text-[#00ff66]">θ</span>. What is the acceleration of the center of mass of the sphere?
            </div>

            <div className="space-y-2 font-mono text-xs sm:text-sm">
              {[
                { id: "A", text: "(3/5) g sin θ" },
                { id: "B", text: "(5/7) g sin θ  (Correct Answer)" },
                { id: "C", text: "(2/3) g sin θ" },
                { id: "D", text: "(5/9) g sin θ" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className={`w-full p-3 rounded-sm border text-left flex items-center gap-3 transition-colors ${
                    selectedOption === opt.id
                      ? "bg-[#00ff66]/15 border-[#00ff66] text-[#00ff66] font-bold"
                      : "bg-[#11141f] border-white/5 text-slate-300 hover:border-white/20"
                  }`}
                >
                  <span className="w-6 h-6 rounded-sm bg-black/40 flex items-center justify-center font-bold">
                    {opt.id}
                  </span>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between font-mono text-xs">
              <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-sm border border-white/10">
                Mark for Review
              </button>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-sm border border-white/10">
                  Previous
                </button>
                <button className="px-4 py-1.5 bg-[#00ff66] text-black font-bold rounded-sm">
                  Save &amp; Next →
                </button>
              </div>
            </div>
          </div>

          {/* Palette Sidebar */}
          <div className="md:col-span-4 bg-[#0d1018] p-4 rounded-sm border border-white/5 space-y-4">
            <span className="font-mono text-xs text-slate-400 font-semibold uppercase tracking-wider block">
              Question Palette (30)
            </span>
            <div className="grid grid-cols-6 gap-2 font-mono text-xs">
              {Array.from({ length: 30 }).map((_, i) => {
                const qNum = i + 1;
                const isCurrent = qNum === 14;
                const isAnswered = [1, 2, 4, 7, 8, 11, 12, 13].includes(qNum);
                const isMarked = [5, 9, 17].includes(qNum);
                return (
                  <button
                    key={qNum}
                    className={`h-7 rounded-sm flex items-center justify-center font-semibold text-[11px] transition-all ${
                      isCurrent
                        ? "bg-[#00ff66] text-black ring-2 ring-[#00ff66]/50 font-bold"
                        : isAnswered
                        ? "bg-emerald-700/60 text-white border border-emerald-500/40"
                        : isMarked
                        ? "bg-purple-600/60 text-white border border-purple-400/40"
                        : "bg-white/5 text-slate-400 hover:bg-white/10"
                    }`}
                  >
                    {qNum}
                  </button>
                );
              })}
            </div>
            <div className="pt-3 border-t border-white/10 space-y-1.5 font-mono text-[10px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-700 rounded-sm" />
                <span>Answered (8)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-purple-600 rounded-sm" />
                <span>Marked for Review (3)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-white/10 rounded-sm" />
                <span>Not Visited (18)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Zi AI Assistant */}
      {activeTab === "zi" && (
        <div className="p-5 space-y-4 font-sans text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] animate-pulse" />
              <span className="font-display font-bold text-white text-base">
                Zi AI — High-School Science Study Agent
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#00ff66] bg-[#00ff66]/10 px-2 py-0.5 rounded-sm">
              Context-Aware Tutor
            </span>
          </div>

          <div className="space-y-3">
            {/* User message */}
            <div className="p-3 bg-[#131724] border border-white/5 rounded-sm ml-auto max-w-[85%] text-slate-200">
              <span className="font-mono text-[10px] text-slate-400 block mb-1">
                YOU // 14:22
              </span>
              Zi, how do we derive the rolling acceleration a = (5/7) g sin θ for a sphere down an incline?
            </div>

            {/* Zi response */}
            <div className="p-4 bg-[#0a1b12] border border-[#00ff66]/30 rounded-sm max-w-[95%] space-y-2">
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#00ff66] font-bold">
                <SparklesIcon className="w-4 h-4 text-[#00ff66]" />
                <span>ZI AI STUDY ASSISTANT</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                Here is the exact derivation for JEE Advanced:
              </p>
              <div className="p-2.5 bg-black/40 rounded-sm font-mono text-xs text-[#00ff66] space-y-1 border border-[#00ff66]/20">
                <div>1. Equation of translation: Mg sin θ - f = M a</div>
                <div>2. Torque about center: f · R = I α = (2/5 M R²) (a / R)</div>
                <div>3. Friction force: f = (2/5) M a</div>
                <div>4. Substitute into (1): Mg sin θ - (2/5) M a = M a</div>
                <div>5. Solve for a: (7/5) M a = Mg sin θ  =&gt;  a = (5/7) g sin θ</div>
              </div>
              <p className="text-slate-300 text-xs">
                💡 Key Exam Tip: Notice that acceleration is independent of the sphere&apos;s mass <span className="font-mono text-[#00ff66]">M</span> and radius <span className="font-mono text-[#00ff66]">R</span>!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Rank & College Predictor */}
      {activeTab === "analytics" && (
        <div className="p-5 space-y-5 font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-[#11141f] border border-white/5 rounded-sm">
              <span className="text-slate-400 block">PROJECTED SCORE</span>
              <span className="text-2xl font-display font-bold text-white mt-1 block">
                242 / 300
              </span>
              <span className="text-[#00ff66] text-[11px] block mt-0.5">
                99.42th Percentile
              </span>
            </div>

            <div className="p-4 bg-[#11141f] border border-white/5 rounded-sm">
              <span className="text-slate-400 block">FORECASTED AIR</span>
              <span className="text-2xl font-display font-bold text-[#00ff66] mt-1 block">
                ~2,840
              </span>
              <span className="text-slate-400 text-[11px] block mt-0.5">
                JEE Main 2026 Model
              </span>
            </div>

            <div className="p-4 bg-[#11141f] border border-white/5 rounded-sm">
              <span className="text-slate-400 block">ADMISSION PROBABILITY</span>
              <span className="text-2xl font-display font-bold text-amber-400 mt-1 block">
                94% (High)
              </span>
              <span className="text-slate-400 text-[11px] block mt-0.5">
                IIT Kharagpur / NIT Trichy
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#0d1018] rounded-sm border border-white/5">
            <span className="font-mono text-xs text-[#00ff66] uppercase font-bold block mb-3">
              Cutoff Matching Engine (JoSAA Historical Cutoffs)
            </span>
            <div className="space-y-2 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between p-2.5 bg-black/30 border border-white/5 rounded-sm">
                <span>IIT Kharagpur — Mechanical Engineering</span>
                <span className="text-emerald-400 font-bold">96% Probability</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-black/30 border border-white/5 rounded-sm">
                <span>IIT Roorkee — Electrical Engineering</span>
                <span className="text-emerald-400 font-bold">89% Probability</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-black/30 border border-white/5 rounded-sm">
                <span>NIT Trichy — Computer Science &amp; Eng</span>
                <span className="text-emerald-400 font-bold">94% Probability</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
