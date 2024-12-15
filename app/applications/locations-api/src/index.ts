import { loadLocationsDb } from "@breeze32/locations-db";
import { getLoggerOptions } from "@breeze32/ts-backend-utilities";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import { routes } from "./inputs";
import { loadConfig, loadedConfig } from "./services/config";

const app = fastify({
	logger: getLoggerOptions(),
}).withTypeProvider<TypeBoxTypeProvider>();

const runApp = async () => {
	await loadConfig();

	loadLocationsDb({
		password: loadedConfig.LOCATIONS_DB_PASSWORD,
		endpoint: loadedConfig.LOCATIONS_DB_ENDPOINT,
		username: "locations_api",
	});

	await app.register(routes);

	await app.listen({
		port: 3000,
		host: "0.0.0.0",
	});
};

runApp();
