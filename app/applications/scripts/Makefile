DOPPLER_CMD := doppler run -p locations-ingest -c local_personal -- doppler run -p locations-api -c local_personal --
LOCAL_CMD := NODE_ENV=local $(DOPPLER_CMD) 

run-dev:
	$(DOPPLER_CMD) pnpm exec tsx $(SCRIPT)
.PHONY: run-dev