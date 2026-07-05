import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f7f5',
          100: '#f0e8e1',
          200: '#e0cfc0',
          300: '#cdb59a',
          400: '#b89980',
          500: '#a89b86',
          600: '#98855f',
          700: '#81704d',
          800: '#6b6560',
          900: '#564f48',
        },
        warmPink: '#e8c9c9',
        warmPeach: '#e6d1c1',
        creamBg: '#f5e6d3',
      },
    },
  },
  plugins: [],
}
export default config
