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
DIST_DIR="$REPO_ROOT/infrastructure/locations-ingest/dist"
ZIP_FILE="locations_ingest_lambda.zip"

cd $CODE_DIR

# Install dependencies using Bun
echo "Installing dependencies..."
bun install --production
bun build src/index.ts --outdir=dist

# # Create a clean distribution directory
# echo "Creating distribution directory..."
# rm -rf $DIST_DIR
# mkdir $DIST_DIR

# # Copy source code to the distribution directory
# echo "Copying source code to distribution directory..."
# cp -R $CODE_DIR/* $DIST_DIR

# # Change to the distribution directory
# cd $DIST_DIR

# # Remove unnecessary files
# echo "Cleaning up unnecessary files..."
# rm -rf node_modules/.bin
# rm -rf node_modules/**/*.md
# rm -rf node_modules/**/*.map
# rm -rf node_modules/**/test
# rm -rf node_modules/**/tests
# rm -rf node_modules/**/__tests__
# rm -rf node_modules/**/docs
# rm -rf node_modules/**/examples

# # Zip the distribution directory
# echo "Creating zip file..."
# zip -r ../$ZIP_FILE *

# # Change back to the original directory
# cd ..

# # Output the location of the zip file
# echo "Build complete. Zip file created at ./$ZIP_FILE"