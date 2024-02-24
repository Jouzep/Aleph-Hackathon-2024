/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navbar: "rgba(248, 250, 252,0.8)",
        background: "#16161a",
        backgroundRgba: "rgba(22, 22, 26,0.3)",
        button: "#7f5af0",
        buttonhover: "#7552de",
        headline: "#fffffe",
        text: "#94a1b2",
        border: "#010101",
        secondary: "#72757e",
      },
      fontFamily: {
        poppins: "Poppins",
        poppinsBold: "Poppins-Bold",
        poppinsSemiBold: "Poppins-SemiBold",
        poppinsMedium: "Poppins-Medium",
        poppinsLight: "Poppins-Light",
      },
    },
  },
  plugins: [],
};
