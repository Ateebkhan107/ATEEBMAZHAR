import { personalInfo } from "../constants";
import { GithubIcon, LinkedInIcon, DownloadIcon, ArrowRightIcon, TerminalIcon } from "./Icons";
import HeroTerminal from "./HeroTerminal";

export default function MobileHero({ onOpenResume, onOpenTerminal }) {
  return (
    <section id="hero" className="mobile-hero cyber-grid-bg">
      <div className="mobile-hero-status font-mono"><span aria-hidden="true">●</span> SYS_STATUS: ONLINE <span>KOLKATA, IN</span></div>
      <h1>ATEEB <span className="glow-text">MAZHAR</span></h1>
      <p className="mobile-hero-role font-mono">Software Engineer · Full-Stack Developer · AI Builder</p>
      <p className="mobile-hero-intro">I build intelligent products, scalable applications, and digital experiences that solve real problems.</p>
      <div className="mobile-hero-actions">
        <a className="mobile-primary-action" href="#projects">Explore My Work <ArrowRightIcon className="w-4 h-4" /></a>
        <button onClick={onOpenResume}><DownloadIcon className="w-4 h-4" /> Resume</button>
      </div>
      <div className="mobile-hero-links">
        <span className="font-mono">Co-Founder @ Prepzii<br /><span className="text-slate-400">CSE @ Techno India ’27</span></span>
        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile"><GithubIcon className="w-5 h-5" /></a>
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"><LinkedInIcon className="w-5 h-5" /></a>
        <button onClick={onOpenTerminal} aria-label="Open interactive terminal"><TerminalIcon className="w-5 h-5" /></button>
      </div>
      <details className="mobile-disclosure hero-session">
        <summary>dev-session.sh <span className="font-mono text-slate-400">SYSTEM READY</span><span className="disclosure-mark" aria-hidden="true" /></summary>
        <HeroTerminal />
      </details>
    </section>
  );
}
