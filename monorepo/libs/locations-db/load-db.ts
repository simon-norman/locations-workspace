import { Signer } from "@aws-sdk/rds-signer";
import { PrismaClient } from "@prisma/client";

interface TokenInfo {
	token: string;
	expirationTime: Date;
}

export async function generateAuthToken(): Promise<string> {
	const region = "eu-west-2";
	const hostname =
		"dev-1-eu-west-2-db-locations-db-instance.cfsuok6qw1sp.eu-west-2.rds.amazonaws.com";
	const port = 5432;
	const username = "locations-api";

	const signer = new Signer({
		region,
		hostname,
		port,
		username,
	});

	const authToken = await signer.getAuthToken();

	return authToken;
}
