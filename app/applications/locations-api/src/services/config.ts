import { Config, DeploymentType } from "@breeze32/ts-backend-utilities";
import { type Static, Type as T } from "@sinclair/typebox";

export const config = {};

const expectedConfig = T.Object({
	LOCATIONS_DB_PASSWORD: T.String(),
	LOCATIONS_DB_ENDPOINT: T.String(),
});

type LoadedConfig = Static<typeof expectedConfig>;

export let loadedConfig: LoadedConfig;

export const loadConfig = async () => {
	loadedConfig = await new Config<LoadedConfig>(
		DeploymentType.fargate,
		"locations-api",
		expectedConfig,
		["LOCATIONS_DB_ENDPOINT"],
		"eu-west-2",
	).load();
};
