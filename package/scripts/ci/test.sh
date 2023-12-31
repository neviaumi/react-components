#!/usr/bin/env bash

set -ex

npx eslint .
npx tsc
npx cypress run --component
npx vite build
