ROOT_DIR := $(shell git rev-parse --show-toplevel)

include $(ROOT_DIR)/.env
export

install:
	pnpm install
.PHONY: install

update-internal:
	pnpm update "@breeze32/*" --latest
.PHONY: update-internal-packages

push:
	cd $(ROOT_DIR) && \
		git add . && \
		git commit -m $(COMMIT) && \
		git push
		git add .
.PHONY: push

define run_app_with_doppler
	doppler run -p $(DOPPLER_PERSONAL_PROJECT_NAME) -c local -- doppler run -p $(1) -c local_personal -- $(2)
endef

prepare:
	@echo "Nothing to prepare!"
.PHONY: prepare

start-containers:
	@echo "Starting containers..."
	@cd $(ROOT_DIR)/app && docker compose up
.PHONY: start-containers

stop-containers:
	@echo "Stopping containers..."
	@cd $(ROOT_DIR)/app && docker compose down
.PHONY: start-containers

publish:
	tsup
	-$(MAKE) push COMMIT=$(COMMIT)
	pnpm version $(VERSION)
	pnpm publish --access public
.PHONY: publish

run-local-app:
	@cd $(ROOT_DIR)/app/applications/$(SERVICE) && \
	$(call run_app_with_doppler,$(SERVICE),pnpm exec tsx watch ./src/index.ts)
.PHONY: up-project

migrate_local_locations_db:
	@cd $(ROOT_DIR)/app/libs/locations-db && \
	$(call run_app_with_doppler,locations-db,pnpm exec zenstack generate) && \
	$(call run_app_with_doppler,locations-db,pnpm exec prisma migrate dev)
.PHONY: migrate_local_locations_db

generate_empty_migration:
	$(call run_app_with_doppler,locations-db,pnpm exec prisma migrate dev --create-only)
.PHONY: generate_empty_migration

check-service:
	@echo "Checking if service is already running on port $(PORT)..."
	@if curl -s http://localhost:$(PORT)/health > /dev/null 2>&1; then \
		echo "Service is already running on port $(PORT)"; \
		exit 0; \
	else \
		echo "Service is not running on port $(PORT)"; \
		exit 1; \
	fi
.PHONY: check-service

wait-for-service:
	@echo "Waiting for service to be ready on port $(PORT)..."
	@for i in {1..30}; do \
		if curl -s http://localhost:$(PORT)/health > /dev/null 2>&1; then \
			echo "Service is ready on port $(PORT)!"; \
			exit 0; \
		fi; \
		if [ $$i -eq 30 ]; then \
			echo "Service failed to start on port $(PORT) after 30 seconds"; \
			exit 1; \
		fi; \
		echo "Waiting... ($$i/30)"; \
		sleep 1; \
	done
.PHONY: wait-for-service
