# NOTE - all dockerfiles should be run with the context (IE where it is looking for files) set as the root
# directory for the monorepo folder

FROM oven/bun:1 as base
WORKDIR /usr/src/app
COPY package.json package.json
COPY applications/locations-api/package.json applications/locations-api/package.json
COPY libs libs
COPY tsconfig.json tsconfig.json
RUN bun install

FROM base AS release
COPY --from=base /usr/src/app/node_modules node_modules
COPY applications/locations-api/src .
COPY applications/locations-api/package.json package.json

# run the app
USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "index.ts" ]