import { enhance } from "@zenstackhq/runtime";
import { generateAuthToken } from "./load-db";
import { PrismaClient } from "./prisma/client";

let prisma: PrismaClient;
export let locationsDb: PrismaClient;

export const loadLocationsDb = async () => {
	if (prisma) return;

	const region = "eu-west-2";
	const hostname =
		"dev-1-eu-west-2-db-locations-db-instance.cfsuok6qw1sp.eu-west-2.rds.amazonaws.com";
	const port = 5432;
	// const username = "dev-1-eu-west-2-role-locations-api";
	const username = "simon";

	const token = encodeURIComponent(await generateAuthToken());

	const dbUrl = `postgresql://${username}:${token}@${hostname}:${port}/locations?sslmode=require`;

	console.log("url", dbUrl);

	prisma = new PrismaClient({
		datasources: {
			db: {
				url: dbUrl,
			},
		},
	});

	locationsDb = enhance(prisma);
};
