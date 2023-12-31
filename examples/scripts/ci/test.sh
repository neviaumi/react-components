#!/usr/bin/env bash

set -ex

npx eslint .
npx start-server-and-test 'npx storybook dev -p 6006 --ci' http://localhost:6006 'npm run test:storybook'
