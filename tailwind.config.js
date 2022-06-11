module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "dark-blue": "hsl(209, 23%, 22%)",
      "very-dark-blue": "hsl(207, 26%, 17%)",
      text: "hsl(200, 15%, 8%)",
      "dark-grey": "hsl(0, 0%, 52%)",
      "light-grey": "hsl(0, 0%, 98%)",
      white: "hsl(0, 0%, 100%)",
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
  },
  plugins: [],
  darkMode: "class",
};
