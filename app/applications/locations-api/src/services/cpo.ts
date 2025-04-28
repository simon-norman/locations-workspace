import { BaseClient } from "@breeze32/ts-backend-utilities";

export class Cpo extends BaseClient {
	async startCharge(chargerId: string, sessionId: string) {
		await this.request({
			method: "POST",
			url: "/start",
			data: { chargerId, sessionId },
		});
	}
}
