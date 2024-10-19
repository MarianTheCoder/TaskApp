/** @type {import('tailwindcss').Config} */
export default {
  purge:{
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      'bg-medium',
      'bg-high',
      'bg-low',
      'bg-high_btn',
      'bg-low_btn',
      'bg-medium_btn',
      'bg-gray',
      'bg-graybg',
      'bg-secondary',
      'bg-accent',
      'bg-hoverAcc',
      'bg-primary',
      'bg-btn-hover',
      
    ],
  },
  theme: {
    extend: {
      scrollbarGutter: {
        'stable-both-edges': 'stable both-edges',
      },
      width: {
        "w85": "85%",
        "w90": "90%"
      },
      fontFamily: {
        OpenSans: ["Open Sans" , 'sans-serif'],
          Varela: ["Varela Round", 'sans-serif'],
          ceva: ["Playwrite NG Modern", "cursive"],
      },
      colors: {
        "primary": "#f9f9f9",
        "secondary": "#4a148c",
        "accent": "#009688",
        "btn-hover": "#5B00A0",
        "btn-hoverAcc": "#3baea3",
        "medium": "#e6c612",
        "high": "#FF4D4D",
        "low": "#459849",
        "high_btn": "#d12f2f",
        "low_btn": "#2a742e",
        "medium_btn": "#c7aa03",
        "gray": "#404040",
        "graybg": "#606060"
      },
    },
  },
  plugins: [
    function ({addUtilities}){
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(91, 35, 160) rgb(74 20 140)"
        },
        ".scrollbar-webkit":{
          "&::-webkit-scrollbar":{
            width: "8px"
          },
          "&::-webkit-scrollbar-track":{
            background: "rgb(74 20 140)"
          },
          "&::-webkit-scrollbar-thumb":{
            backgroundColor: "rgb(121, 45, 190)",
            borderRadius: "20px",
            border: "1px solid rgb(91, 35, 160)"
          }
        },
        '.scrollbar-gutter-stable-both-edges': {
          'scrollbar-gutter': 'stable both-edges',
        },
      }
      addUtilities(newUtilities, ["responsive" ,"hover"])
    }
  ],
}