// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b0d7d",
        accent: "#14b8a6",
        bgGradientStart: "#6366f1",
        bgGradientEnd: "#38bdf8",
        darkText: "#1e293b",
        lightText: "#f3f4f6",
        googlePurple: "#673AB7", // Form header background
        googleLightPurple: "#F3E5F5", // Light background for inputs
        googleRed: "#d93025", // Required field indicator
        googleGray: "#5F6368", // General text color
        googleDarkGray: "#3C4043", // Darker text
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Roboto", "sans-serif"],
        sans: ["Roboto", "Arial", "sans-serif"], // Match Google Forms' font
      },
    },
  },
  plugins: [],
};
