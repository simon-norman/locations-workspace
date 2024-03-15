import { t } from "elysia";
import { defaultNumeric } from "../../helpers/validation/numeric-validation";
import { defaultString } from "../../helpers/validation/string-validation";

export const PostLocationBody = t.Object({
	name: defaultString,
	coordinates: t.Object({
		latitude: t.Numeric(defaultNumeric),
		longitude: t.Numeric(defaultNumeric),
	}),
});
