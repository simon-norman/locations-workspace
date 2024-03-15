import { Elysia } from "elysia";
import { PostLocationBody } from "./validation";

export const postLocationRoute = new Elysia().post(
	"/",
	async (context) => {
		return { name: context.body.name };
	},
	{
		body: PostLocationBody,
	},
);
