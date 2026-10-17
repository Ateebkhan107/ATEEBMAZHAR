export default function StaticCore() {
  return (
    <div className="static-core cyber-grid-bg">
      <svg viewBox="0 0 320 180" fill="none" aria-hidden="true">
        <g stroke="#00ff66" strokeOpacity=".6">
          <ellipse cx="160" cy="90" rx="112" ry="38" transform="rotate(-20 160 90)" />
          <ellipse cx="160" cy="90" rx="86" ry="62" transform="rotate(25 160 90)" stroke="#38bdf8" />
          <path d="m160 38 46 26 0 52-46 26-46-26V64zM160 38v104m-46-78 92 52m0-52-92 52m0-52 46 26 46-26m-92 52 46-26 46 26" />
        </g>
        <path d="m160 68 19 22-19 23-19-23z" fill="#00ff66" fillOpacity=".8" />
        <g fill="#00ff66"><circle cx="54" cy="121" r="3"/><circle cx="262" cy="57" r="3"/><circle cx="234" cy="131" r="2"/></g>
      </svg>
      <span className="font-mono text-[10px] text-[#00ff66] tracking-widest">BUILD · SHIP · EVOLVE</span>
    </div>
  );
}
