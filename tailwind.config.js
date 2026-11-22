/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#03203c', // Deep navy canvas
          900: '#07325b', // Deep ocean blue
          850: '#0a437a', // Refined deep ocean
          800: '#0369a1', // Vibrant deep cerulean
          700: '#0284c7', // Sky cyan-blue
          600: '#01aafd', // Exactly user's azure electric blue (#01aafd)
          500: '#38bdf8', // Soft sky blue
          50: '#f0f9ff',  // Clean light blue tint
        },
        gold: {
          600: '#0284c7', // Rich azure blue
          500: '#01aafd', // User vivid azure blue
          400: '#38bdf8', // Bright cyan-sky
          300: '#7dd3fc', // Soft bright blue
          50: '#f0f9ff',  // Subtle sky tint
        },
        emerald: {
          950: '#03203c',
          900: '#07325b',
          850: '#0a437a',
          800: '#0369a1',
          700: '#0284c7',
          600: '#01aafd',
          500: '#38bdf8',
          400: '#7dd3fc',
          300: '#bae6fd',
          200: '#e0f2fe',
          100: '#f0f9ff',
          50: '#f8fafc',
        },
        cream: {
          50: '#f8fafc',
          100: '#f0f9ff',
          200: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
