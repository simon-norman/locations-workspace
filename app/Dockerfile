FROM node:20-slim as base
WORKDIR /usr/src/app

# install all dependencies (including dev) into dev directory and install
FROM base as install
RUN mkdir -p /temp/dev
COPY package.json /temp/dev
COPY libs /temp/dev/libs
COPY applications /temp/dev/applications
COPY tsconfig.json tsconfig.json
RUN cd /temp/dev && pnpm install
RUN cd /temp/dev/libs/locations-db && bunx zenstack generate

# now install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
RUN cp /temp/dev/bun.lockb /temp/prod/
RUN cp -r /temp/dev/libs /temp/prod/libs
COPY package.json /temp/prod/
COPY applications /temp/prod/applications
RUN cd /temp/prod && bun install --frozen-lockfile --production
RUN cd /temp/prod/libs/locations-db && bunx zenstack generate

# locations api
FROM install as test_locations_api
RUN cd /temp/dev/applications/locations-api && bun test

FROM base AS release_locations_api
ARG ENV=local
ENV NODE_ENV=${ENV}
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=install /temp/prod/node_modules/@breeze32/services node_modules/@breeze32/services
COPY --from=install /temp/prod/node_modules/@breeze32/locations-db node_modules/@breeze32/locations-db
COPY applications/locations-api/src .
COPY tsconfig.json tsconfig.json
COPY applications/locations-api/package.json package.json

# run the app
USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "index.ts" ]