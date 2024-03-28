CACHE_KEY="$SEMAPHORE_GIT_BRANCH-install-deps"
SCRIPT_DIR=$(dirname "$0")

set -e

echo "Semaphore is running commands in: $SCRIPT_DIR"

cd monorepo

if ! cache has_key $CACHE_KEY; then
    echo "No install image cache found for this branch"
else
    echo "Restoring"
    cache restore $CACHE_KEY
fi

bun install --frozen-lockfile

cache delete $CACHE_KEY
cache store $CACHE_KEY node_modules