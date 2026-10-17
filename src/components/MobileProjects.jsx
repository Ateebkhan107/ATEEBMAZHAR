import { useEffect, useRef, useState } from "react";
import { projects } from "../constants";
import { ExternalLinkIcon, GithubIcon } from "./Icons";

export default function MobileProjects({ onCaseStudy, onDemo }) {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.65) {
          setActive(Number(entry.target.dataset.index));
        }
      }
    }, { root: track.current, threshold: 0.65 });
    const cards = track.current.querySelectorAll("[data-index]");
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const show = (index) => {
    const card = track.current.children[index];
    if (!card) return;
    setActive(index);
    // Only this horizontal track moves; the page's vertical position stays native.
    track.current.scrollTo({ left: card.offsetLeft, behavior: "instant" });
  };
  return (
    <div className="mobile-projects" role="region" aria-roledescription="carousel" aria-label="Featured projects">
      <div className="project-switcher" aria-label="Choose a project">
        {projects.map((project, index) => (
          <button key={project.id} onClick={() => show(index)} aria-label={`Show ${project.name}`}
            aria-pressed={active === index} aria-controls={`project-${project.id}`}>{project.name}</button>
        ))}
      </div>
      <div className="project-track" ref={track} tabIndex={0} aria-label="Swipe projects or use left and right arrow keys"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const target = event.key === "ArrowRight" ? Math.min(active + 1, projects.length - 1)
            : event.key === "ArrowLeft" ? Math.max(active - 1, 0)
            : event.key === "Home" ? 0 : event.key === "End" ? projects.length - 1 : null;
          if (target !== null) { event.preventDefault(); show(target); }
        }}>
        {projects.map((project, index) => (
          <article id={`project-${project.id}`} key={project.id} data-index={index}
            className="mobile-project-card" role="group" aria-roledescription="slide" aria-label={`${project.name}, ${index + 1} of ${projects.length}`}>
            <div className="mobile-project-meta font-mono"><span>0{index + 1} / {project.badge}</span><span>{project.category}</span></div>
            {project.screenshot ? (
              <img className="carousel-screenshot" src={`/projects/${project.id}-480.webp`}
                srcSet={`/projects/${project.id}-480.webp 480w, /projects/${project.id}-960.webp 960w`}
                sizes="(max-width: 767px) calc(100vw - 68px), 600px" width="1440" height="960"
                loading="lazy" decoding="async" alt={`${project.name} live website screenshot`} />
            ) : (
              <div className="carousel-cover cyber-grid-bg" aria-hidden="true"><span>{project.id === "caseflow" ? "DOCUMENT → RETRIEVAL → INTELLIGENCE" : "FOCUS → STREAKS → PROGRESS"}</span><strong>{project.name}<span>_</span></strong></div>
            )}
            <div className="mobile-project-heading"><h3>{project.name}</h3><span>{project.role}</span></div>
            <p>{project.description}</p>
            <div className="compact-tags">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
            <div className="mobile-project-actions">
              <button className="mobile-primary-action" onClick={() => onCaseStudy(project)}>View Case Study</button>
              {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name} live site`}><ExternalLinkIcon className="w-4 h-4" /><span>Live</span></a>}
              <button onClick={() => onDemo(project)}>Try demo</button>
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} GitHub profile`}><GithubIcon className="w-4 h-4" /></a>}
            </div>
          </article>
        ))}
      </div>
      <div className="carousel-controls">
        <button onClick={() => show(active - 1)} disabled={active === 0} aria-label="Previous project">←</button>
        <span aria-live="polite" aria-atomic="true"><span className="text-[#00ff66]">{String(active + 1).padStart(2, "0")}</span> / 04 <span className="text-slate-400">· Swipe to explore</span></span>
        <button onClick={() => show(active + 1)} disabled={active === projects.length - 1} aria-label="Next project">→</button>
      </div>
    </div>
  );
}
