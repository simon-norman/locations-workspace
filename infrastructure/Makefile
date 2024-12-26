BASE_DOPPLER_CMD := doppler run -p ci-cd -c dev_personal --
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
	@cd ./locations-api && $(BASE_DOPPLER_CMD) bash deploy.sh $(STACK) $(VERSION)
.PHONY: locations-api-up

locations-api-refresh:
	@cd ./locations-api && $(BASE_DOPPLER_CMD) pulumi refresh -s $(STACK)
.PHONY: locations-api-up

locations-api-down:
	@cd ./locations-api && $(BASE_DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: locations-api-down

locations-db-up:
	@cd ./locations-db && $(BASE_DOPPLER_CMD) doppler run -p locations-db -c dev_personal -- bash deploy.sh $(STACK)
.PHONY: locations-db-up

locations-db-refresh:
	@cd ./locations-db && $(BASE_DOPPLER_CMD) pulumi refresh -s $(STACK)
.PHONY: locations-db-up

locations-db-down:
	@cd ./locations-db && $(BASE_DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: locations-db-down

locations-ingest-up:
	@cd ./locations-ingest && $(BASE_DOPPLER_CMD) bash deploy.sh $(STACK) $(VERSION)
.PHONY: locations-ingest-up

locations-ingest-refresh:
	@cd ./locations-ingest && $(BASE_DOPPLER_CMD) pulumi refresh -s $(STACK)
.PHONY: locations-ingest-up

locations-ingest-down:
	@cd ./locations-ingest && $(BASE_DOPPLER_CMD) pulumi down -r -s $(STACK)
.PHONY: locations-ingest-down

