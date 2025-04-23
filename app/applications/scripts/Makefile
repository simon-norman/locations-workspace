ROOT_DIR := $(shell git rev-parse --show-toplevel)
include $(ROOT_DIR)/shared/Makefile

run-script:
	@ENV_FIRST_PART=$$(echo $(ENV) | cut -d'-' -f1); \
	echo "Using environment part: $$ENV_FIRST_PART"; \
	doppler run -p locations-api -c $$ENV_FIRST_PART -- doppler run -p $(DOPPLER_PERSONAL_PROJECT_NAME) -c $$ENV_FIRST_PART --preserve-env -- env NODE_ENV=local pnpm exec tsx ./bin/run ${SCRIPT}

.PHONY: run-script