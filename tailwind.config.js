/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#002F6C",
        secondary: "#FFD100",
        muted: "#555555"
      }
    }
  },
  plugins: []
};
