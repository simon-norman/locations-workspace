# NOTE - all dockerfiles should be run with the context (IE where it is looking for files) set as the root
# directory for the monorepo folder

FROM oven/bun:1 as base
WORKDIR /usr/src/app
RUN mkdir -p ~/.bun/install/cache
COPY node_modules node_modules
COPY libs libs
RUN cd libs
COPY package.json bun.lockb tsconfig.json libs .
RUN cd libs
COPY applications/locations-api/package.json applications/locations-api/package.json
RUN bun install --frozen-lockfile --production

COPY applications/locations-api/src .
COPY applications/locations-api/package.json package.json

USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "index.ts" ]