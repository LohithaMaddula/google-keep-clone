/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: '#faafa8',
        peach: '#f39f76',
        sand: '#fff8b8',
        mint: '#e2f6d3',
        sage: '#b4ddd3',
        fog: '#d4e4ed',
        storm: '#aeccdc',
        dusk: '#d3bfdb',
        blossom: '#f6e2dd',
        clay: '#e9e3d4',
        chalk: '#efeff1',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}
