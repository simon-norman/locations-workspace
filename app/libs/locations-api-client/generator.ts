import { generateClient } from "@breeze32/ts-backend-utilities";

generateClient({
	docsUrl: "http://localhost:3000/docs/json",
	outputDir: "./generated",
});
