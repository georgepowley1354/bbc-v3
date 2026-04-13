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
          deep: "#0F1210",
          mid: "#1E2A20",
        },
        sage: {
          DEFAULT: "#5A8A62",
          light: "#78B084",
        },
        gold: {
          DEFAULT: "#B8934B",
          light: "#CCA95E",
        },
        stone: {
          warm: "#F2EDE4",
          mid: "#E8E2D6",
          dark: "#D0C9BC",
        },
        "off-white": "#FAFAF7",
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
