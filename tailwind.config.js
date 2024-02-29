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
            sans: ["Lato", "sans-serif"],
            sanserif: ["Roboto Slab", "serif"],
        },
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3E2723',
                    50: '#AC766C',
                    100: '#A56A5F',
                    200: '#8C584F',
                    300: '#724840',
                    400: '#583732',
                    500: '#3E2723',
                    600: '#1A100F',
                    700: '#000000',
                    800: '#000000',
                    900: '#000000',
                    950: '#000000'
                  },
                secondary: {
                    DEFAULT: "#373F51",
                    50: "#8E99B2",
                    100: "#818EAA",
                    200: "#697899",
                    300: "#586582",
                    400: "#485269",
                    500: "#373F51",
                    600: "#202530",
                    700: "#0A0B0E",
                    800: "#000000",
                    900: "#000000",
                    950: "#000000",
                },
            },
        },
        screens: {
            xs: "475px",
            ...defaultTheme.screens,
        },
    },

    plugins: [require("@tailwindcss/typography")],
};
