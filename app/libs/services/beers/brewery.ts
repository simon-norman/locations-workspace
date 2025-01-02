import { BaseClient } from "@breeze32/ts-backend-utilities";
import type { Brewery } from "./brewery-types";

export class BreweryService extends BaseClient {
	constructor() {
		super({ config: { baseURL: "https://api.openbrewerydb.org/v1" } });
	}

	async getBreweries() {
		return this.request<Brewery[]>({ url: "/breweries", method: "GET" });
	}
}
