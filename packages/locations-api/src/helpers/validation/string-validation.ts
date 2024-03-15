import { t } from "elysia";
import { defaultValidation } from "./default-validation";

export const defaultString = t.String(defaultValidation);
