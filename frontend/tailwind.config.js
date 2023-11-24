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
      'white': '#ffffff',
      'strokeColor' : '#D2D2D2',
      'red':'#DC3545',
      'lightGray':'#BCBCBC'
    },
    fontFamily: {
      heading: ['Playfair Display', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
    }
  },
  plugins: [],
}

