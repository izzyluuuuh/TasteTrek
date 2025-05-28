// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
//   presets: [require("nativewind/preset")],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./TasteTrek/App.{js,jsx,ts,tsx}",
    "./TasteTrek/src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")], // <-- Add this line
  theme: {
    extend: {},
  },
  plugins: [],
};