import { edenTreaty } from "@elysiajs/eden";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { routes } from "./routes";

const app = new Elysia().use(swagger()).use(routes).listen(3000);

const api = edenTreaty<typeof app>("http://localhost:3000");

api.locations[""]
	.post({
		name: "Location",
		coordinates: { latitude: 123, longitude: 123 },
	})
	.then((res) => console.log(res));
