/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
       'cardShadow': '0 0 12px rgba(0, 0, 0, 0.30)',
      }
    },
  },
  plugins: [],
}