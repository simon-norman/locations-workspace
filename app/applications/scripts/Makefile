ROOT_DIR := $(shell git rev-parse --show-toplevel)
include $(ROOT_DIR)/shared/Makefile

run-script:
	doppler run -p locations-api -c $(DOPPLER_ENV) -- doppler run -p $(DOPPLER_PERSONAL_PROJECT_NAME) -c $(DOPPLER_ENV) --preserve-env -- env NODE_ENV=local pnpm exec tsx ./bin/run ${SCRIPT}
.PHONY: run-script