import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useEnhancedEffects } from "../hooks/usePerformanceMode";

const logs = [
  "> initializing developer profile...",
  "> loading projects: Prepzii, CaseFlow, SkaleKraft, Flamzi...",
  "> connecting ideas to scalable reality...",
  "> system ready. Co-Founder @ Prepzii | CSE '27",
];

export default function HeroTerminal() {
  const enhanced = useEnhancedEffects();
  const ref = useRef(null);
  const inView = useInView(ref);
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (!enhanced || !inView || count >= logs.length) return;
    const timer = setTimeout(() => setCount((n) => n + 1), 450);
    return () => clearTimeout(timer);
  }, [enhanced, inView, count]);
  return (
    <div ref={ref} className="hero-terminal p-4 sm:p-5 font-mono text-xs sm:text-sm text-[#00ff66] leading-relaxed bg-black/60 scanline-overlay">
      {logs.slice(0, enhanced ? count : logs.length).map((log) => <div key={log} className="mb-1.5">{log}</div>)}
      <div className="mt-2 text-slate-400 text-xs">● Explore selected work below.</div>
    </div>
  );
}
