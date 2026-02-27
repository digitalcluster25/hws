/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',    // будет обновлено после брифа
        secondary: '#ffffff',  // будет обновлено после брифа
        accent: '#000000',     // будет обновлено после брифа
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
