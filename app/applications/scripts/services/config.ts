import { Config, DeploymentType } from "@breeze32/ts-backend-utilities";
import { type Static, Type as T } from "@sinclair/typebox";

export const expectedConfig = T.Object({
	LOCATIONS_DB_PASSWORD: T.String(),
	LOCATIONS_DB_ENDPOINT: T.String(),
	LOCATIONS_DB_USERNAME: T.String(),
	PERSONAL_INTERNAL_CLIENT_ID: T.String(),
	PERSONAL_INTERNAL_CLIENT_SECRET: T.String(),
	INTERNAL_AUTH_HOST: T.String(),
	INTERNAL_AUTH_APPLICATION_ID: T.String(),
	LOCATIONS_API_URL: T.String(),
});

const config = new Config({
	deploymentType: DeploymentType.fargate,
	serviceName: "scripts",
	expectedConfig,
	region: "eu-west-2",
});

export let loadedConfig: Static<typeof expectedConfig>;

export const loadConfig = async () => {
	loadedConfig = await config.load();
};
