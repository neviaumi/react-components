// import myTailwindConfig from './tailwind.config.cjs';
//
// const config = myTailwindConfig;
import tailwindConfig from '@busybox/tailwindcss-config';
import { assocPath, path, pipe } from 'ramda';
import colors from 'tailwindcss/colors.js';

function extractColor(colorPath) {
  return assocPath(colorPath, path(colorPath, colors));
}

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './cypress/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{.js,cjs}',
  ],
  presets: [tailwindConfig],
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

export default config;
