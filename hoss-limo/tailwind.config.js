module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#0f172a',
          'secondary': '#334155',
          'accent': '#c8a45c',
        },
        fontFamily: {
          'sans': ['Poppins', 'sans-serif'],
          'serif': ['Playfair Display', 'serif'],
        },
      },
    },
    variants: {
        extend: {
            scale: ['group-hover'],
            transform: ['group-hover'],
            letterSpacing: ['group-hover']
        },
      },
    plugins: [],
  }