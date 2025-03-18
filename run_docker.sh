#!/bin/bash

NAME=prelab_client
BASE_IMAGE=node:18

docker rm -f ${NAME}
docker run -it \
  --platform=linux/amd64 \
  `# 사용자 메이븐 폴더 변경 ` \
  --rm \
  --name=${NAME} \
  -v ${PWD}:/data \
  -p 4000:4000 \
  -w /data \
  ${BASE_IMAGE} \
  sh -c "yarn && yarn  dev"
