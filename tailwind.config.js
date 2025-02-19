/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
     
    extend: {
      colors: {
        primary: '#1e3a8a', // Navy for primary buttons/links
        secondary: '#f3f4f6', // Light gray for backgrounds
        accent: '#4f46e5', // Indigo for hover states
      },
      animation: {
        spin: "spin 1s linear infinite",
        'spin-reverse': "spin-reverse 1s linear infinite",
      },
      keyframes: {
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};