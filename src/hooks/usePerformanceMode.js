import { createContext, useContext, useSyncExternalStore } from "react";

const query = "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribe = (notify) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  navigator.connection?.addEventListener("change", notify);
  return () => {
    media.removeEventListener("change", notify);
    navigator.connection?.removeEventListener("change", notify);
  };
};
const getSnapshot = () => window.matchMedia(query).matches
  && !navigator.connection?.saveData
  && !/^(slow-2g|2g|3g)$/.test(navigator.connection?.effectiveType || "")
  && (navigator.deviceMemory === undefined || navigator.deviceMemory >= 4)
  && (navigator.hardwareConcurrency === undefined || navigator.hardwareConcurrency >= 4);

export const PerformanceContext = createContext(false);
export const useDeviceEffects = () => useSyncExternalStore(subscribe, getSnapshot, () => false);
export const useEnhancedEffects = () => useContext(PerformanceContext);

const mobileQuery = "(max-width: 767px)";
const subscribeMobile = (notify) => {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const isMobile = () => window.matchMedia(mobileQuery).matches;
export const useMobileLayout = () => useSyncExternalStore(subscribeMobile, isMobile, () => false);
