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
	-$(MAKE) push COMMIT=$(COMMIT)
	pnpm version $(VERSION)
	pnpm publish --access public
.PHONY: publish