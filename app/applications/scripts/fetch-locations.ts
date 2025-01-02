import { loadLocationsDb, locationsDb } from "@breeze32/locations-db";
import { loadConfig, loadedConfig } from "./services/config";

const insertTestLocations = async () => {
	await loadConfig();

	await loadLocationsDb({
		endpoint: loadedConfig.LOCATIONS_DB_ENDPOINT,
		username: loadedConfig.LOCATIONS_DB_USERNAME,
		password: loadedConfig.LOCATIONS_DB_PASSWORD,
	});

	await locationsDb.location.create({ data: { address: "Test Location" } });
};

insertTestLocations();
