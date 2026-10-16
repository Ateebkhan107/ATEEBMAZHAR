import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window !== "undefined") {
      const touchCheck = window.matchMedia("(pointer: coarse)");
      const motionCheck = window.matchMedia("(prefers-reduced-motion: reduce)");
      return touchCheck.matches || motionCheck.matches;
    }
    return false;
  });

  const mouseX = useSpring(0, { stiffness: 600, damping: 32 });
  const mouseY = useSpring(0, { stiffness: 600, damping: 32 });
  const ringX = useSpring(0, { stiffness: 220, damping: 24 });
  const ringY = useSpring(0, { stiffness: 220, damping: 24 });

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e) => {
      const target = e.target;
      const isInteractive = target.closest("a, button, input, textarea, [data-cursor-hover], .clickable");
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleElementHover);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleElementHover);
    };
  }, [mouseX, mouseY, ringX, ringY, isVisible, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Center cyber dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={`w-2 h-2 rounded-full transition-colors duration-150 ${
          isHovered ? "bg-[#00ff66] shadow-[0_0_10px_#00ff66]" : "bg-[#00ff66]"
        }`}
      />

      {/* Trailing cyber target ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.75 : 1,
          borderColor: isHovered ? "rgba(0, 255, 102, 0.85)" : "rgba(0, 255, 102, 0.35)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="w-8 h-8 rounded-full border border-[#00ff66]/40 flex items-center justify-center"
      >
        {isHovered && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#00ff66]/60 animate-ping" />
        )}
      </motion.div>
    </div>
  );
};

export default CustomCursor;
