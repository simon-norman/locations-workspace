import type { FastifyTypebox } from "@breeze32/ts-backend-utilities";
import { deps } from "src/services/deps";
import { stripeDefaultMeta } from "src/services/payments";

export const postStartCommand = async (fastify: FastifyTypebox) => {
	fastify.post("/start", {
		handler: async () => {
			await deps.payments.paymentIntents.create({
				payment_method: "pm_card_visa",
				amount: 500,
				currency: "gbp",
				confirm: true,
				...stripeDefaultMeta(),
			});

			await deps.cpo.startCharge("chargerId");

			return {
				message: "Command started",
			};
		},
	});
};
