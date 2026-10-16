import { Component, useRef, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { useInView, useReducedMotion } from "framer-motion";

const subscribe = (notify) => {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
};
const isVisible = () => document.visibilityState === "visible";

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

// Keep the existing scene mounted, but stop its render loop when it cannot be seen.
export default function SceneCanvas({ children, ...props }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const visible = useSyncExternalStore(subscribe, isVisible, () => true);
  const reducedMotion = useReducedMotion();
  const fallback = <div className="h-full w-full cyber-grid-bg" aria-hidden="true" />;
  return (
    <div ref={ref} className="absolute inset-0">
      <SceneBoundary fallback={fallback}>
        <Canvas {...props} frameloop={!inView || !visible ? "never" : reducedMotion ? "demand" : "always"} fallback={fallback}>
          {children}
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
