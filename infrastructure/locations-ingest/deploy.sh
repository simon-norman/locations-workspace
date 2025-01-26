#!/bin/bash

set -e

REPO_ROOT=$(git rev-parse --show-toplevel)
STACK=$1
VERSION=$2

if [ -z "$REPO_ROOT" ]; then
  echo "Error determining repository root."
  exit 1
fi

BUILD_DIR="$REPO_ROOT/infrastructure/locations-ingest/build"
APP_DIR="$REPO_ROOT/app/applications/locations-ingest"
DIST_FILE="$BUILD_DIR/locations_ingest_lambda.zip"

# Create a clean distribution directory
echo "Creating distribution directory..."
rm -rf $BUILD_DIR

cd $APP_DIR
pnpm install
cd $REPO_ROOT/app/libs/locations-db
pnpm exec zenstack generate

mkdir -p $BUILD_DIR/dist

cd $REPO_ROOT/infrastructure/shared
node esbuild.mjs locations-ingest true

# Install fastify swagger and swagger-ui separately
# esbuild doesn't seem to be able
# to handle the imports inside them (e.g. to svgs and html files inside those libraries)
echo "Installing external packages..."
cd $BUILD_DIR/dist
echo '{}' > package.json
npm install @fastify/swagger @fastify/swagger-ui

# Zip the distribution directory
echo "Creating zip file..."
(cd $BUILD_DIR/dist && zip -r9 $DIST_FILE .)


cd $REPO_ROOT/infrastructure/locations-ingest
pulumi up -s $STACK --config="version=$VERSION"