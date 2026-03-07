/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A3C34',
          light: '#2A5C4E',
          dark: '#0F2620',
        },
        accent: {
          DEFAULT: '#C25E00',
          light: '#D97014',
          dark: '#A34D00',
        },
        secondary: '#F9FAF8',
        neutral: '#E5E7EB',
        foreground: '#0A0A0A',
        background: '#FFFFFF',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'premium': '0 8px 30px rgb(0,0,0,0.04)',
        'card': '0 4px 20px rgba(26, 60, 52, 0.08)',
        'card-hover': '0 12px 40px rgba(26, 60, 52, 0.12)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
