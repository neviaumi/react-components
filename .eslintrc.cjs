module.exports = {
  extends: ['@busybox'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'import/extensions': ['error', 'ignorePackages'],
        'n/file-extension-in-import': ['off'],
        'n/no-missing-import': ['off'],
      },
    },
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
