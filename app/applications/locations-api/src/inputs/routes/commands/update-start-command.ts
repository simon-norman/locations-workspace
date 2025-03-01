import {
	type FastifyTypebox,
	defaultString,
} from "@breeze32/ts-backend-utilities";
import { Type as t } from "@sinclair/typebox";

export const patchCommandBody = t.Object({
	locationId: defaultString,
	status: defaultString,
});

export const updateStartCommand = async (fastify: FastifyTypebox) => {
	fastify.patch("/start", {
		schema: {
			body: patchCommandBody,
		},
		handler: async (req) => {
			console.log("BODY UPDATE START COMMAND", req.body);
		},
	});
};
