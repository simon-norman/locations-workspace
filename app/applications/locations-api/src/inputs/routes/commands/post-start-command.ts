import type { FastifyTypebox } from "@breeze32/ts-backend-utilities";
import { payments, stripeDefaultMeta } from "src/services/payments";

export const postStartCommand = async (fastify: FastifyTypebox) => {
	fastify.post("/start", {
		handler: async () => {
			await payments.paymentIntents.create({
				payment_method: "pm_card_visa",
				amount: 500,
				currency: "gbp",
				confirm: true,
				...stripeDefaultMeta(),
			});

			return {
				message: "Command started",
			};
		},
	});
};
