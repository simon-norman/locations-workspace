import { initClient } from "@breeze32/locations-clients"
import { Command } from "@oclif/core";

export default class PostCommand extends Command {
	public async run() {
		const { locationsSdk } = initClient({
      endpoint: "https://locations-api.breeze32.dev",
      username: "admin",
      clientConfig: {
        
      }
	}
}
