# NOTE - all dockerfiles should be run with the context (IE where it is looking for files) set as the root
# directory for the monorepo folder

FROM oven/bun:1 as base
WORKDIR /usr/src/app

FROM base as install
# install all dependencies (including dev) into dev directory and install
RUN mkdir -p /temp/dev
COPY package.json /temp/dev
COPY libs /temp/dev/libs
COPY applications/locations-api/package.json /temp/dev/applications/locations-api/package.json
COPY tsconfig.json tsconfig.json
RUN cd /temp/dev && bun install

# now install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
RUN cp /temp/dev/bun.lockb /temp/prod/
RUN cp -r /temp/dev/libs /temp/prod/libs
COPY package.json /temp/prod/
COPY applications/locations-api/package.json /temp/prod/applications/locations-api/package.json
RUN cd /temp/prod && bun install --frozen-lockfile --production
RUN cd /temp/prod/node_modules/@breeze32 && ls -l
RUN cd /temp/prod/node_modules/@breeze32/services

FROM install as test
RUN cd /temp/dev/applications/locations-api && bun test

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=install /temp/prod/node_modules/@breeze32/services node_modules/@breeze32/services
RUN cd node_modules/@breeze32
COPY applications/locations-api/src .
COPY tsconfig.json tsconfig.json
COPY applications/locations-api/package.json package.json

# run the app
USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "index.ts" ]