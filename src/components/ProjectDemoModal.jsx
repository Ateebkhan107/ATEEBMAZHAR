import { createPortal } from "react-dom";
import useDialog from "../hooks/useDialog";
import ProjectPreview from "./ProjectPreview";

export default function ProjectDemoModal({ project, onClose }) {
  const ref = useDialog(true, onClose);
  return createPortal(
    <div className="project-demo-backdrop" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={ref} role="dialog" aria-modal="true" aria-label={`${project.name} interactive preview`} tabIndex={-1} className="project-demo-dialog">
        <header><div><strong>{project.name}</strong><span>Interactive interface recreation</span></div><button onClick={onClose} aria-label="Close interactive preview">✕</button></header>
        <ProjectPreview project={project} interactiveOnly />
      </div>
    </div>, document.body,
  );
}
