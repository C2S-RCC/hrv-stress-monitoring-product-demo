import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      colors: {
        ink: {
          900: '#132023',
          700: '#274249',
          600: '#415c63',
          500: '#60757c',
        },
        clinical: {
          50: '#f4fbfa',
          100: '#d9f0ed',
          300: '#86c9c2',
          500: '#2e9d92',
          700: '#1a6d66',
        },
        signal: {
          100: '#fde1df',
          500: '#e95f5c',
          600: '#c94845',
        },
        amber: {
          500: '#d9962b',
        },
      },
      boxShadow: {
        panel: '0 18px 48px rgba(19, 32, 35, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
