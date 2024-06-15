import { locationsDb } from "@breeze32/locations-db";
import { type LocationIngest, Message } from "@breeze32/types";
import { handlerRegistry } from "../handler-registry";

export const newLocationHandler = async (location: LocationIngest.New) => {
	await locationsDb.location.create({ data: { address: location.name } });
};

handlerRegistry.set(Message.Types.newLocation, newLocationHandler);
