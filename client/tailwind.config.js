module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        72: '18rem',
      },
      colors: {
        myblack: '#181818',
      },
    },
  },
  variants: {
    extend: {
      with: ['hover'],
      height: ['hover'],
      transitionDelay: ['hover'],
      backgroundSize: ['hover'],
      backgroundImage: ['hover'],
      transitionProperty: ['hover'],
      zIndex: ['hover'],
      scale: ['responsive'],
      borderWidth: ['hover'],
    },
  },
  plugins: [],
};
