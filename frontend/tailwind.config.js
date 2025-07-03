/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // 👈 scan app directory
    './components/**/*.{js,ts,jsx,tsx}', // if you keep components here
    './index.html'                  // optional
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

