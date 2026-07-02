/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#64748B",
        success: "#16A34A",
        danger: "#DC2626",
        warning: "#F59E0B",
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "3rem",
        },
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,0.08)",
      },
    },
  },

  plugins: [],
};
