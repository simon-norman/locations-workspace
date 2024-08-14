import { t } from "elysia";
import { defaultValidation } from "./default-validation";

export const defaultNumeric = t.Numeric(defaultValidation);
