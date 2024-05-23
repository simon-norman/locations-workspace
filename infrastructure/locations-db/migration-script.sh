export LOCATIONS_DB_URL=$1

cd ../../monorepo/libs/locations-db

bunx zenstack generate
bunx prisma migrate deploy