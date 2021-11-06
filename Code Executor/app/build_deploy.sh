#!/bin/bash

set -euo pipefail
cd "$(dirname "$0")"

VERSION="$(git describe --dirty --always)"
if [[ $VERSION == *-dirty ]]; then
  # We need to ensure the image is loaded again so we give the image a unique
  # name from other images based on this dirty commit.
  VERSION+="-$(head -c 5 < /dev/urandom | base32)"
fi

uri="asia.gcr.io/peerprogram/code-executor:$VERSION"

DOCKER_BUILDKIT=1 docker build \
	-t "$uri" .
docker push "$uri"

echo "Pushed new image to: $uri"

cd
sudo ./kustomize edit set image $uri
sudo ./kustomize build . | kubectl apply -f -
kubectl rollout status deployment/code-executor
kubectl get services -o wide