/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14B8A6', // Teal
        secondary: '#F97316', // Orange
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
