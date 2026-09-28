/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem" },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#120c0a",
          soft: "#1d1411",
          line: "#3a2a22",
        },
        cinnabar: {
          DEFAULT: "#a11d1d",
          dark: "#6f1111",
          deep: "#4a0b0b",
          light: "#c43a2c",
        },
        gold: {
          DEFAULT: "#d2a95b",
          light: "#ecd29a",
          deep: "#a9803a",
        },
        paper: {
          DEFAULT: "#f6efe2",
          dark: "#ebdfc8",
          line: "#dccbaa",
        },
      },
      fontFamily: {
        zh: ["'Noto Serif SC'", "'Songti SC'", "serif"],
        brush: ["'Ma Shan Zheng'", "'KaiTi'", "'STKaiti'", "serif"],
        serif: ["'Playfair Display'", "'Noto Serif SC'", "serif"],
        sans: ["'Poppins'", "'Noto Serif SC'", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 40px -22px rgba(18, 12, 10, 0.55)",
        glow: "0 10px 30px -10px rgba(210, 169, 91, 0.55)",
        red: "0 12px 30px -12px rgba(161, 29, 29, 0.7)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        steam: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.5" },
          "50%": { transform: "translateY(-6px)", opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.9s cubic-bezier(.2,.7,.2,1) both",
        slowZoom: "slowZoom 9s ease-out both",
        steam: "steam 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
