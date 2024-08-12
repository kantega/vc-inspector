import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
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
        'light-purple': '#F6F4F7',
        'readable-gray': '#707070',
        'light-gray': '#EBEBEB',
        'dark-gray': '#C6C6C6',
        'light-blue': '#CCD5FF',
        'dark-blue': '#00199A',
        'light-yellow': '#FEFFCC',
        'dark-yellow': '#676700',
        'light-red': '#FFCDCD',
        'dark-red': '#990000',
        'light-green': '#CAFFCC',
        'dark-green': '#07470D',
        violet: {
          'kantega-200': 'hsl(var(--violet-200))',
          'kantega-300': 'hsl(var(--violet-300))',
          'kantega-400': 'hsl(var(--violet-400))',
          'kantega-700': 'hsl(var(--violet-700))',
          'kantega-900': 'hsl(var(--violet-900))',
        },
        purple: {
          'kantega-500': 'hsl(var(--purple-kantega-500))',
          'kantega-600': 'hsl(var(--purple-kantega-600))',
          'kantega-700': 'hsl(var(--purple-kantega-700))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
