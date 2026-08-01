import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5F3EC",
        "paper-line": "#DCD7C6",
        ink: "#2B3A67",
        "ink-soft": "#5A6690",
        redpen: "#C0392B",
        "redpen-soft": "#F3D9D5",
        gold: "#C89A3A",
        "gold-soft": "#F3E7C9",
        graphite: "#3A3A38",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        graph:
          "linear-gradient(#DCD7C6 1px, transparent 1px), linear-gradient(90deg, #DCD7C6 1px, transparent 1px)",
      },
      backgroundSize: {
        graph: "24px 24px",
      },
    },
  },
  plugins: [],
};

export default config;
