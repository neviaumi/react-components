import busyboxEslintConfig, { globals } from '@busybox/eslint-config';
import eslintPluginImport from '@busybox/eslint-config/plugins/eslint-plugin-import';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ['package-lock.json'],
  },
  {
    settings: {
      tailwindcss: {
        config: './tailwind.config.mjs',
      },
    },
  },
  ...busyboxEslintConfig,
  {
    plugins: {
      import: eslintPluginImport,
    },
    files: ['*.tsx'],
    rules: {
      'import/no-default-export': ['error'],
      'import/prefer-default-export': 'off',
    },
  },
  {
    plugins: {
      import: eslintPluginImport,
    },
    files: [
      '*.stories.tsx',
      './tailwind.config.mjs',
      './vite.config.ts',
      './.storybook/main.ts',
      './cypress.config.ts',
      './.storybook/preview.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
