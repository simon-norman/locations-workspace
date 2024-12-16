import { Type as T } from "@sinclair/typebox";

export const expectedConfig = T.Object({
	LOCATIONS_DB_PASSWORD: T.String(),
	LOCATIONS_DB_ENDPOINT: T.String(),
	AUTH_PUBLIC_KEY: T.String(),
});
