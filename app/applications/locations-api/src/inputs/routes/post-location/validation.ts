import { defaultNumeric, defaultString } from "@breeze32/ts-backend-utilities";
import { Type as t } from "@sinclair/typebox";

export const postLocationBody = t.Object({
	name: defaultString,
	coordinates: t.Object({
		latitude: defaultNumeric,
		longitude: defaultNumeric,
	}),
});
