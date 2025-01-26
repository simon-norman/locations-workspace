import type Stripe from "stripe";
import type { Cpo } from "./cpo";

type Dependencies = {
	payments: Stripe;
	cpo: Cpo;
};

export let deps: Dependencies;

export const setDeps = (dependencies: Dependencies) => {
	deps = dependencies;
};
