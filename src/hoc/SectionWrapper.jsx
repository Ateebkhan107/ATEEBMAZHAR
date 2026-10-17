import { useEnhancedEffects } from "../hooks/usePerformanceMode";
import { m as motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const SectionWrapper = (Component, idName) =>
  function HOC() {
    const enhanced = useEnhancedEffects();
    return (
      <motion.section
        id={idName}
        variants={staggerContainer()}
        initial={enhanced ? "hidden" : false}
        whileInView="show"
        viewport={{ once: true, amount: 0.02 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-10`}
      >
        <Component />
      </motion.section>
    );
  };

export { SectionWrapper };
