# PeerProgram

## Databases

1. Redis DB
1. Postgres

## Services

This order is listed in order of how we start them up in kubernetes.

1. Docs Service
1. Code Executor Containers
1. Code Executor NGINX Reverse Proxy
1. Sessions Service
1. Frontend
1. Ingress

## Authenticating yourself

To gain access to the gcp service you will need to authenticate using the service account json.

1. `gcloud auth login`
1. `gcloud components update` (warning: this can take very long)
1. Obtain the `gcp-service-account.json` from Marcus and place the file in project root folder.
1. `gcloud config set project PROJECT_ID`
1. `gcloud auth activate-service-account <SERVICE_ACCOUNT_USERNAME>@<PROJECT_ID>.iam.gserviceaccount.com --key-file gcp-service-account.json` 

## Building Docker Images

1. `gcloud auth configure-docker`
1. Go into the service you want to build the docker image of
1. `./build.sh`
1. The URI should be returned after the build is done, which you will use in the service's kubernetes yml file.

## Kubernetes setup

1. Obtain `.env.production` from Marcus and place them in project root folder.
1. If the secret alr exists, delete it `kubectl delete secret <secret-name>`
1. Set the prod env values here: `kubectl create secret generic prod --from-env-file=.env.production`
1. `kubectl create secret tls onlyduh-tls-secrets --cert 'tls-secrets/server.crt' --key='tls-secrets/server.key'`