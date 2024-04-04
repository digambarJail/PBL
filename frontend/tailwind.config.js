/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      keyframes: {
        animateHeart: {
          '0%': { 
            transform: 'scale(.2)',
            backgroundColor: 'transparent', // Start with a transparent background
          },
          '40%': { 
            transform: 'scale(1.2)',
            backgroundColor: 'green', // No change in background color
          },
          '100%': { 
            transform: 'scale(1)',
            backgroundColor: 'green', // Change background color to green
          },
        },
        animateHeartOut: {
          '0%': { transform: 'scale(1.4)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        heart: 'animateHeart 0.4s ease-in-out',
        heartOut: 'animateHeartOut 0.4s ease-in-out',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};