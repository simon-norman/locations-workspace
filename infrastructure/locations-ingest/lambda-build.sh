#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

REPO_ROOT=$(git rev-parse --show-toplevel)

if [ -z "$REPO_ROOT" ]; then
  echo "Error determining repository root."
  exit 1
fi

# Define variables
CODE_DIR="$REPO_ROOT/monorepo/applications/locations-ingest"
BUILD_DIR="$REPO_ROOT/infrastructure/locations-ingest/build"
DIST_FILE="$BUILD_DIR/locations_ingest_lambda.zip"

# Create a clean distribution directory
echo "Creating distribution directory..."
rm -rf $BUILD_DIR
mkdir $BUILD_DIR
mkdir $BUILD_DIR/node_modules

cd $REPO_ROOT/monorepo
# pnpm --filter=<deployed project name> deploy <target directory>
cd libs/locations-db
bunx zenstack generate
cd $REPO_ROOT/monorepo
bun install --production

cp -RL node_modules $BUILD_DIR

# COPY applications/locations-ingest/src .
# COPY tsconfig.json tsconfig.json
# COPY applications/locations-ingest/package.json package.json

cp -R $CODE_DIR/* $BUILD_DIR

# Zip the distribution directory
echo "Creating zip file..."
zip -r $DIST_FILE *