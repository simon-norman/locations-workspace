import { loadLocationsDb } from "@breeze32/locations-db";
import type { LocationIngest } from "@breeze32/types";
import type { SQSEvent, SQSHandler, SQSRecord } from "aws-lambda";
import { handlerRegistry } from "./handlers/handler-registry";

export const handler: SQSHandler = async (event: SQSEvent) => {
	const failedRecords: SQSRecord[] = [];
	for (const record of event.Records) {
		const body = record.body;

		try {
			const data: LocationIngest.NewLocationMessage = JSON.parse(body);
			const handler = handlerRegistry.get(data.type);

			if (!handler) throw new Error("No handler found");

			await handler(data.body);
		} catch (error) {
			failedRecords.push(record);
		}
	}

	return {
		batchItemFailures: failedRecords.map((message) => ({
			itemIdentifier: message.messageId,
		})),
	};
};

// @ts-ignore
loadLocationsDb({});
