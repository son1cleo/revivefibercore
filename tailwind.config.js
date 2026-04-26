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
        forest: "#1f4d3d",
        sage: "#9bbf9a",
        mint: "#d8f1df",
        olive: "#667a4f",
        cream: "#f8f5ed",
        charcoal: "#1f2a24"
      },
      boxShadow: {
        soft: "0 12px 42px rgba(34, 70, 52, 0.12)"
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-16px,0)" }
        }
      },
      animation: {
        drift: "drift 9s ease-in-out infinite"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
