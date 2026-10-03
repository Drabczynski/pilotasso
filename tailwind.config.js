/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
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
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
