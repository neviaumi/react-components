module.exports = {
  extends: ['@busybox'],
  overrides: [
    {
      files: ['*.stories.jsx', '*.stories.tsx'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
    {
      files: [
        './tailwind.config.mjs',
        './vite.config.ts',
        './.storybook/main.ts',
        './cypress.config.ts',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  settings: {
    tailwindcss: {
      config: './tailwind.config.mjs',
    },
  },
};
