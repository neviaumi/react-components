module.exports = {
  extends: ['@busybox'],
  overrides: [
    {
      files: [
        'cypress/support/component.tsx',
        'src/Form/Field.tsx',
        'src/index.tsx',
      ],
      rules: {
        'react-refresh/only-export-components': 'off',
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
  settings: {
    tailwindcss: {
      config: './tailwind.config.mjs',
    },
  },
};
