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
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
};
export default config;
