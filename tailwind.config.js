module.exports = {
  content: [
    // your content paths
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-scrollbar/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}