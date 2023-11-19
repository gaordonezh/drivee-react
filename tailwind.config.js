const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'hero-texture': "url('/images/hero-bg.jpg')",
        auth: 'url(/images/auth-bg.jpg)',
        hero: 'url(/images/hero-bg.jpg)',
        booking: 'url(/images/booking-bg.jpg)',
      },
      backgroundColor: {
        'people-say': 'rgba(0, 0, 0, 0.5)',
      },
      width: {
        'drawer-right': 'calc(100vw - 400px)',
      },
    },
  },
  plugins: [],
};
