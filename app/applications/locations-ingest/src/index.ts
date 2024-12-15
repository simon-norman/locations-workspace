import { loadLocationsDb } from "@breeze32/locations-db";
import type { LocationIngest } from "@breeze32/types";
import type { SQSEvent, SQSHandler, SQSRecord } from "aws-lambda";
import "datadog-lambda-js";
import pino from "pino";
import { handlerRegistry } from "./handlers/handler-registry";
import { loadConfig, loadedConfig } from "./services/config";

const logger = pino({
	formatters: {
		level: (label) => {
			return { level: label.toUpperCase() };
		},
	},
});

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
		} catch (error: any) {
			logger.error(
				{
					stack: error.stack,
					errorType: "TypeError",
					status: "ERROR",
					errorMessage: error.message,
					message: error.message,
					kind: "Exception",
					ddseverity: "error",
					error: {
						stack: error.stack,
						kind: "Exception",
						ddseverity: "error",
						message: error.message,
					},
				},
				error.message,
			);
			failedRecords.push(record);
		}
	}

	return {
		batchItemFailures: failedRecords.map((message) => ({
			itemIdentifier: message.messageId,
		})),
	};
};
