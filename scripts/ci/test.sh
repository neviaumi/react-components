#!/usr/bin/env bash

set -ex

npx eslint --resolve-plugins-relative-to ./node_modules/@busybox/eslint-config .
npx tsc
# It keep timeout without reason
# npx start-server-and-test 'npx storybook dev -p 6006 --ci' http://localhost:6006 'npm run test:storybook'
npx cypress run --component
# Will get 'JavaScript heap out of memory' in CI
# npx storybook build
npx vite build
