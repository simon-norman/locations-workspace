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

docker history "$SEMAPHORE_GIT_BRANCH:build"

docker build --cache-from "$SEMAPHORE_GIT_BRANCH:build" -t "$IMAGE" -f monorepo/applications/locations-api/Dockerfile ./monorepo

docker history "$IMAGE

docker tag "$IMAGE" "$SEMAPHORE_GIT_BRANCH:build"

docker save -o cached-image.tar "$SEMAPHORE_GIT_BRANCH:build"
cache delete $CACHE_KEY
cache store $CACHE_KEY cached-image.tar