import { locationsDb } from "@breeze32/locations-db";
import {
	type FastifyTypebox,
	defaultString,
} from "@breeze32/ts-backend-utilities";
import { Type as t } from "@sinclair/typebox";

export const patchCommandBody = t.Object({
	sessionId: defaultString,
	status: defaultString,
});

export const updateStartCommand = async (fastify: FastifyTypebox) => {
	fastify.patch("/start", {
		schema: {
			body: patchCommandBody,
		},
		handler: async (req) => {
			await locationsDb.chargingSession.update({
				where: {
					id: req.body.sessionId,
				},
				data: {
					status: "ACTIVE",
				},
			});
		},
	});
};
