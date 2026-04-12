import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          deep: "#1C2B1E",
          mid: "#2A3E2C",
        },
        sage: {
          DEFAULT: "#4A7C59",
          light: "#6B9E7A",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#D9B96C",
        },
        stone: {
          warm: "#F5F0E8",
          mid: "#EBE5D9",
          dark: "#D4CCC0",
        },
        "off-white": "#FAF9F6",
        "text-primary": "#1A1A1A",
        "text-secondary": "#4A4A4A",
        "text-muted": "#7A7A6E",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "72px",
        "22": "88px",
        "26": "104px",
        "30": "120px",
        "34": "136px",
        "38": "152px",
        "42": "168px",
        section: "128px",
        "section-sm": "80px",
      },
    },
  },
  plugins: [],
};
export default config;
