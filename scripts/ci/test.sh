#!/usr/bin/env bash

set -ex

npx eslint --resolve-plugins-relative-to ./node_modules/@busybox/eslint-config .
npx lerna exec --concurrency 1 --stream -- "test ! -f  scripts/ci/test.sh || bash \
scripts/ci/test.sh"