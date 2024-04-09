import {
	GetSecretValueCommand,
	ListSecretsCommand,
	SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { Type as T } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export const config = {};

const expectedConfig = T.Object({
	TOKEN: T.String(),
});

const awsSecretClient = new SecretsManagerClient({ region: "eu-west-2" });

export const loadConfig = async () => {
	let rawConfig = config;
	if (process.env.NODE_ENV === "local") {
		rawConfig = loadConfigLocally();
	} else {
		rawConfig = await loadConfigFromAwsSecrets();
	}
	console.log("CONFIG", rawConfig);

	const configErrors = [...Value.Errors(expectedConfig, rawConfig)];

	if (configErrors.length) {
		throw new Error("Config validation failed", { cause: configErrors });
	}

	return config;
};

const loadConfigFromAwsSecrets = async () => {
	return getAwsSecretValue(`locations-api-${process.env.NODE_ENV}/doppler`);
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
