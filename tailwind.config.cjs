/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        // LG U+ 브랜드 컬러
        "uplus-magenta": "#cc338b", // Magenta Pink
        "uplus-magenta-alt": "#FF007C", // Alternate Magenta
        "uplus-navy": "#02075D", // Dark Navy
        "uplus-navy-alt": "#0B0B45", // Dark Navy Alt
        "uplus-white": "#FFFFFF", // White
        "uplus-black": "#000000", // Black
      },
      fontFamily: {
        headline: ["LGEIHeadline", "sans-serif"],
        text: ["LGEIText", "sans-serif"],
      },
    },
  },
  plugins: [],
};
