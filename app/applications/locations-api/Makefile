ROOT_DIR := $(shell git rev-parse --show-toplevel)
include $(ROOT_DIR)/shared/Makefile

prepare:
	@make migrate_local_locations_db
.PHONY: prepare

run-local:
	SERVICE=locations-api $(MAKE) run-local-app
.PHONY: run-local