/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      "2xl": "1400px",
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        // Light Mode Colors
        primary_light: "#57A2FF",
        hover_light: "#F6F6F6",
        border_light: "#DDDDDD",
        text_light: "#191A23",
        icon_light: "#191A23",
        background_light: "#FFFFFF",
        background_alt_light: "#F6F6F6",
        success_light: "#4CAF50",
        success_hover_light: "#45A049",
        destructive_light: "#FF4B4B",
        destructive_hover_light: "#E04141",
        // Dark Mode Colors
        background_dark: "#191A23",
        icon_dark: "#A0A1B7",
        border_dark: "#2E2F39",
        hover_dark: "#262736",
        text_dark: "#FFFFFF",
        background_alt_dark: "#262736",
        success_dark: "#1E7E4E",
        success_hover_dark: "#2A9F68",
        destructive_dark: "#992828",
        destructive_hover_dark: "#B33A3A",
      },
      width: {
        30: "30%",
        55: "55%",
        45: "45%",
      },
    },
  },
  plugins: [],
};
