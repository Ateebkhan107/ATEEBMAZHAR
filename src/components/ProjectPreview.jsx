import { lazy, Suspense, useState } from "react";
import { useEnhancedEffects } from "../hooks/usePerformanceMode";
const previews = {
  prepzii: lazy(() => import("./mockups/PrepziiMockup").then((m) => ({ default: m.PrepziiMockup }))),
  caseflow: lazy(() => import("./mockups/CaseFlowMockup").then((m) => ({ default: m.CaseFlowMockup }))),
  skalekraft: lazy(() => import("./mockups/SkaleKraftMockup").then((m) => ({ default: m.SkaleKraftMockup }))),
  flamzi: lazy(() => import("./mockups/FlamziMockup").then((m) => ({ default: m.FlamziMockup }))),
};

export default function ProjectPreview({ project, interactiveOnly = false }) {
  const enhanced = useEnhancedEffects();
  const [open, setOpen] = useState(false);
  const Preview = previews[project.id];
  const demo = <Suspense fallback={<div className="preview-loading" role="status">Loading interface preview…</div>}><Preview /></Suspense>;
  if (enhanced || interactiveOnly) return <div className="desktop-preview">{demo}</div>;
  return (
    <div className="mobile-project-preview">
      {project.screenshot ? (
        <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name}`}>
          <img src={`/projects/${project.id}-960.webp`}
            srcSet={`/projects/${project.id}-480.webp 480w, /projects/${project.id}-960.webp 960w`}
            sizes="(max-width: 767px) calc(100vw - 68px), 600px"
            width="1440" height="960" loading="lazy" decoding="async"
            alt={`${project.name} live website screenshot`} className="project-screenshot" />
        </a>
      ) : (
        <div className="project-cover cyber-grid-bg">
          <span className="font-mono text-[11px] text-[#00ff66]">{project.id === "caseflow" ? "DOCUMENT → RETRIEVAL → INTELLIGENCE" : "FOCUS → STREAKS → PROGRESS"}</span>
          <span className="font-display text-3xl font-bold text-white">{project.name}<span className="text-[#00ff66]">_</span></span>
          <span className="text-xs text-slate-400">Interactive interface preview available below</span>
        </div>
      )}
      <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
        <summary className="preview-toggle">Explore interactive preview <span aria-hidden="true">{open ? "−" : "+"}</span></summary>
        {open && demo}
      </details>
    </div>
  );
}
