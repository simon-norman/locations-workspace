import { locationsDb } from "@breeze32/locations-db";
import type { FastifyTypebox } from "../../../types/fastify-typebox";
import { postLocationBody } from "./validation";

export const postLocationRoute = async (fastify: FastifyTypebox) => {
	fastify.post("/", {
		schema: {
			body: postLocationBody,
		},
		handler: async (request) => {
			const locationCount = await locationsDb.location.count();
			return {
				name: request.body.name,
				count: locationCount,
			};
		},
	});
};
