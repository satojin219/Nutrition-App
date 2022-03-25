module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  media: false,
  theme: {
    extend: {
      spacing: {
        128: "32rem",
        112: "28rem",
      },
      colors: {},
      fontFamily: {
        fancy: ["Zen Maru Gothic"],
      },
    },
  },
  plugins: [],
};
