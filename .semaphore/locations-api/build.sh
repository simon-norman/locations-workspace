IMAGE="$SEMAPHORE_GIT_BRANCH:latest"
CACHE_KEY="$SEMAPHORE_GIT_BRANCH-install"
SCRIPT_DIR=$(dirname "$0")

set -e

echo "Script is running commands in: $SCRIPT_DIR"

if ! cache has_key $CACHE_KEY; then
    echo "No install image cache found for this branch"
else
    cache restore $CACHE_KEY
    docker load -i cached-image.tar || true
fi

docker build --cache-from "$IMAGE" -t "$IMAGE" --target install -f monorepo/applications/locations-api/Dockerfile ./monorepo
docker save -o cached-image.tar $IMAGE
cache store $CACHE_KEY cached-image.tar 
  