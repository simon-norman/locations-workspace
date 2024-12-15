import type { FastifyInstance } from "fastify";
import { postLocationRoute } from "./post-location/route";

export const locationRoutes = async (fastify: FastifyInstance) => {
	await fastify.register(postLocationRoute);
};
