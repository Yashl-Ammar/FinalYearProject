/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'aamdanBlue': '#1FC2FA',
      'aamdanPurple': '#7F6FEA',
      'aamdanPink': '#EA11D7',
      
      'aamdanBackground': '#000000',
      'aamdanSuperDeepBlack': '#111111',
      'aamdanDeepBlack': '#1A1A1A',
      'aamdanDarkGray': '#222222',

      'aamdanBackgroundWhite': '#ffffff',
      'aamdanSuperDeepWhite': '#dddddd',
      'aamdanDeepWhite': '#cccccc',
      'aamdanDarkWhite': '#bbbbbb',

      'white': '#ffffff',
      'strokeColor' : '#D2D2D2',
      'red':'#DC3545',
      'green':'#1EBF72',
      'blue':'#1F57C3',
      'lightGray':'#BCBCBC',
      'lightGrayWhite':'#444444'
    },
    fontFamily: {
      heading: ['Playfair Display', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
    }
  },
  plugins: [],
}

