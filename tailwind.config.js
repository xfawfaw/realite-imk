/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#7A0006",
          crimson: "#7A0006",
          bright: "#A60009",
          dark: "#450003",
          glow: "rgba(122, 0, 6, 0.4)",
        },
        dark: {
          base: "#0A0A0A",
          card: "#111112",
          cardHover: "#161618",
          surface: "#18181B",
          border: "#222226",
          subtle: "#2A2A30",
        },
        bone: {
          DEFAULT: "#F4F4F0",
          muted: "#D4D4CD",
          dark: "#8C8C85",
        },
        status: {
          ready: "#10B981",
          po: "#F59E0B",
          soldout: "#EF4444",
        },
        border: "hsl(var(--border, 240 3.7% 15.9%))",
        input: "hsl(var(--input, 240 3.7% 15.9%))",
        ring: "hsl(var(--ring, 355 100% 24%))",
        background: "hsl(var(--background, 240 10% 3.9%))",
        foreground: "hsl(var(--foreground, 0 0% 98%))",
        primary: {
          DEFAULT: "#7A0006",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 240 3.7% 15.9%))",
          foreground: "hsl(var(--secondary-foreground, 0 0% 98%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 62.8% 30.6%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 98%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 240 3.7% 15.9%))",
          foreground: "hsl(var(--muted-foreground, 240 5% 64.9%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 240 3.7% 15.9%))",
          foreground: "hsl(var(--accent-foreground, 0 0% 98%))",
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
        display: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
  ],
};
