/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        utla: {
          navy: {
            DEFAULT: '#0F2042',
            light: '#1A3668',
            dark: '#0A162C',
            deep: '#060E1D',
          },
          gold: {
            DEFAULT: '#C5A859',
            light: '#DEC882',
            dark: '#A68838',
            amber: '#D97706',
          },
          slate: {
            bg: '#F8FAFC',
            surface: '#F1F5F9',
            border: '#E2E8F0',
            muted: '#64748B',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 32, 66, 0.06), 0 1px 2px 0 rgba(15, 32, 66, 0.04)',
        'card': '0 4px 12px -2px rgba(15, 32, 66, 0.08), 0 2px 6px -1px rgba(15, 32, 66, 0.04)',
        'elevated': '0 10px 25px -5px rgba(15, 32, 66, 0.12), 0 8px 10px -6px rgba(15, 32, 66, 0.06)',
      }
    },
  },
  plugins: [],
}
