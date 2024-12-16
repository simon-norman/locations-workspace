import { DeploymentType, FastifyApi } from "@breeze32/ts-backend-utilities";
import { expectedConfig } from "./services/config";

export const api = new FastifyApi({
	appName: "locations-api",
	portNumber: 3000,
	config: {
		deploymentType: DeploymentType.fargate,
		serviceName: "locations-api",
		expectedConfig,
		unsecretKeys: ["LOCATIONS_DB_ENDPOINT", "AUTH_PUBLIC_KEY"],
		region: "eu-west-2",
	},
});
