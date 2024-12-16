import { Config, DeploymentType } from "@breeze32/ts-backend-utilities";
import { type Static, Type as T } from "@sinclair/typebox";

const expectedConfig = T.Object({
	LOCATIONS_DB_PASSWORD: T.String(),
	LOCATIONS_DB_ENDPOINT: T.String(),
	LOCATIONS_DB_USERNAME: T.String(),
});

const config = new Config({
	deploymentType: DeploymentType.lambda,
	serviceName: "locations-ingest",
	expectedConfig,
	region: "eu-west-2",
});

export let loadedConfig: Static<typeof expectedConfig>;

export const loadConfig = async () => {
	loadedConfig = await config.load();
};
