module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EB008B", // LG U+ 메인 핑크
        accent: "#1C1C1C", // 다크 텍스트
        secondary: "#FAFAFA", // 배경
        card: "#FFFFFF", // 카드 배경
        border: "#E0E0E0", // 경계선
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
