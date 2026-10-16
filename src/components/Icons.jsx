
export const GithubIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const LinkedInIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.37 9.74v-8.37H5.1v8.37h2.73z" />
  </svg>
);

export const ExternalLinkIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const TerminalIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

export const DownloadIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const SparklesIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

export const CpuIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3" />
    <path d="M15 1v3" />
    <path d="M9 20v3" />
    <path d="M15 20v3" />
    <path d="M20 9h3" />
    <path d="M20 14h3" />
    <path d="M1 9h3" />
    <path d="M1 14h3" />
  </svg>
);

export const LayersIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

export const VolumeOnIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

export const VolumeMuteIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

export const CommandIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
  </svg>
);

export const CloseIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ArrowRightIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const CheckIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const ShieldIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

// Tech Brand SVG Logos
export const ReactTechIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" fill="#00D8FF" className={className} {...props}>
    <circle cx="0" cy="0" r="2.05" fill="#00D8FF"/>
    <g stroke="#00D8FF" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

export const NextTechIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg viewBox="0 0 180 180" fill="none" className={className} {...props}>
    <circle cx="90" cy="90" r="90" fill="#000"/>
    <path d="M149.508 157.08L69.142 54H54V125.88H66.1136V69.4773L139.999 164.55C143.344 162.247 146.526 159.743 149.508 157.08Z" fill="url(#next_paint0)"/>
    <rect x="115" y="54" width="12" height="72" fill="url(#next_paint1)"/>
    <defs>
      <linearGradient id="next_paint0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff"/>
        <stop offset="1" stopColor="#fff" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="next_paint1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff"/>
        <stop offset="1" stopColor="#fff" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

export const TypeScriptIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <rect width="24" height="24" rx="4" fill="#3178C6"/>
    <path d="M12.5 13.5v2.8c-.5.4-1.2.6-1.9.6-1.5 0-2.5-.9-2.5-2.6 0-1.7 1-2.7 2.6-2.7.7 0 1.3.2 1.8.5v1.2c-.5-.4-1.1-.6-1.7-.6-.9 0-1.4.5-1.4 1.5s.5 1.5 1.4 1.5c.6 0 1.1-.2 1.7-.6v-1.6h-1.6V12h3.1v1.5h-1.5z" fill="#fff" display="none"/>
    <path d="M4 10h5v1.5H7.1v6.5H5.8v-6.5H4V10zm6.8 5.4c.5.3 1.1.5 1.7.5.7 0 1.1-.3 1.1-.8 0-.5-.4-.7-1.3-1.1-.9-.4-1.6-.9-1.6-1.8 0-1.2 1-2 2.5-2 .7 0 1.4.2 1.8.5l-.4 1.2c-.4-.3-.9-.4-1.4-.4-.7 0-1.1.3-1.1.7 0 .5.4.7 1.3 1.1 1.1.4 1.7.9 1.7 1.9 0 1.2-1 2-2.6 2-.8 0-1.6-.2-2.1-.6l.4-1.2z" fill="#fff"/>
  </svg>
);

export const TailwindIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg viewBox="0 0 24 24" fill="#38BDF8" className={className} {...props}>
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
  </svg>
);

export const NodeIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg viewBox="0 0 24 24" fill="#68A063" className={className} {...props}>
    <path d="M12 2.5l9 5.2v10.4l-9 5.2-9-5.2V7.7L12 2.5zm0 2.3L5 9.1v7.6l7 4.1 7-4.1V9.1L12 4.8z"/>
  </svg>
);

export const SupabaseIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M13.4 2.1c-.8-.9-2.2-.4-2.3.8L9.9 12h8.5c1.4 0 2.2 1.7 1.2 2.7L8.8 23.3c-.8.9-2.2.4-2.3-.8L7.7 13.4h7.9c.7 0 1.2-.6.9-1.2L13.4 2.1z" fill="#3ECF8E"/>
  </svg>
);

export const PostgresIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg viewBox="0 0 24 24" fill="#336791" className={className} {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-4.06c-1.39-.24-2.5-1.44-2.5-2.94 0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.5-1.11 2.7-2.5 2.94V18.5z"/>
  </svg>
);

export const PythonIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3v1.4h5.9v.8H6.8S4 5.3 4 8.5s2.5 3.3 2.5 3.3h1.5v-1.6s-.1-1.9 1.9-1.9h4.8c1.9 0 1.9-1.8 1.9-1.8V4.6S16.8 2 11.9 2z" fill="#387EB8"/>
    <circle cx="9.2" cy="4" r=".6" fill="#fff"/>
    <path d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3v-1.4H9.1v-.8h8.1s2.8.2 2.8-3-2.5-3.3-2.5-3.3h-1.5v1.6s.1 1.9-1.9 1.9H9.3c-1.9 0-1.9 1.8-1.9 1.8v1.9s-.2 2.6 4.7 2.6z" fill="#FFE052"/>
    <circle cx="14.8" cy="20" r=".6" fill="#fff"/>
  </svg>
);

export const FlutterIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg viewBox="0 0 24 24" fill="#02569B" className={className} {...props}>
    <path d="M14.3 2.5L3 13.8l3.4 3.4 14.8-14.7H14.3zm0 9.8l-5.6 5.6 5.6 5.6h6.9l-5.6-5.6 5.6-5.6h-6.9z" fill="#02569B"/>
    <path d="M14.3 12.3l-5.6 5.6 3.5 3.5 2.1-2.1 3.5-3.5-3.5-3.5z" fill="#0175C2"/>
    <path d="M12.2 21.4l2.1 2.1h6.9l-5.6-5.6-3.4 3.5z" fill="#29B6F6"/>
  </svg>
);

export const DartIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg viewBox="0 0 24 24" fill="#0175C2" className={className} {...props}>
    <path d="M4.5 4.5l10.8 1.2-1.7 5.2 6.9 2.1-3 7L4.5 4.5z"/>
  </svg>
);

export const GitIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg viewBox="0 0 24 24" fill="#F05032" className={className} {...props}>
    <path d="M21.7 10.7l-8.4-8.4c-.7-.7-1.8-.7-2.5 0L8.6 4.5 11 6.9c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l2.4 2.4c.5-.2 1.1-.1 1.5.3.6.6.6 1.6 0 2.2-.6.6-1.6.6-2.2 0-.4-.4-.5-1-.3-1.5L11.8 9.7v5c.2.1.3.3.4.4.6.6.6 1.6 0 2.2-.6.6-1.6.6-2.2 0-.6-.6-.6-1.6 0-2.2.2-.2.4-.3.6-.4V9.5c-.2-.1-.4-.2-.6-.4-.4-.4-.5-1-.3-1.5L7.3 5.2 2.3 10.2c-.7.7-.7 1.8 0 2.5l8.4 8.4c.7.7 1.8.7 2.5 0l8.5-8.5c.7-.6.7-1.7 0-2.4z"/>
  </svg>
);

export const VercelIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M12 2L24 22H0L12 2Z"/>
  </svg>
);

export const RagBrainIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#00ff66" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
    <line x1="12" y1="9" x2="8" y2="9" />
    <line x1="12" y1="13" x2="16" y2="13" />
  </svg>
);
