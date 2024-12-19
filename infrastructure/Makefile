DOPPLER_CMD := doppler run -p simon-norman -c dev_personal --
VERSION := $(shell git rev-parse HEAD)

all_infra_up:
	@$(MAKE) locations-db-up STACK=$(STACK)
	@$(MAKE) locations-api-up STACK=$(STACK)
	@$(MAKE) locations-ingest-up STACK=$(STACK)
.PHONY: all_infra_up

all_infra_down:
	@$(MAKE) locations-api-down STACK=$(STACK)
	@$(MAKE) locations-db-down STACK=$(STACK)
	@$(MAKE) locations-ingest-down STACK=$(STACK)
.PHONY: all_infra_down

locations-api-up:
	@cd ./locations-api && bash deploy.sh
.PHONY: locations-api-up

locations-api-refresh:
	@cd ./locations-api && $(DOPPLER_CMD) pulumi refresh -s $(STACK)
.PHONY: locations-api-up

locations-api-down:
	@cd ./locations-api && $(DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: locations-api-down

locations-db-up:
	@cd ./locations-db && $(DOPPLER_CMD) bash deploy-db.sh $(STACK)
.PHONY: locations-db-up

locations-db-refresh:
	@cd ./locations-db && $(DOPPLER_CMD) pulumi refresh -s $(STACK)
.PHONY: locations-db-up

locations-db-down:
	@cd ./locations-db && $(DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: locations-db-down

locations-ingest-up:
	@cd ./locations-ingest && bash deploy.sh
.PHONY: locations-ingest-up

locations-ingest-refresh:
	@cd ./locations-ingest && $(DOPPLER_CMD) pulumi refresh -s $(STACK)
.PHONY: locations-ingest-up

locations-ingest-down:
	@cd ./locations-ingest && $(DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: locations-ingest-down

