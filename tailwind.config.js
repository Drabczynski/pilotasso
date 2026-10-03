/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './promo/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b1b33',
        paper: '#f6f7f4',
      },
      letterSpacing: {
        display: '-0.045em',
        heading: '-0.035em',
        snug: '-0.02em',
        body: '-0.011em',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        flow: {
          to: { strokeDashoffset: '-24' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        flow: 'flow 1.2s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
