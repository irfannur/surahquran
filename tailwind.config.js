/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Mengaktifkan dark mode berbasis class
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Contoh warna utama
      },
    },
  },
  plugins: [],
};
