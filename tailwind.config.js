module.exports = {
  content: [],
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      },
      colors:{
       
      },
      fontFamily: {
        fancy: ["Zen Maru Gothic"],
      },
    },
  },
  plugins: [],
}
