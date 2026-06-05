/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#141414",
        palm: "#17765b",
        saffron: "#f0a202",
        clay: "#b85c38"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(20, 20, 20, 0.12)"
      }
    }
  },
  plugins: []
};
