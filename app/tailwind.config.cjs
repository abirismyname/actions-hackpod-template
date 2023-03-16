/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'rich-black': '#020419',
      },
      dropShadow: {
        light: '0 4px 8px rgba(176, 188, 222, 0.8)',
        dark: '0 4px 8px rgba(58, 108, 140, 1)',
      },
    },
  },
  plugins: [],
};
