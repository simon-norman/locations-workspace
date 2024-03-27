IMAGE="$SEMAPHORE_GIT_BRANCH:latest"
CACHE_KEY="$SEMAPHORE_GIT_BRANCH-install"
SCRIPT_DIR=$(dirname "$0")

set -e


echo "Script is running commands in: $SCRIPT_DIR"

if ! cache restore $CACHE_KEY; then
    echo "No install image cache found for this branch"
else
    docker load -i cached-image.tar
fi

docker build -t "$IMAGE" --target install -f monorepo/applications/locations-api/Dockerfile ./monorepo
docker save $IMAGE -o cached-image.tar