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
    ignores: ['storybook-static/', 'package-lock.json'],
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
    files: [
      './tailwind.config.mjs',
      './.storybook/main.ts',
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
    files: ['stories/**/*.stories.tsx', 'stories/fixtures/**/*'],
    rules: {
      'max-lines': 'off',
    },
  },
];
