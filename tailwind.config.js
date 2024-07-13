/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        border: "rgba(var(--border))",
        cta: "rgba(var(--cta))",
        "cta-active": "rgba(var(--cta-active))",
        blinkColor: "rgba(var(--blink-text-active))",
        blink: "rgba(var(--blink-color))",
      },
    },
  },
  plugins: [],
};
