pulumi config set --secret locations_api_db_password $LOCATIONS_API_DB_PASSWORD -s $1
pulumi config set --secret locations_ingest_db_password $LOCATIONS_INGEST_DB_PASSWORD -s $1
pulumi up -s $1