import { loadLocationsDb } from "@breeze32/locations-db";
import { foo } from "@breeze32/services";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { routes } from "./routes";
import { config, loadConfig, loadedConfig } from "./services/config";

const runApp = async () => {
	await loadConfig();

	loadLocationsDb({
		password: loadedConfig.LOCATIONS_DB_PASSWORD,
		endpoint: loadedConfig.LOCATIONS_DB_URL,
		username: "locations_api",
	});

	new Elysia()
		.get("/health", () => foo())
		.use(swagger())
		.use(routes)
		.listen(3000, () => console.log("Server listening"));
};

runApp();
