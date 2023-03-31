#!/usr/bin/env bash

set -ex

npx eslint .
npx tsc
# npx start-server-and-test 'npx start-storybook -p 6006 --ci' http://localhost:6006 'npm run test:storybook'
npx cypress run --component
npx vite build
# npx chromatic --project-token=a4a6877ab169 --dry-run --no-interactive