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
                    DEFAULT: "#DCC137",
                    50: "#F7F1D3",
                    100: "#F4ECC2",
                    200: "#EEE19F",
                    300: "#E8D77C",
                    400: "#E2CC5A",
                    500: "#DCC137",
                    600: "#BAA121",
                    700: "#8B7818",
                    800: "#5B4F10",
                    900: "#2B2508",
                    950: "#131103",
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
