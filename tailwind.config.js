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
        'deep-purple': '#4c1d95',
        'vibrant-gold': '#d97706',
        'terracotta': '#dc2626',
        'core-blue': '#2563eb',
        'impact-red': '#dc2626',
      },
      fontFamily: {
        'nepali': ['Noto Sans Devanagari', 'sans-serif'],
        'serif-impact': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}