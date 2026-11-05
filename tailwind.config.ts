import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wine: { 50: "#fdf0f0", 100: "#f8d9db", 200: "#eba9b0", 300: "#d96e7b", 400: "#c1414f", 500: "#a22436", 600: "#8b1427", 700: "#750d1f", 800: "#5e0a19", 900: "#470612", 950: "#35040d" },
        blush: "#f8e5de",
        cream: "#fae7e0",
        gold: { 300: "#f3d3ab", 400: "#eebe8d", 500: "#c99a5b", 600: "#a97b3f" },
        pennsa: "#d2161f",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        sub: ["var(--font-cardo)", "Georgia", "serif"],
        body: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      letterSpacing: { brand: "0.32em" },
    },
  },
  plugins: [],
} satisfies Config;
