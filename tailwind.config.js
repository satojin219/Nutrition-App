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
      colors: {
        primary: "#EF8934",
        secondary: "#EEE3CD",
        "base-brown": "#995A22",
        "base-dark": "#1B1A17",
        "base-white": "#FFFFFF",
        "base-dark-xlight": "#D4D3D3",
      },
      fontFamily: {
        fancy: ["Zen Maru Gothic"],
      },
    },
  },
  plugins: [],
};
