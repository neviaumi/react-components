export default {
  '*.{json,js,ts,tsx,yml,yaml,md}': [
    'eslint --ignore-pattern package-lock.json --fix',
    'prettier --write',
  ],
};
