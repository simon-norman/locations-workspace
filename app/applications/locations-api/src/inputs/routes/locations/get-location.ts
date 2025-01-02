import { locationsDb } from "@breeze32/locations-db";
import { BreweryService } from "@breeze32/services";
import type { FastifyTypebox } from "@breeze32/ts-backend-utilities";
import { authMiddleWare } from "@breeze32/ts-backend-utilities";
import { Type as t } from "@sinclair/typebox";

export const params = t.Object({
	locationId: t.String(),
});

export const getLocationRoute = async (fastify: FastifyTypebox) => {
	fastify.get("/:locationId", {
		schema: {
			params: params,
		},
		preHandler: [authMiddleWare(["locations-api:base"])],
		handler: async (request) => {
			const location = await locationsDb.location.findUnique({
				where: { id: request.params.locationId },
			});

			const breweries = await new BreweryService().getBreweries();
			const firstBrewery = breweries[0];
			return {
				address: location?.address,
				breweryName: firstBrewery.name,
			};
		},
	});
};
