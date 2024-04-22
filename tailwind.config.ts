import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }, colors: {
        primary: {
          50: "#4276C0",
          100: "#325C97",
          150: '#1d3557',
          200: "#24436D",
          300: "#192E4B"
        }, 
        secondary:{
          50: "#E63946",
          100: "#E68439",
          150: '#E6BF39',
          200: "#D1E639",
        }, 
        offWhite:{
          50: "#D3EDEE",
          100: "#A8DADC",
          150:"#6CC1C4"
        }
      }
    },
  },
  darkmode: "class",
  plugins: [nextui()],
};
export default config;