/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./lib/**/*.{js,jsx,ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#EEF6EE",
        surface: "#FFFFFF",
        "surface-2": "#E4F0E3",
        border: "#C4D8C3",
        accent: "#2F7A54",
        "accent-h": "#3F9368",
        "accent-bg": "#D2E9D6",
        text: {
          primary: "#1F3B2E",
          secondary: "#456556",
          muted: "#6B8779"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        soft: "0 16px 36px rgba(41, 83, 58, 0.12)"
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-16px,0)" }
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        drift: "drift 9s ease-in-out infinite",
        marquee: "marquee 30s linear infinite"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
