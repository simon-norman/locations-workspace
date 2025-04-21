import { initGeneratedClient } from "@breeze32/ts-backend-utilities";
import { client } from "./generated/client.gen";
import * as sdk from "./generated/sdk.gen";

type InitConfig = Parameters<typeof initGeneratedClient>[1];

const initClient = (config: InitConfig) => {
	initGeneratedClient(client, config);

	return { locationsSdk: sdk };
};

export {
	client as locationsApiClient,
	initGeneratedClient,
	sdk as locationsSdk,
	initClient,
};
