import { BaseClient } from "@breeze32/ts-backend-utilities";

export class Cpo extends BaseClient {
	async startCharge() {
		await this.request({ method: "POST", url: "/commands/start" });
	}
}
