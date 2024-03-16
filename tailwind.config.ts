import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ['class'],
  content: ['./src/app/**/*.{ts,tsx}', './src/stories/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'dark-purple': '#2C0040',
        'readable-gray': '#8E8C8C',
        'subtle-gray': '#C6C6C6',
        'light-blue': '#CCD5FF',
        'dark-blue': '#00199A',
        'light-yellow': '#FEFFCC',
        'dark-yellow': '#676700',
        'light-red': '#FFCDCD',
        'dark-red': '#990000',
        'light-green': '#CAFFCC',
        'dark-green': '#07470D',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
