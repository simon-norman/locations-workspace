import { loadLocationsDb } from "@breeze32/locations-db";
import type { LocationIngest } from "@breeze32/types";
import type { SQSEvent, SQSHandler, SQSRecord } from "aws-lambda";
import { handlerRegistry } from "./handlers/handler-registry";
import { loadConfig, loadedConfig } from "./services/config";

export const handler: SQSHandler = async (event: SQSEvent) => {
	await loadConfig();
	loadLocationsDb({
		password: loadedConfig.LOCATIONS_DB_PASSWORD,
		endpoint: loadedConfig.LOCATIONS_DB_ENDPOINT,
		username: "locations_api",
	});

	const failedRecords: SQSRecord[] = [];
	for (const record of event.Records) {
		const body = record.body;

		try {
			const data: LocationIngest.NewLocationMessage = JSON.parse(body);
			const mappedHandler = handlerRegistry.get(data.type);

			if (!mappedHandler) throw new Error("No handler found");
			await mappedHandler(data.body);
		} catch {
			failedRecords.push(record);
		}
	}

	return {
		batchItemFailures: failedRecords.map((message) => ({
			itemIdentifier: message.messageId,
		})),
	};
};
