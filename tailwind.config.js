module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideUp: 'slideUp 0.5s ease-out',
        scale: 'scale 0.5s ease-out',
      },
    },
  },
  plugins: [],
}