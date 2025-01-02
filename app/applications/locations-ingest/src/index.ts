import { loadLocationsDb } from "@breeze32/locations-db";
import { BackendError } from "@breeze32/ts-backend-utilities";
import { type LocationIngest, Message } from "@breeze32/types";
import type { SQSEvent, SQSHandler, SQSRecord } from "aws-lambda";
import pino from "pino";
import { newLocationHandler } from "./handlers/locations/new-location";
import { loadConfig, loadedConfig } from "./services/config";
import { ErrorCodes } from "./services/error-codes";

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
		username: loadedConfig.LOCATIONS_DB_USERNAME,
	});

	const failedRecords: SQSRecord[] = [];
	for (const record of event.Records) {
		const body = record.body;

		try {
			const data: LocationIngest.NewLocationMessage = JSON.parse(body);
			if (data.type === Message.Types.newLocation) {
				await newLocationHandler(data.body);
			} else {
				BackendError.throw("No handler found", {
					code: ErrorCodes.NO_HANDLER,
					publicMessage: "No handler found",
				});
			}
		} catch (error: any) {
			logger.error(error, error.message);
			failedRecords.push(record);
		}
	}

	return {
		batchItemFailures: failedRecords.map((message) => ({
			itemIdentifier: message.messageId,
		})),
	};
};
