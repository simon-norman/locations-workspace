import { locationsDb } from "@breeze32/locations-db";
import type { FastifyTypebox } from "@breeze32/ts-backend-utilities";
import {
	authMiddleWare,
	defaultNumeric,
	defaultString,
} from "@breeze32/ts-backend-utilities";
import { Type as t } from "@sinclair/typebox";

export const postLocationBody = t.Object({
	name: defaultString,
	coordinates: t.Object({
		latitude: defaultNumeric,
		longitude: defaultNumeric,
	}),
});

export const postLocationRoute = async (fastify: FastifyTypebox) => {
	fastify.post("/", {
		schema: {
			body: postLocationBody,
		},
		preHandler: [authMiddleWare(["locations-api:base"])],
		handler: async (request) => {
			const locationCount = await locationsDb.location.count();
			return {
				name: request.body.name,
				count: locationCount,
			};
		},
	});
};
