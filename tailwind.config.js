const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        noto: ["Noto", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        bi: "inset -10px 0px 16px -14px",
      },
    },
  },
  plugins: [],
};
