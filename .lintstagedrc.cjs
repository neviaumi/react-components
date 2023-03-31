'use strict';

module.exports = {
  '*.md': ['prettier --write'],
  '*.{json,js,ts,tsx,yml,yaml}': ['eslint --fix', 'prettier --write'],
};
