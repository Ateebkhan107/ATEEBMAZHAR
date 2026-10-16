import { useState, useEffect } from "react";
import { SparklesIcon, CheckIcon } from "../Icons";

export const FlamziMockup = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete Rotational Dynamics PYQ set", xp: "+50 XP", done: true },
    { id: 2, title: "Review organic reaction mechanisms", xp: "+40 XP", done: false },
    { id: 3, title: "Timed 20-min problem sprint", xp: "+30 XP", done: false },
  ]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            setIsRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remSecs.toString().padStart(2, "0")}`;
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="w-full flex justify-center py-4">
      {/* Mobile Smartphone Frame */}
      <div className="w-full max-w-[320px] bg-[#07090e] border-4 border-[#1f2937] shadow-[0_0_50px_rgba(0,255,102,0.18)] rounded-[36px] overflow-hidden p-3 relative font-sans text-slate-200">
        
        {/* Dynamic Island / Notch */}
        <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#111] mr-3" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]/60 animate-pulse" />
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-3 text-[10px] font-mono text-slate-400 mb-3">
          <span>09:41</span>
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* App Header */}
        <div className="flex items-center justify-between px-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-1.5 font-display font-black text-white text-sm">
            <span className="w-5 h-5 rounded-full bg-[#00ff66] text-black font-mono text-xs flex items-center justify-center font-bold">
              Z
            </span>
            <span>FLAMZI</span>
          </div>
          <span className="font-mono text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold">
            🔥 18D Streak
          </span>
        </div>

        {/* Focus Timer Circle */}
        <div className="py-6 flex flex-col items-center">
          <div className="relative w-40 h-40 rounded-full border-4 border-[#00ff66]/20 flex flex-col items-center justify-center bg-black/40">
            {/* Pulsing ring indicator */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-[#00ff66] ${
                isRunning ? "animate-pulse" : ""
              }`}
            />
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
              DEEP WORK
            </span>
            <span className="font-mono text-3xl font-bold text-white tracking-tight my-1">
              {formatTime(secondsLeft)}
            </span>
            <span className="font-mono text-[10px] text-[#00ff66] flex items-center gap-1">
              <SparklesIcon className="w-3 h-3 text-[#00ff66]" />
              <span>Mascot Zi Focused</span>
            </span>
          </div>

          {/* Timer Control Button */}
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="mt-4 px-6 py-2 rounded-full font-mono text-xs font-bold transition-all shadow-md flex items-center gap-1.5 bg-[#00ff66] hover:bg-[#33ff85] text-black"
          >
            <span>{isRunning ? "PAUSE SESSION" : "START FOCUS (25m)"}</span>
          </button>
        </div>

        {/* Gamified XP Progress */}
        <div className="bg-[#0f131f] border border-white/5 p-3 rounded-xl mb-3">
          <div className="flex items-center justify-between font-mono text-[10px] text-slate-300 mb-1.5">
            <span className="text-[#00ff66] font-bold">LEVEL 6 • FOCUS MAESTRO</span>
            <span>1,840 / 2,500 XP</span>
          </div>
          <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
            <div className="w-[74%] h-full bg-[#00ff66] rounded-full" />
          </div>
        </div>

        {/* Interactive Task Checklist */}
        <div className="bg-[#0f131f] border border-white/5 p-3 rounded-xl space-y-2">
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
            TODAY&apos;S FOCUS OBJECTIVES (TAP TO TOGGLE)
          </span>
          <div className="space-y-1.5 font-mono text-[11px]">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`w-full p-2 rounded-lg border text-left flex items-center justify-between transition-colors ${
                  task.done
                    ? "bg-[#00ff66]/10 border-[#00ff66]/30 text-slate-300 line-through"
                    : "bg-black/40 border-white/5 text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                      task.done
                        ? "bg-[#00ff66] border-[#00ff66] text-black"
                        : "border-slate-500"
                    }`}
                  >
                    {task.done && <CheckIcon className="w-2.5 h-2.5" />}
                  </span>
                  <span className="truncate min-w-0">{task.title}</span>
                </div>
                <span className="text-[10px] text-[#00ff66] shrink-0">{task.xp}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom indicator bar */}
        <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-4" />
      </div>
    </div>
  );
};
