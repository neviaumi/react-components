module.exports = {
  extends: ['@busybox'],
  overrides: [
    {
      files: ['*.stories.jsx', '*.stories.tsx'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ],
  rules: {
    'tailwindcss/classnames-order': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
