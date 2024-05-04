DOPPLER_CMD := doppler run -p simon-norman -c dev_personal --

all_infra_down:
	@$(MAKE) locations-api-down STACK=$(STACK)
	@$(MAKE) locations-db-down STACK=$(STACK)
.PHONY: all_infra_down

locations-api-up:
	@cd ./locations-api && $(DOPPLER_CMD) pulumi up -s $(STACK)
.PHONY: locations-api-up

locations-api-refresh:
	@cd ./locations-api && $(DOPPLER_CMD) pulumi refresh -s $(STACK)
.PHONY: locations-api-up

locations-api-down:
	@cd ./locations-api && $(DOPPLER_CMD) pulumi down -s $(STACK)
.PHONY: locations-api-down

locations-db-up:
	@cd ./locations-db && $(DOPPLER_CMD) pulumi up -s $(STACK)
.PHONY: locations-db-up

locations-db-refresh:
	@cd ./locations-db && $(DOPPLER_CMD) pulumi refresh -s $(STACK)
.PHONY: locations-db-up

locations-db-down:
	@cd ./locations-db && $(DOPPLER_CMD) pulumi down -s $(STACK)
.PHONY: locations-db-down