#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

REPO_ROOT=$(git rev-parse --show-toplevel)
STACK=$1
VERSION=$2

if [ -z "$REPO_ROOT" ]; then
  echo "Error determining repository root."
  exit 1
fi

BUILD_DIR="$REPO_ROOT/infrastructure/locations-ingest/build"
DIST_FILE="$BUILD_DIR/locations_ingest_lambda.zip"

# Create a clean distribution directory
echo "Creating distribution directory..."
rm -rf $BUILD_DIR
turbo prune @breeze32/locations-ingest --out-dir $BUILD_DIR

cd $BUILD_DIR
pnpm install
cd $BUILD_DIR/app/libs/locations-db
pnpm exec zenstack generate
cd $BUILD_DIR
cd ..

mkdir './build/dist'

node esbuild.mjs

# Zip the distribution directory
echo "Creating zip file..."
(cd $BUILD_DIR/dist && zip -r9 $DIST_FILE .)


cd $REPO_ROOT/infrastructure/locations-ingest
pulumi up -r -s $STACK --config="version=$VERSION"