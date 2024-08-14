import { locationsDb } from "@breeze32/locations-db";
import { type LocationIngest, Message } from "@breeze32/types";

export const newLocationHandler = async (location: LocationIngest.New) => {
	await locationsDb.location.create({ data: { address: location.name } });
};
