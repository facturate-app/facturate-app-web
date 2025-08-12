module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#059669",
          foreground: "#ffffff",
        },
        brand: {
          purple: "#7E22CE"
        },
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#059669",
        background: "#ffffff",
        foreground: "#111827",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
