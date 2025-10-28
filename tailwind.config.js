/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#F5F1E8',
          dark: '#E8E2D5',
        },
        jade: {
          50: '#F0F7F4',
          100: '#DCEEE6',
          200: '#B9DDD0',
          300: '#88B9A2',
          400: '#6A9F87',
          500: '#4F8069',
          600: '#3D6554',
          700: '#325244',
          800: '#2A4438',
          900: '#24392F',
        },
        gold: {
          light: '#E8D090',
          DEFAULT: '#D4AF37',
          dark: '#B8941F',
        },
        zen: {
          50: '#F8F8F7',
          100: '#E8E6E3',
          200: '#D1CEC9',
          300: '#B4B0A8',
          400: '#918C82',
          500: '#6F6B63',
          600: '#5A5650',
          700: '#4A4641',
          800: '#3A3A3A',
          900: '#2D2C28',
        },
        wood: {
          light: '#A78B66',
          DEFAULT: '#8B6F47',
          dark: '#6E5836',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Noto Sans SC', 'system-ui', 'sans-serif'],
      },
    },
  },
};
