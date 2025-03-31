/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#4a90e2",
        old: "#2c2c2e",
      },
    },
  },
  plugins: [],
};
