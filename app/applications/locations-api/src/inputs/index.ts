import type { FastifyInstance } from "fastify";
import { commandRoutes } from "./routes/commands";
import { locationRoutes } from "./routes/locations";

export const routes = async (fastify: FastifyInstance) => {
	await fastify.register(locationRoutes, { prefix: "/locations" });

	await fastify.register(commandRoutes, { prefix: "/commands" });
};
