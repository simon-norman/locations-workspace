include ../../../shared/Makefile

DOPPLER_CMD := doppler run -p locations-api -c local_personal --
LOCAL_CMD := NODE_ENV=local $(DOPPLER_CMD) 

run-dev:
	$(LOCAL_CMD) npx tsx watch ./src/index.ts
.PHONY: run-dev