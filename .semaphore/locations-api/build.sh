IMAGE="$SEMAPHORE_GIT_BRANCH:latest"
CACHE_KEY="$SEMAPHORE_GIT_BRANCH-install"
SCRIPT_DIR=$(dirname "$0")

set -e

echo "Script is running commands in: $SCRIPT_DIR"

if ! cache has_key $CACHE_KEY; then
    echo "No install image cache found for this branch"
else
    echo "Restoring"
    cache restore $CACHE_KEY
    docker load -i cached-image.tar || true
fi

docker build --cache-from "$IMAGE" -t "$IMAGE" -f monorepo/applications/locations-api/Dockerfile ./monorepo

# aws ecr get-login-password --region region | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com
docker save -o cached-image.tar $IMAGE
cache store $CACHE_KEY cached-image.tar 

 