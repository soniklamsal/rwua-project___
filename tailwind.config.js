/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'core-blue': '#0100FA',
        'flash-yellow': '#FEFF3E',
        'impact-red': '#FA0105',
      },
      fontFamily: {
        'nepali': ['Noto Sans Devanagari', 'sans-serif'],
        'serif-impact': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
