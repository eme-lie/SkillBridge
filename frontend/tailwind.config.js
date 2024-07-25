/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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

      fontSize: {
        h1: ["36px", { lineHeight: "43.2px", fontWeight: "700" }],
        h2: ["21px", { lineHeight: "25px", fontWeight: "700" }],
        t1: ["16px", { lineHeight: "24px", fontWeight: "700" }],
        t2: ["16px", { lineHeight: "24px", fontWeight: "500" }],
        t3: ["14px", { lineHeight: "17px", fontWeight: "700" }],
        t4: ["14px", { lineHeight: "17px", fontWeight: "300" }],
        b1: ["16px", { lineHeight: "24px", fontWeight: "300" }],
        b2: ["16px", { lineHeight: "24px", fontWeight: "300" }],
        b3: ["14px", { lineHeight: "17px", fontWeight: "700" }],
        b4: ["14px", { lineHeight: "17px", fontWeight: "400" }],
        b5: ["14px", { lineHeight: "17px", fontWeight: "300" }],
        sb1: ["12px", { lineHeight: "16px", fontWeight: "300" }],
        sb2: ["12px", { lineHeight: "16px", fontWeight: "500" }],
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
        25: "25%",
        30: "30%",
        35: "35%",
        55: "55%",
        65: "65%",
        75: "75%",
        45: "45%",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        custom1:
          "rgba(0, 0, 0, 0.02) 0px 20px 43.008px 0px, rgba(0, 0, 0, 0.01) 0px 4px 16px 0px, rgba(0, 0, 0, 0.024) 0px 2px 6px 0px, rgba(0, 0, 0, 0.01) 0px 0px 2px 0px",
        custom2:
          "rgba(0, 0, 0, 0.02) 0px -20px 43.008px 0px, rgba(0, 0, 0, 0.01) 0px -4px 16px 0px, rgba(0, 0, 0, 0.024) 0px -2px 6px 0px, rgba(0, 0, 0, 0.01) 0px 0px 2px 0px",
      },
    },
  },
  plugins: [],
};
