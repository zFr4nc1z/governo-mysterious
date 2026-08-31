/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gov: {
          black: '#0a0a0a',
          surface: '#121212',
          surface2: '#1a1a1a',
          gold: '#c9a24b',
          'gold-light': '#e4c777',
          'gold-dark': '#8a6d2f',
        },
      },
      fontFamily: {
        display: ['"Cinzel"', '"Georgia"', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 20px rgba(201, 162, 75, 0.35)',
      },
    },
  },
  plugins: [],
}
