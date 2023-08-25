/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-in-right': 'slideInRight 1s ease-in-out',
        'slide-in-left': 'slideInLeft 1s ease-in-out',

      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      colors: {
        primary: "#ff385c"
      },
      fontFamily: {
        family: "Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif"
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require('tailwind-scrollbar'),
  ],
  corePlugins: {
    animation: true,
  },
}
