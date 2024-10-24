/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'border-gradient': 'linear-gradient(to right, #1ab3bc, #7953af)',
        'text-gradient': 'linear-gradient(to right, #1ab3bc, #7953af)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          background: 'linear-gradient(to right, #1ab3bc, #7953af)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.border-gradient': {
          position: 'relative',
          border: '2px solid transparent',
          borderRadius: '8px',
          backgroundImage: 'linear-gradient(to right, #1ab3bc, #7953af)',
          backgroundClip: 'border-box',
          '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}

