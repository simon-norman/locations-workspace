pulumi config set --secret db_password $LOCATIONS_DB_PASSWORD -s $1
pulumi up -r -s $1