module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      primary: '#450B70',
      secondary: '#EFB837',
      logobg: '#7E499B',
      red: '#DC3965',
      yellow: '#EFDC7F',
    }
    },
    
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
