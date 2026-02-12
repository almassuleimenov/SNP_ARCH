import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ВОТ СЮДА НУЖНО ДОБАВИТЬ ЭТОТ БЛОК:
      fontFamily: {
        // Теперь класс font-sans будет использовать Inter
        sans: ["var(--font-inter)", "sans-serif"],
        // А класс font-serif будет использовать Playfair Display (для заголовков)
        serif: ["var(--font-playfair)", "serif"],
      },
      // (Тут могут быть другие настройки, типа colors, если они были)
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