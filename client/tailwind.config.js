/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        tall: { raw: '(min-height: 800px)' },
        tall2: { raw: '(min-height: 850px)' },
        tall3: { raw: '(min-height: 900px)' },
        tall4: { raw: '(min-height: 950px)' },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
