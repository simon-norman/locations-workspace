DOPPLER_CMD := doppler run -p simon-norman -c dev_personal --

locations-api-up:
	@cd ./locations-api && $(DOPPLER_CMD) pulumi up -s $(STACK)
.PHONY: locations-api-up

locations-api-refresh:
	@cd ./locations-api && $(DOPPLER_CMD) pulumi refresh -s $(STACK)
.PHONY: locations-api-up

locations-api-down:
	@cd ./locations-api && $(DOPPLER_CMD) pulumi down -s $(STACK)
.PHONY: locations-api-down