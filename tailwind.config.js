module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        'linear-x': '#06DBAC',
        'linear-y': '#BD00FF',
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        "body-bg": "#1F1D2B",
        "body-bg-1": "#0F0B30",
        "linear-h1-x": "#00F0FF",
        "linear-h1-y": "#5773FF",
        "linear-h1-z": "#FF007A",
        
      },
    
      backgroundImage: {
        'hero-pattern': " url('https://www.linkpicture.com/q/background_40.png')",
        'btn-1': " url('https://www.linkpicture.com/q/rec1.png')",
      },
    
    
    
    
    
    
    
    },


    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
    },

    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      h3: ['45px', {
        lineHeight: '67px',
      }],
      h1: ['98px', {
        lineHeight: '147px',
      }],
      a: ['20px', {
        lineHeight: '30px',
      }],
    },


  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}