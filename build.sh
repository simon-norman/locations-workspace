CACHE_KEY="install"
SCRIPT_DIR=$(dirname "$0")

set -e

echo "Script is running commands in: $SCRIPT_DIR"

docker rmi someother

# docker load -i cached-image.tar || true

docker build -t "someother" --target install -f monorepo/applications/locations-api/Dockerfile ./monorepo
# aws ecr get-login-password --region region | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com
# docker save -o cached-image.tar "$CACHE_KEY"
