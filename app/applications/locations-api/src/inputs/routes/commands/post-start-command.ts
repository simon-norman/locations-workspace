import {
	type FastifyTypebox,
	defaultString,
} from "@breeze32/ts-backend-utilities";
import { Type as t } from "@sinclair/typebox";
import { deps } from "src/services/deps";
import { stripeDefaultMeta } from "src/services/payments";

export const postCommandBody = t.Object({
	locationId: defaultString,
});

export const postStartCommand = async (fastify: FastifyTypebox) => {
	fastify.post("/start", {
		schema: {
			body: postCommandBody,
		},
		handler: async (req) => {
			await deps.payments.paymentIntents.create({
				payment_method: "pm_card_visa",
				amount: 500,
				currency: "gbp",
				confirm: true,
				...stripeDefaultMeta(),
			});

			await deps.cpo.startCharge(req.body.locationId);

			return {
				message: "Command started",
			};
		},
	});
};
