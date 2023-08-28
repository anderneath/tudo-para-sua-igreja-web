/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        text: {
			DEFAULT: '#022431',
			dark: '#fafeff'
		},
        background: {
			DEFAULT: '#fafeff',
			dark: '#022431'
		},
        primary: {
			DEFAULT: '#4BCFFF',
			dark: '#4BCFFF'
		},
        secondary: {
			DEFAULT: '#e9f6fb',
			dark: '#0c3140'
		},
        accent: {
			DEFAULT: '#2f88ab',
			dark: '#92cbe1'
		}
      }
    }
  },
  plugins: []
}