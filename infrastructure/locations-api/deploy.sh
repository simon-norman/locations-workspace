#!/bin/bash

set -e

REPO_ROOT=$(git rev-parse --show-toplevel)
STACK=$1
VERSION=$2

if [ -z "$REPO_ROOT" ]; then
  echo "Error determining repository root."
  exit 1
fi

BUILD_DIR="$REPO_ROOT/infrastructure/locations-api/build"
APP_DIR="$REPO_ROOT/app/applications/locations-api"

# Create a clean distribution directory
echo "Creating distribution directory..."
rm -rf $BUILD_DIR

cd $APP_DIR
pnpm install
cd $REPO_ROOT/app/libs/locations-db
pnpm exec zenstack generate

mkdir -p $BUILD_DIR/dist

cd $REPO_ROOT/infrastructure/shared
node esbuild.mjs locations-api true


# cd $REPO_ROOT/infrastructure/locations-api
# pulumi up -r -s $STACK --config="version=$VERSION"