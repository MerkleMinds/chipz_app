import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin'; // Import the plugin function

// Define our color palette in one place for consistency
const colors = {
  // Brand colors
  'bb-accent': '#ff5f1f',
  'bb-action': '#ff0',
  'bb-success': '#23C45E',
  'bb-success-dark': '#1ca04c', // Darker shade for hover states
  'bb-error': '#EF4444',
  'bb-error-dark': '#dc2626', // Darker shade for hover states
  
  // Background colors
  'bb-bg-app': '#111827',      // Main app background (gray-900)
  'bb-bg-card': '#1f2937',     // Card/component background (gray-800)
  'bb-bg-card-dark': '#111827', // Darker card background (gray-900)
  'bb-bg-card-hover': '#374151', // Hover state for cards (gray-700)
  
  // Other colors
  'bb-black': '#111827',
  'chipz-gray-light': '#A3A3A3',
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        just: ["JustSans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [
    require("preline/plugin"),
    plugin(function({ addUtilities, addBase }) {
      // Add CSS variables for all our colors
      addBase({
        ':root': Object.entries(colors).reduce<Record<string, string>>((acc, [key, value]) => {
          acc[`--color-${key}`] = value;
          return acc;
        }, {}),
      });
      
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
