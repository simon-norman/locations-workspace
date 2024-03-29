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
    # cd depscache
    # cd ..
    # echo "found cache"
fi

docker buildx build --progress=plain --cache-from depscache --cache-to=type=local,dest=depscache -t "$IMAGE" -f monorepo/applications/locations-api/Dockerfile ./monorepo

cache delete $CACHE_KEY
cache store $CACHE_KEY depscache