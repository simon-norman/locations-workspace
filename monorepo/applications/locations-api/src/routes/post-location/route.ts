import { locationsDb } from "@breeze32/locations-db";
import { Elysia } from "elysia";
import { PostLocationBody } from "./validation";

export const postLocationRoute = new Elysia().post(
	"/",
	async (context) => {
		const locationCount = await locationsDb.location.count();
		return { name: context.body.name, locationCount };
	},
	{
		body: PostLocationBody,
	},
);
