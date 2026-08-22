import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-main, #080b11)",
        surface: {
          50: "rgb(var(--surface-50-rgb, 22 29 42) / <alpha-value>)",
          100: "rgb(var(--surface-100-rgb, 19 25 36) / <alpha-value>)",
          200: "rgb(var(--surface-200-rgb, 15 20 31) / <alpha-value>)",
          300: "rgb(var(--surface-300-rgb, 11 15 23) / <alpha-value>)",
          400: "rgb(var(--surface-400-rgb, 8 11 17) / <alpha-value>)",
        },
        brand: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          accent: "#00f0ff",
        },
        sap: {
          gold: "#f59e0b",
          blue: "#0284c7",
          navy: "#1e3a8a",
          teal: "#0d9488",
          emerald: "#10b981",
          purple: "#8b5cf6",
          rose: "#f43f5e",
        },
        border: "var(--border-main, rgba(255, 255, 255, 0.08))",
        card: "var(--bg-card, rgba(15, 20, 31, 0.75))",
        glass: "var(--glass-bg, rgba(255, 255, 255, 0.03))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px -5px rgba(6, 182, 212, 0.35)",
        "glow-purple": "0 0 20px -5px rgba(139, 92, 246, 0.35)",
        "glow-emerald": "0 0 20px -5px rgba(16, 185, 129, 0.35)",
        "glow-amber": "0 0 20px -5px rgba(245, 158, 11, 0.35)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "border-glow": "borderGlow 3s ease infinite",
        shimmer: "shimmer 2.5s infinite",
      },
      keyframes: {
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(6, 182, 212, 0.2)" },
          "50%": { borderColor: "rgba(6, 182, 212, 0.8)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
