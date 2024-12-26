import awsLambdaFastify from "@fastify/aws-lambda";
import type { FastifyInstance } from "fastify";
import { runApp } from "./run-app";

let proxy: ReturnType<typeof awsLambdaFastify>;

export const lambdaHandler = async (event: any, context: any) => {
	if (!proxy) {
		const app = await runApp({ runAsServer: false });
		proxy = await awsLambdaFastify(app as FastifyInstance);
	}

	// @ts-expect-error
	return proxy(event, context);
};
