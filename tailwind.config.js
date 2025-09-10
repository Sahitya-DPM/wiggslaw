/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'Helvetica', 'Arial', 'Lucida', 'sans-serif'],
        'montserrat': ['Montserrat', 'Helvetica', 'Arial', 'Lucida', 'sans-serif'],
      },
      colors: {
        'wiggs-blue': '#1e40af',
        'wiggs-blue-light': '#3b82f6',
        'wiggs-gold': '#fbbf24',
        'wiggs-gold-dark': '#f59e0b',
        'wiggs-gray': '#6b7280',
        'wiggs-gray-light': '#f8fafc',
        'wiggs-gray-dark': '#374151',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'header': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
