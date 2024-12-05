/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        'primaryMain': 'rgba(17, 24, 39, var(--tw-bg-opacity, 1))',
        'secondary': '#00ff00',
        'tertiary': '#0000ff',
      },
    },
  },
  plugins: [],
}

