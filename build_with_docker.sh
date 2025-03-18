#!/bin/bash

BUILD_DIR=docker
rm -Rf ${BUILD_DIR}_*
mkdir -p ${BUILD_DIR}_dist
mkdir -p ${BUILD_DIR}_node_modules
docker run --rm -i \
  -v $PWD:/src \
  -v $PWD/${BUILD_DIR}_dist:/src/dist \
  -v $PWD/${BUILD_DIR}_node_modules:/src/node_modules \
  -w /src \
  node:18 \
  yarn build:ucod
