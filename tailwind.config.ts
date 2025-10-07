import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-scrollbar/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "terminal-green": "#22c55e",
        card: "#1e1e1e",
        border: "#2d2d2d",
        foreground: "#f8fafc",
        "muted-foreground": "#9ca3af",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        badgePop: {
          "0%": { transform: "scale(0.8)", opacity: 0 },
          "50%": { transform: "scale(1.1)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        slideDown: "slideDown 0.4s ease-out",
        badgePop: "badgePop 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
