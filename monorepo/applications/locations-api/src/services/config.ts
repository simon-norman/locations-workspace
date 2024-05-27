import {
	GetSecretValueCommand,
	ListSecretsCommand,
	SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { type Static, Type as T } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export const config = {};

const expectedConfig = T.Object({
	TOKEN: T.String(),
	LOCATIONS_DB_PASSWORD: T.String(),
	LOCATIONS_DB_ENDPOINT: T.String(),
});

const awsSecretClient = new SecretsManagerClient({ region: "eu-west-2" });

export let loadedConfig: Static<typeof expectedConfig>;

export const loadConfig = async () => {
	if (loadedConfig) return;

	let rawConfig = config;
	if (process.env.NODE_ENV === "local") {
		rawConfig = loadConfigLocally();
	} else {
		rawConfig = await loadConfigFromAwsSecrets();
	}

	rawConfig = {
		...rawConfig,
		...loadUnsecretConfig(),
	};

	loadedConfig = Value.Decode(expectedConfig, rawConfig);
};

const loadConfigFromAwsSecrets = async () => {
	return getAwsSecretValue(`locations-api-${process.env.NODE_ENV}/doppler`);
};

const loadUnsecretConfig = () => {
	return {
		LOCATIONS_DB_ENDPOINT: process.env.LOCATIONS_DB_ENDPOINT,
	};
};

const getAwsSecretValue = async (
	secretName: string,
): Promise<Record<string, string>> => {
	const command = new GetSecretValueCommand({ SecretId: secretName });
	const response = await awsSecretClient.send(command);

	if (!response.SecretString)
		throw new Error("AWS secret not available as string");

	// Parse the secret string as JSON and return
	return JSON.parse(response.SecretString);
};

const loadConfigLocally = () => {
	return {
		TOKEN: process.env.TOKEN,
	};
};
