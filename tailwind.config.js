/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandNavy: "#002060",
        brandBlue: "#1E3A8A",
        brandBlueDeep: "#1E40AF",
        brandLightBlue: "#B4C7E7"
      },
      keyframes: {
        bgMove: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" }
        }
      },
      animation: {
        bgMove: "bgMove 20s linear infinite"
      }
    },
    fontFamily: {
      sans: ["Inter", "system-ui", "Arial", "sans-serif"]
    }
  },
  plugins: [],
};