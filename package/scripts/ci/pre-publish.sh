#!/usr/bin/env bash

set -ex

npx vite build
npx tsc -p tsconfig.build.json
