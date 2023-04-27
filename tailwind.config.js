const colors = require('tailwindcss/colors');

function createColorPalette(variant, colorsDefinition) {
  return {
    [`${variant}-bg`]: colorsDefinition.bg,
    [`${variant}-bg-hover`]: colorsDefinition.hover.bg,
    [`${variant}-border`]: colorsDefinition.border ?? colorsDefinition.text,
    [`${variant}-border-hover`]:
      colorsDefinition.hover.border ?? colorsDefinition.hover.text,
    [`${variant}-text`]: colorsDefinition.text,
    [`${variant}-text-hover`]: colorsDefinition.hover.text,
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
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      ...createColorPalette('error', {
        bg: colors.rose[500],
        hover: {
          bg: colors.rose[600],
          text: colors.white,
        },
        text: colors.gray[50],
      }),
      ...createColorPalette('warning', {
        bg: colors.amber[500],
        hover: {
          bg: colors.amber[600],
          text: colors.white,
        },
        text: colors.gray[50],
      }),
      ...createColorPalette('primary', {
        bg: colors.emerald[50],
        border: colors.gray[700],
        hover: {
          bg: colors.emerald[100],
          border: colors.black,
          text: colors.black,
        },
        text: colors.gray[700],
      }),
      ...createColorPalette('secondary', {
        bg: colors.sky[500],
        hover: {
          bg: colors.sky[600],
          text: colors.white,
        },
        text: colors.gray[50],
      }),
    },
  },
};
