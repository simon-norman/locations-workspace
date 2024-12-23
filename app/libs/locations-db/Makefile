DOPPLER_CMD := doppler run -p locations-db -c local_personal --

migrate_dev:
	$(DOPPLER_CMD) npx zenstack generate && $(DOPPLER_CMD) npx prisma migrate dev
.PHONY: migrate_dev

prepare:
	@make migrate_dev
.PHONY: prepare