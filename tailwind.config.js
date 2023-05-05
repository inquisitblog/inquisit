const { theme } = require("tailwindcss/defaultConfig");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", ...theme.fontFamily.sans],
      },
      colors: {
        dark: "#182A3B",
        light: "#FBEAD2",
        lighter: "#FFF4E3",
        accent: "#2079CC",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
