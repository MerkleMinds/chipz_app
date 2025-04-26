import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin'; // Import the plugin function

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
        "bb-success": "#23C45E",
        "bb-error": "#EF4444",
        "bb-black": "#111827",
        "chipz-gray-light": "#A3A3A3",
      },
      fontFamily: {
        just: ["JustSans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [
    require("preline/plugin"),
    plugin(function({ addUtilities }) {
      addUtilities({
        '.border-chipz-custom': {
          borderWidth: '0.125px',
          borderColor: 'rgba(163, 163, 163, 0.5)',
        }
      })
    })
  ],
};
export default config;

// https://www.dafont.com/es/just-sans.font => titles
// montserrat => body
