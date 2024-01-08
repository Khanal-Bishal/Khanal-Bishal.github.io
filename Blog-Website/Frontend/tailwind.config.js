// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./blog.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

export default {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js,ts}",
    "./**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Custom Font", "Nunito"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
