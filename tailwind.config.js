/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,}",   // your pages/app folder
    "./components/**/*.{js,ts,jsx,}", // your existing components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
