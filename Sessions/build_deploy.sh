#!/bin/bash

set -euo pipefail
cd "$(dirname "$0")"

VERSION="$(git describe --dirty --always)"
if [[ $VERSION == *-dirty ]]; then
  # We need to ensure the image is loaded again so we give the image a unique
  # name from other images based on this dirty commit.
  VERSION+="-$(head -c 5 < /dev/urandom | base32)"
fi

uri="asia.gcr.io/peerprogram/sessions:$VERSION"

DOCKER_BUILDKIT=1 docker build \
	-t "$uri" .
docker push "$uri"

echo "Pushed new image to: $uri"

gcloud container clusters get-credentials peer-program-cluster-1 --region=asia-southeast1
kubectl set image deployment/sessions sessions="$uri"