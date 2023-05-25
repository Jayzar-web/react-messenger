/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {


        light: "#e3f2fd",
        dark: "#1E293B",

        lightBorders: "#bbdefb",
        darkBorders: "#314461",

        lightText: "#111827",
        darkText: "#F9FAFB",

        lightHover: "#90caf9",
        darkHover: "#4d82c7",

        lightPrimary: "#3B82F6",
        darkPrimary: "#60A5FA",

        lightSecondary: "#868e99",
        darkSecondary: "#FFFFFF",

        lightMessage: "#bbdefb",
        darkMessage: "#5270A1",

        lightSelfMessage: "#64b5f6",
        darkSelfMessage: "#729DE0",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}