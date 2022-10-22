/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00AAEE",
          50: "#A7E6FF",
          100: "#92E0FF",
          200: "#69D4FF",
          300: "#41C9FF",
          400: "#18BDFF",
          500: "#00AAEE",
          600: "#0082B6",
          700: "#005A7E",
          800: "#003246",
          900: "#000A0E",
        },
        secondary: {
          DEFAULT: "#FE2301",
          50: "#FFC1B8",
          100: "#FFB0A4",
          200: "#FE8D7B",
          300: "#FE6952",
          400: "#FE462A",
          500: "#FE2301",
          600: "#C61B01",
          700: "#8E1401",
          800: "#560C00",
          900: "#1E0400",
        },
      },
    },
  },
  plugins: [],
};
