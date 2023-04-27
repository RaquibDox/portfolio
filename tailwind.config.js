/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/*.html'],
  theme: {
    // screens: {
    //   sm: '280px',
    //   md: '768px',
    //   lg: '976px'
    // },
    fontFamily:{
      'montserrat' : ['Montserrat', 'ui-sans-serif']
    },
    extend: {
      colors: {
        semiGray: '#1f1f1f',
        darkGray: '#141313',
        semiGreen: '#4A9A8F'
      }
    },
  },
  plugins: [],
}

