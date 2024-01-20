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
      screens: {
        xs: "480px",
      },
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
      keyframes: {
        nav: {
          from: { "clip-path": "inset(0 0 100% 0)" },
          to: { "clip-path": "inset(0 0 0 0)" },
        },
      },
      animation: {
        "nav-show": "nav 1000ms cubic-bezier(0.4, 0, 0.2, 1)",
      },
      typography: (theme) => ({
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
        DEFAULT: {
          css: {
            color: theme("colors.dark"),

            // ...
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
