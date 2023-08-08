#!/usr/bin/env bash

set -ex

npx eslint --resolve-plugins-relative-to ../node_modules/@busybox/eslint-config .
npx tsc
npx cypress run --component
npx vite build
