/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7147ED",
        secondary: "#F9F9F9",
        textPrimary: "#3F3F3F",
      },
    },
  },
  plugins: [],
};
