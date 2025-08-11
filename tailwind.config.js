module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#059669",  // Verde esmeralda
          foreground: "#ffffff",
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
