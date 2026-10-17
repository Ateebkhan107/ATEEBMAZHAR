import { Suspense, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useEnhancedEffects } from "../hooks/usePerformanceMode";

export default function DeferredScene({ scene: Scene, className, fallback = null }) {
  const ref = useRef(null);
  const enhanced = useEnhancedEffects();
  const nearViewport = useInView(ref, { once: true, margin: "150px" });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!enhanced || !nearViewport) return;
    // Decorative work yields to the initial content and user interactions.
    const start = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 500);
    return () => clearTimeout(id);
  }, [enhanced, nearViewport]);
  return (
    <div ref={ref} className={className} aria-hidden="true">
      {enhanced && ready ? <Suspense fallback={fallback}><Scene /></Suspense> : fallback}
    </div>
  );
}
