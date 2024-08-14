import { Config, DeploymentType } from "@breeze32/ts-backend-utilities";
import { type Static, Type as T } from "@sinclair/typebox";

const expectedConfig = T.Object({
	LOCATIONS_DB_PASSWORD: T.String(),
	LOCATIONS_DB_URL: T.String(),
});

type LoadedConfig = Static<typeof expectedConfig>;

export let loadedConfig: LoadedConfig;

export const loadConfig = async () => {
	loadedConfig = await new Config<LoadedConfig>(
		DeploymentType.lambda,
		"locations-ingest",
		expectedConfig,
		["LOCATIONS_DB_URL"],
		"eu-west-2",
	).load();
};
