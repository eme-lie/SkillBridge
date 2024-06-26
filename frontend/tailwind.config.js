/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Keeps Roboto as the default sans-serif font
        manrope: ["Manrope", "sans-serif"], // Adds Manrope as a custom font
      },
    },
  },
  plugins: [],
};
