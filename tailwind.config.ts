import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {
      colors: {
        "bb-accent": "#ff5f1f",
        "bb-action": "#ff0",
        "bb-success": "#50ad44",
      },
      fontFamily: {
        just: ["JustSans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      }
    },
  },
  plugins: [
    require("preline/plugin"),
  ],
};
export default config;

// https://www.dafont.com/es/just-sans.font => titles
// montserrat => body
