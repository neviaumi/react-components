import busyboxEslintConfig, { globals } from '@busybox/eslint-config';
import eslintPluginImport from '@busybox/eslint-config/plugins/eslint-plugin-import';
import eslintPluginN from '@busybox/eslint-config/plugins/eslint-plugin-n';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
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
      n: eslintPluginN,
    },
    rules: {
      'n/no-extraneous-import': [
        'error',
        {
          allowModules: ['@busybox/react-components'],
        },
      ],
    },
  },
  {
    plugins: {
      import: eslintPluginImport,
    },
    files: [
      './tailwind.config.mjs',
      './.storybook/main.ts',
      './.storybook/preview.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['./stories/*.stories.tsx'],
    rules: {
      'max-lines': 'off',
    },
  },
];
