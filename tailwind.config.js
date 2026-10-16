/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        terminal: "#00ff66",
        "terminal-dim": "#042f14",
        "terminal-bright": "#66ff99",
        "cyber-green": "#00ff66",
        "cyber-glow": "#33ff85",
        "cyber-dark": "#08090c",
        "cyber-panel": "#0c0e14",
        "cyber-card": "#11141c",
        "cyber-card-hover": "#171c26",
        "cyber-border": "rgba(0, 255, 102, 0.16)",
        "cyber-border-strong": "rgba(0, 255, 102, 0.4)",
        "bg-primary": "#08090c",
        "bg-card": "#0f121a",
        "bg-card-hover": "#161b24",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Share Tech Mono'", "monospace"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "'Inter'", "sans-serif"],
      },
      boxShadow: {
        terminal: "0 0 20px rgba(0, 255, 102, 0.25)",
        "terminal-lg": "0 0 45px rgba(0, 255, 102, 0.3)",
        neon: "0 0 30px rgba(0, 255, 102, 0.3)",
        "neon-sm": "0 0 12px rgba(0, 255, 102, 0.25)",
        "neo-brutal": "4px 4px 0px #00ff66",
        "neo-brutal-sm": "2px 2px 0px #00ff66",
        "neo-brutal-dim": "4px 4px 0px rgba(0, 255, 102, 0.2)",
      },
      backgroundImage: {
        "cyber-grid": "radial-gradient(circle, rgba(0, 255, 102, 0.08) 1px, transparent 1px)",
        "cyber-scanline": "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
      },
    },
  },
  plugins: [],
}