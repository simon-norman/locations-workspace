ROOT_DIR := $(shell git rev-parse --show-toplevel)

include $(ROOT_DIR)/shared/Makefile

VERSION := $(shell git rev-parse HEAD)


define get_doppler_config
$(shell echo $(STACK) | cut -d'-' -f1)
endef

define run_with_doppler
	doppler run -p $(DOPPLER_PERSONAL_PROJECT_NAME) -c $(call get_doppler_config) -- doppler run -p $(1) -c $(call get_doppler_config) -- $(2)
endef

all_infra_up:
	@$(MAKE) up SERVICE=test-environment-setup STACK=$(STACK)
.PHONY: all_infra_up

all_infra_down:
	@$(MAKE) down SERVICE=test-environment-setup STACK=$(STACK)
.PHONY: all_infra_down

up:
	@cd $(ROOT_DIR)/infrastructure/$(SERVICE) && \
	$(call run_with_doppler,$(if $(DOPPLER_PROJECT),$(DOPPLER_PROJECT),$(SERVICE)),bash deploy.sh $(STACK) $(VERSION))
.PHONY: up

refresh:
	@cd $(ROOT_DIR)/infrastructure/$(SERVICE) && \
	$(call run_with_doppler,$(if $(DOPPLER_PROJECT),$(DOPPLER_PROJECT),$(SERVICE)),pulumi refresh -s $(STACK))
.PHONY: refresh

down:
	@cd $(ROOT_DIR)/infrastructure\/$(SERVICE) && \
	$(call run_with_doppler,$(if $(DOPPLER_PROJECT),$(DOPPLER_PROJECT),$(SERVICE)),pulumi down -r -s $(STACK))
.PHONY: down