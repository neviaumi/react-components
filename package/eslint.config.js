import busyboxEslintConfig, { globals } from '@busybox/eslint-config';
import eslintPluginImport from '@busybox/eslint-config/plugins/eslint-plugin-import';

export default [
  ...busyboxEslintConfig,
  {
    settings: {
      tailwindcss: {
        config: './tailwind.config.mjs',
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ['package-lock.json', 'storybook-static/', 'dist/'],
  },
  {
    files: ['**/*.cy.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['**/*.tsx'],
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      'import/no-default-export': ['error'],
      'import/prefer-default-export': 'off',
    },
  },
  {
    files: [
      '**/*.stories.tsx',
      './tailwind.config.mjs',
      './vite.config.ts',
      './.storybook/main.ts',
      './cypress.config.ts',
      './.storybook/preview.ts',
    ],
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['**/fixtures/*.ts'],
    rules: {
      'max-lines': 'off',
    },
  },
];
