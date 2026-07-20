/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0A192F",
        primary2: "#0F2340",
        secondary: "#D4AF37",
        secondaryDark: "#AA7C11",
        muted: "#8A94A6",
        glass: "rgba(255,255,255,0.06)"
      },
      fontFamily: {
        heading: ["Montserrat", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        floating: "0 10px 30px -10px rgba(0,0,0,0.5), 0 4px 12px -4px rgba(0,0,0,0.4)",
        goldGlow: "0 0 24px rgba(212,175,55,0.35)"
      },
      backdropBlur: {
        glass: "20px"
      }
    }
  },
  plugins: []
};
