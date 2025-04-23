import { initClient } from "@breeze32/locations-clients";
import { helpers } from "@breeze32/shared-infra";
import { Command } from "@oclif/core";
import { loadConfig, loadedConfig } from "../services/config";

export default class PostCommand extends Command {
	public async run() {
		const locationsApiUrl = helpers.buildHostName({
			environment: loadedConfig.ENV,
			name: "locations-api",
		});
		await loadConfig();
		const { locationsSdk } = initClient({
			auth: {
				clientId: loadedConfig.PERSONAL_INTERNAL_CLIENT_ID,
				clientSecret: loadedConfig.PERSONAL_INTERNAL_CLIENT_SECRET,
				host: loadedConfig.INTERNAL_AUTH_HOST,
				applicationId: loadedConfig.INTERNAL_AUTH_APPLICATION_ID,
			},
			clientConfig: {
				baseURL: `https://${locationsApiUrl}`,
			},
		});

		const response = await locationsSdk
			.postCommandsStart({
				body: {
					locationId: "test-location",
				},
				throwOnError: true,
			})
			.catch((error) => {
				console.log("Error: ", error);
			});

		this.log("Response: ", response);
	}
}
