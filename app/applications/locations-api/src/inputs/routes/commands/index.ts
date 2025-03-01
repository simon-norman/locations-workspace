import type { FastifyInstance } from "fastify";
import { postStartCommand } from "./post-start-command";
import { updateStartCommand } from "./update-start-command";

export const commandRoutes = async (fastify: FastifyInstance) => {
	await fastify.register(postStartCommand);

	await fastify.register(updateStartCommand);
};
