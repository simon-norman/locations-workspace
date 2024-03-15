import { foo } from "@breeze32/services";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { routes } from "./routes";

new Elysia()
	.get("/health", () => foo())
	.use(swagger())
	.use(routes)
	.listen(3000);
