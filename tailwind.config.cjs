const colors = require('tailwindcss/colors');
const { assocPath, pipe } = require('ramda');

function createColorPalette(colorsDefinition) {
  return {
    bg: {
      DEFAULT: colorsDefinition.bg.DEFAULT,
      hover: colorsDefinition.bg.hover,
    },
    border: {
      DEFAULT:
        colorsDefinition.border?.DEFAULT ?? colorsDefinition.text.DEFAULT,
      hover: colorsDefinition.border?.hover ?? colorsDefinition.text.hover,
    },
    text: {
      DEFAULT: colorsDefinition.text,
      hover: colorsDefinition.text.hover,
    },
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './cypress/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{.js, cjs}',
  ],
  presets: [require('@busybox/tailwindcss-config')],
  theme: {
    extend: {
      colors: pipe(
        assocPath(
          ['error'],
          createColorPalette({
            bg: {
              DEFAULT: colors.rose[500],
              hover: colors.rose[600],
            },
            text: { DEFAULT: colors.gray[50], hover: colors.white },
          }),
        ),
        assocPath(
          ['warning'],
          createColorPalette({
            bg: {
              DEFAULT: colors.amber[500],
              hover: colors.amber[600],
            },
            text: { DEFAULT: colors.gray[50], hover: colors.white },
          }),
        ),
        assocPath(
          ['primary'],
          createColorPalette({
            bg: {
              DEFAULT: colors.emerald[50],
              hover: colors.emerald[100],
            },
            text: { DEFAULT: colors.gray[700], hover: colors.black },
          }),
        ),
        assocPath(
          ['secondary'],
          createColorPalette({
            bg: { DEFAULT: colors.sky[500], hover: colors.sky[600] },
            text: { DEFAULT: colors.gray[50], text: colors.white },
          }),
        ),
      )({
        current: 'currentColor',
        transparent: 'transparent',
      }),
    },
  },
};
