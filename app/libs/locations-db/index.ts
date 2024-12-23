import { enhance } from "@zenstackhq/runtime";
import { PrismaClient } from "./prisma/client";

let prisma: PrismaClient;
export let locationsDb: PrismaClient;

type LocationsDbParams = {
	endpoint: string;
	username: string;
	password: string;
};

export const loadLocationsDb = (params: LocationsDbParams) => {
	if (prisma) return;

	const dbUrl = `postgresql://${params.username}:${params.password}@${
		params.endpoint
	}/locations-db?sslmode=${
		process.env.NODE_ENV === "local" ? "prefer" : "require"
	}`;

	prisma = new PrismaClient({
		datasources: {
			db: {
				url: dbUrl,
			},
		},
	});

	locationsDb = enhance(prisma);
};
