ROOT_DIR := $(shell git rev-parse --show-toplevel)
include $(ROOT_DIR)/shared/Makefile

run-script:
	$(call run_app_with_doppler,$(SERVICE),)
.PHONY: run-script