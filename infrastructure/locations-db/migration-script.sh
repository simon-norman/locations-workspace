export LOCATIONS_DB_URL=$1

cd ../../app/libs/locations-db

pnpm exec zenstack generate
pnpm exec prisma migrate deploy