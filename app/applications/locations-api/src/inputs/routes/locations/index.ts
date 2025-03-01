import type { FastifyInstance } from "fastify";
import { getLocationRoute } from "./get-location";
import { postLocationRoute } from "./post-location";

export const locationRoutes = async (fastify: FastifyInstance) => {
	await fastify.register(postLocationRoute);

	await fastify.register(getLocationRoute);
};
