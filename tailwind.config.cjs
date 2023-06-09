const { assocPath, path, pipe } = require('ramda');
const colors = require('tailwindcss/colors.js');

function extractColor(colorPath) {
  return assocPath(colorPath, path(colorPath, colors));
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './cypress/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{.js,cjs}',
  ],
  presets: [require('@busybox/tailwindcss-config/dist/tailwind.config.cjs')],
  theme: {
    extend: {
      backgroundColor: ({ theme }) => {
        return pipe(
          assocPath(['disabled'], {
            DEFAULT: theme('colors.gray.200'),
            hover: theme('colors.gray.50'),
          }),
        )(theme('colors'));
      },
      colors: pipe(
        extractColor(['gray', '50']),
        extractColor(['gray', '200']),
        extractColor(['gray', '600']),
        extractColor(['gray', '800']),
      )({}),
      textColor: ({ theme }) => {
        return pipe(
          assocPath(['disabled'], {
            DEFAULT: theme('colors.gray.800'),
            hover: theme('colors.gray.600'),
          }),
        )(theme('colors'));
      },
    },
  },
};
