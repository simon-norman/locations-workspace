import { Elysia } from "elysia";
import { postLocationRoute } from "./post-location/route";

export const routes = new Elysia({
	prefix: "/locations",
}).use(postLocationRoute);
