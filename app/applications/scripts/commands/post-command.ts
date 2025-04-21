import { initClient } from "@breeze32/locations-clients";
import { Command } from "@oclif/core";
import { loadConfig, loadedConfig } from "../services/config";

export default class PostCommand extends Command {
	public async run() {
		await loadConfig();
		const { locationsSdk } = initClient({
			auth: {
				clientId: loadedConfig.PERSONAL_INTERNAL_CLIENT_ID,
				clientSecret: loadedConfig.PERSONAL_INTERNAL_CLIENT_SECRET,
				host: loadedConfig.INTERNAL_AUTH_HOST,
				applicationId: loadedConfig.INTERNAL_AUTH_APPLICATION_ID,
			},
			clientConfig: {
				baseURL: loadedConfig.LOCATIONS_API_URL,
			},
		});

		const response = await locationsSdk.postCommandsStart({
			body: {
				locationId: "test-location",
			},
		});

		this.log("Response: ", response);
	}
}
