/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
    content: [
        "./resources/**/*.antlers.html",
        "./resources/**/*.antlers.php",
        "./content/**/*.md",
    ],

    theme: {
        fontFamily: {
            sans: [
                "Lato", "sans-serif"
            ],
            sanserif: [
                "Roboto Slab", "serif"
            ]
          },
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#0088CE",
                    50: "#87D6FF",
                    100: "#72CFFF",
                    200: "#49C1FF",
                    300: "#21B3FF",
                    400: "#00A3F7",
                    500: "#0088CE",
                    600: "#006396",
                    700: "#003E5E",
                    800: "#001926",
                    900: "#000000",
                    950: "#000000",
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
                    950: "#030000",
                },
                "bg-primary": "#02A0EE",
            },
        },
        screens: {
            xs: "475px",
            ...defaultTheme.screens,
        },
    },

    plugins: [require("@tailwindcss/typography")],
};
