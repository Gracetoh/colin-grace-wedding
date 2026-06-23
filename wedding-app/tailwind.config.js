/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fdf2f5', 100: '#fce7ec', 200: '#f9cfdb', 300: '#f4a8bf',
          400: '#ec7499', 500: '#df4d77', 600: '#c9305d', 700: '#a8244b',
          800: '#8d2142', 900: '#79203c',
        },
        sage: {
          50: '#f4f7f4', 100: '#e5ece4', 200: '#cbd9c9', 300: '#a6bea3',
          400: '#7c9d78', 500: '#5d8058', 600: '#496644', 700: '#3b5237',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
