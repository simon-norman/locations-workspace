export LOCATIONS_DB_URL=$1

cd ../../monorepo/libs/locations-db

npx prisma migrate deploy