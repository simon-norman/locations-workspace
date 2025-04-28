import { locationsDb } from "@breeze32/locations-db";
import type { FastifyTypebox } from "@breeze32/ts-backend-utilities";
import {
	authMiddleWare,
	defaultNumber,
	defaultNumeric,
	defaultString,
} from "@breeze32/ts-backend-utilities";
import { Type as t } from "@sinclair/typebox";
import dedent from "dedent";

export const postLocationBody = t.Object({
	name: defaultString,
	coordinates: t.Object({
		latitude: defaultNumeric,
		longitude: defaultNumber({
			description: dedent`
    # Latitude

    The angular distance north or south from the Earth's equator.

    ## Format
    - Decimal degrees
    - Range: **-90° to +90°**
    - Precision: Up to 6 decimal places

    ## Examples
    \`\`\`
    New York City:    40.7128° N
    London:           51.5074° N
    Sydney:          -33.8688° S
    Equator:           0.0000°
    North Pole:       90.0000° N
    South Pole:      -90.0000° S
    \`\`\`

    ## Important Notes
    - Positive values indicate **North** of the equator
    - Negative values indicate **South** of the equator
    - Values outside the valid range will be rejected

    ## Precision Guidelines
    | Decimal Places | Precision | Example |
    |----------------|-----------|---------|
    | 0 | 111 km | 40° |
    | 1 | 11.1 km | 40.7° |
    | 2 | 1.11 km | 40.71° |
    | 3 | 111 m | 40.713° |
    | 4 | 11.1 m | 40.7128° |
    | 5 | 1.11 m | 40.71278° |
    | 6 | 0.111 m | 40.712784° | 

    **Recommended:** Use 4-6 decimal places for most applications.
        `,
		}),
	}),
});

export const postLocationRoute = async (fastify: FastifyTypebox) => {
	fastify.post("/", {
		schema: {
			// TODO: add response schemas, where appropriate from the database schemas or perhaps from something mapped
			body: postLocationBody,
		},
		preHandler: [authMiddleWare(["locations-api:base"])],
		handler: async (request) => {
			const newLocation = await locationsDb.location.create({
				data: {
					address: request.body.name,
				},
			});

			return newLocation;
		},
	});
};
