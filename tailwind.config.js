const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", 'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'],
  theme: {
    extend: {
      colors: {
        BACKGROUND_BLACK: '#1F2127',
        'labelBlack': '#0C0D0E',
        'backgroundBlack': "#131417",
        
        LABEL_TEXT_WHITE: "#FFFFFF",
        
        'headerGray': "#D5DDF9",
        'headerBackgroundGray': "#343848",
        USER_BACKGROUND_GRAY: "#0000009E",
        'inactiveGray': "#73788A",
  
        USER_GREEN: "#00FFBA",
        'activePink': "#BE7DFF",
        'shinyGold': "#F8B600"
      },
      transitionProperty: {
        'spacing': 'margin, padding',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        industrybold: ["Industry-Bold", "sans-serif"],
        industrydemi: ["Industry-Demi", "sans-serif"],
        blenderprobold: ["BlenderPro-Bold", "sans-serif"],
        blenderprobook: ["BlenderPro-Book", "sans-serif"],
        blenderpromedium: ["BlenderPro-Medium", "sans-serif"],
        blenderprothin: ["BlenderPro-Thin", "sand-serif"]
      },
    },
  },
  plugins: [require("daisyui")],
};
