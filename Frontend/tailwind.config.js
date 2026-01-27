/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'khan-green': '#14bf96', // Màu xanh đặc trưng của Khan Academy
        'khan-blue': '#0070f3',
      }
    },
  },
  plugins: [],
}