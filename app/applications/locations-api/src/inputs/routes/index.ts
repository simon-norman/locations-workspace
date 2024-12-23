import type { FastifyInstance } from "fastify";
import { getLocationRoute } from "./locations/get-location";
import { postLocationRoute } from "./locations/post-location";

export const locationRoutes = async (fastify: FastifyInstance) => {
	await fastify.register(postLocationRoute);

	await fastify.register(getLocationRoute);
};
