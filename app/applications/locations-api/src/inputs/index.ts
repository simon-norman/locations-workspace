import type { FastifyInstance } from "fastify";
import { locationRoutes } from "./routes";

export const routes = async (fastify: FastifyInstance) => {
	await fastify.register(locationRoutes, { prefix: "/locations" });
};
