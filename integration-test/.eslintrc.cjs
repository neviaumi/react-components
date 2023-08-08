module.exports = {
  extends: ['@busybox'],
  overrides: [
    {
      files: [
        './tailwind.config.mjs',
        './.storybook/main.ts',
        './.storybook/preview.ts',
      ],
      rules: {
        'import/no-default-export': 'off',
        'import/no-unresolved': 'off',
      },
    },
  ],
  root: true,
  rules: {
    'n/no-extraneous-import': [
      'error',
      { allowModules: ['@busybox/react-components'] },
    ],
  },
  settings: {
    tailwindcss: {
      config: './tailwind.config.mjs',
    },
  },
};
