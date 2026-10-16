import { Suspense, useRef } from "react";
import { useInView } from "framer-motion";

export default function DeferredScene({ scene: Scene, className }) {
  const ref = useRef(null);
  const nearViewport = useInView(ref, { once: true, margin: "200px" });
  return (
    <div ref={ref} className={className}>
      {nearViewport && <Suspense fallback={null}><Scene /></Suspense>}
    </div>
  );
}
