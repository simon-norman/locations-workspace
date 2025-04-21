ROOT_DIR := $(shell git rev-parse --show-toplevel)
include $(ROOT_DIR)/shared/Makefile

prepare:
	@echo "Generating locations-api client..."
	@if ! $(MAKE) -s check-service PORT=3000 > /dev/null 2>&1; then \
		echo "Starting service on port 3000..."; \
		cd $(ROOT_DIR)/app/applications/locations-api && $(MAKE) run-local PORT=3000 & \
		$(MAKE) wait-for-service; \
	fi
	
	@echo "Running generator..."
	pnpm exec tsx ./generator.ts
	
	@echo "Building with tsup..."
	pnpm exec tsup
.PHONY: prepare

publish:
	-$(MAKE) prepare
	-$(MAKE) push COMMIT=$(COMMIT)
	pnpm version $(VERSION)
	pnpm publish --access public
.PHONY: publish