module.exports = {
  extends: ['@busybox'],
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'import/no-default-export': ['error'],
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['*.stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: [
        './tailwind.config.mjs',
        './vite.config.ts',
        './.storybook/main.ts',
        './cypress.config.ts',
        './.storybook/preview.ts',
      ],
      rules: {
        'import/no-default-export': 'off',
        'import/no-unresolved': 'off',
      },
    },
  ],
  root: true,
  settings: {
    tailwindcss: {
      config: './tailwind.config.mjs',
    },
  },
};
