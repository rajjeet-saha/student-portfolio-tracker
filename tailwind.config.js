/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        fintech: {
          bg: "#050816",
          card: "#0f172a",
          line: "#1e293b",
          accent: "#22d3ee",
          success: "#22c55e",
          danger: "#f43f5e"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 6, 23, 0.35)"
      }
    }
  },
  plugins: []
};
