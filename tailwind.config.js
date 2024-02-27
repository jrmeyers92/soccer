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
                    DEFAULT: "#58A4B0",
                    50: "#D5E8EB",
                    100: "#C7E0E4",
                    200: "#ABD1D7",
                    300: "#8FC2CA",
                    400: "#74B3BD",
                    500: "#58A4B0",
                    600: "#43838D",
                    700: "#316067",
                    800: "#1F3C41",
                    900: "#0D191B",
                    950: "#040708",
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
