import { DeploymentType, FastifyApi } from "@breeze32/ts-backend-utilities";
import { expectedConfig } from "./services/config";

export const api = new FastifyApi({
	appName: "locations-api",
	portNumber: 3000,
	config: {
		deploymentType: DeploymentType.lambda,
		serviceName: "locations-api",
		expectedConfig,
		region: "eu-west-2",
	},
});
