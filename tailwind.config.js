/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT")


module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Arial'],
      serif: ["Times New Roman"]
    },
    extend: {
      screens: {
        'sm-sii': '1024px',
        'md-sii': '1280px',
        'lg-sii': '1680px',
      },
      colors: {
        /* Primarios */
        'naranja-sii': '#E6500A',
        'azul-sii': '#0064A0',
        'gris-sii': '#737373',
        /* Secundarios */
        'amarillo': {
          '100': '#FDEFBF',
          '200': '#FBDE80',
          '300': '#F9CE40',
          '400': '#F7BD00'
        },
        'naranja': {
          '100': '#FFD9BF',
          '200': '#FFB380',
          '300': '#FF8C40',
          '400': '#FF6600'
        },
        'rosa': {
          '100': '#FFD3D3',
          '200': '#FFA7A7',
          '300': '#FF7B7B',
          '400': '#FF4F4F'
        },
        'rojo': {
          '100': '#F4B0B0',
          '200': '#F09595',
          '300': '#E96161',
          '400': '#E22C2C'
        },
        /* Secundarios fríos */
        'celeste': {
          '100': '#E6F3FB',
          '200': '#CEE7F6',
          '300': '#B5DBF2',
          '400': '#9CCFEE'
        },
        'azul-brillante': {
          '100': '#C4E2FA',
          '200': '#89C4F5',
          '300': '#4EA7F0',
          '400': '#1389EB'
        },
        'azul-cobalto': {
          '100': '#C3D9EC',
          '200': '#87B4DA',
          '300': '#4B8FC7',
          '400': '#0F69B4'
        },
        'azul-marino': {
          '100': '#9DA6B2',
          '200': '#798698',
          '300': '#435772',
          '400': '#002C48'
        },
        'azul-pastel': {
          '100': '#DAF0F5',
          '200': '#B6E0EA',
          '300': '#92D1E0',
          '400': '#6DC1D5'
        },
        'verde-esmeralda': {
          '100': '#BFEBD3',
          '200': '#80D7A8',
          '300': '#40C47C',
          '400': '#00B050'
        },
        'verde-oscuro': {
          '100': '#C5E0B4',
          '200': '#A9D18E',
          '300': '#548235',
          '400': '#385723'
        },
        'púrpura': {
          '100': '#DCCFDC',
          '200': '#B99FB9',
          '300': '#956E95',
          '400': '#723E72'
        },
        /* Grises */
        'gris': {
          '100': '#F5F5F5',
          '200': '#EEEEEE',
          '300': '#E0E0E0',
          '400': '#D1D1D1',
          '500': '#BBBBBB',
          '600': '#9B9B9B',
          '700': '#6F6F6F',
          '800': '#4D4D4D',
          '900': '#333333'
        }
      },
    },
  },
  plugins: [],
})