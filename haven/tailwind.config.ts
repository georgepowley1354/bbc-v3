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
        haven: {
          bg: "#FAF8F5",
          surface: "#F2EDE6",
          "surface-elevated": "#EDE6DB",
          accent: "#7D9B76",
          "accent-interactive": "#4E6B48",
          "accent-hover": "#3D5538",
          secondary: "#C4896F",
          text: "#2C2C2C",
          "text-muted": "#6B6560",
          "text-inverse": "#FAF8F5",
          border: "#E4DDD4",
          "border-subtle": "#EDE8E1",
        },
      },
      fontFamily: {
        display: ["var(--font-lora)", "Georgia", "serif"],
        body: ["var(--font-raleway)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(44, 35, 28, 0.07), 0 1px 3px rgba(44, 35, 28, 0.04)",
        "card-hover":
          "0 8px 24px rgba(44, 35, 28, 0.12), 0 3px 6px rgba(44, 35, 28, 0.06)",
        "warm-sm":
          "0 1px 3px rgba(44, 35, 28, 0.06), 0 1px 2px rgba(44, 35, 28, 0.04)",
        "warm-md":
          "0 4px 12px rgba(44, 35, 28, 0.08), 0 2px 4px rgba(44, 35, 28, 0.05)",
        "warm-lg":
          "0 12px 32px rgba(44, 35, 28, 0.10), 0 4px 8px rgba(44, 35, 28, 0.06)",
      },
      borderRadius: {
        DEFAULT: "6px",
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
