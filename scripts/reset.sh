#!/usr/bin/env bash
set -ex

rm -rf node_modules
rm -rf package/node_modules
rm -rf examples/node_modules
rm -f package-lock.json
npm i