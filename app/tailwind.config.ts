import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ОБЪЕДИНЕННЫЙ И ПРАВИЛЬНЫЙ БЛОК:
      fontFamily: {
        // Для обычного текста (Inter или Manrope — чистый, читаемый)
        sans: ["var(--font-sans)", "sans-serif"], 
        // Для заголовков (Cormorant Garamond — дорогой, архитектурный)
        serif: ["var(--font-serif)", "serif"], 
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;