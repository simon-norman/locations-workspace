import { loadLocationsDb } from "@breeze32/locations-db";
import { ErrorCodes } from "@breeze32/services/error-codes/error-codes";
import { BackendError } from "@breeze32/ts-backend-utilities";
import { api } from "./api";
import { routes } from "./inputs";

const runApp = async () => {
	await api.loadConfig();
	if (!api.config?.loadedConfig) {
		return BackendError.throw("Config not loaded", {
			code: ErrorCodes.CONFIG_NOT_LOADED,
			publicMessage: "Config not loaded",
		});
	}
	const config = api.config.loadedConfig;
	loadLocationsDb({
		password: config.LOCATIONS_DB_PASSWORD,
		endpoint: config.LOCATIONS_DB_ENDPOINT,
		username: config.LOCATIONS_DB_USERNAME,
	});

	await api.start({
		authConfig: {
			publicKey: Buffer.from(config.AUTH_PUBLIC_KEY, "base64").toString(),
			applicationId: config.AUTH_APPLICATION_ID,
		},
		routes,
		cors: {
			allowedOrigins: [`http://localhost:${api.opts.portNumber}`],
			methods: "all",
			allowedHeaders: [
				"Authorization",
				"Content-Type",
				"Accept",
				"Origin",
				"X-Requested-With",
				"Cache-Control",
				"If-Match",
				"If-None-Match",
				"If-Modified-Since",
				"If-Unmodified-Since",
			],
		},
	});
};

runApp();
