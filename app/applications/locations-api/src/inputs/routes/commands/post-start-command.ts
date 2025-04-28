import { locationsDb } from "@breeze32/locations-db";
import {
	type FastifyTypebox,
	authMiddleWare,
	defaultString,
} from "@breeze32/ts-backend-utilities";
import { Type as t } from "@sinclair/typebox";
import { deps } from "src/services/deps";

export const postCommandBody = t.Object({
	locationId: defaultString,
});

export const postStartCommand = async (fastify: FastifyTypebox) => {
	fastify.post("/start", {
		schema: {
			body: postCommandBody,
			description: "Starts a charge session",
		},
		preHandler: [authMiddleWare(["locations-api:base"])],
		handler: async (req) => {
			await deps.payments.paymentIntents.create({
				payment_method: "pm_card_visa",
				amount: 500,
				currency: "gbp",
				confirm: true,
				automatic_payment_methods: {
					enabled: true,
					allow_redirects: "never",
				},
			});

			const session = await locationsDb.chargingSession.create({
				data: {
					location_id: req.body.locationId,
					status: "PENDING",
				},
			});

			await deps.cpo.startCharge(req.body.locationId, session.id);

			return session;
		},
	});
};
