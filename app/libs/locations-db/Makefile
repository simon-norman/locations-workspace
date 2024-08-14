DOPPLER_CMD := doppler run -p locations-service -c dev_personal --

migrate_dev:
	$(DOPPLER_CMD) npx zenstack generate && $(DOPPLER_CMD) npx prisma migrate dev
.PHONY: migrate_dev