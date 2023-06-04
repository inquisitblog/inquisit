const { theme } = require("tailwindcss/defaultConfig")

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
      spacing: {
        18: "4.5rem",
      },
      gridTemplateColumns: {
        "1-2": "1.5fr 2fr",
      },
      typography: {
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
