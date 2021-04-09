const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light-blue': colors.lightBlue,
        green: colors.green,
        teal: colors.teal,
        cyan: colors.cyan,
        red: colors.red,
        orange: colors.orange,
        lime: colors.lime
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}