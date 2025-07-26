/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.html",
    "./partials/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'celeste': '#003399',
        'pink': '#E94A8B',
        'brand': '#F5D547'
      },
      fontFamily: {
        'comfortaa': ['Comfortaa', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
} 

