import { LocationIngest, Message } from "@breeze32/types";
import { newLocationHandler } from "./new-location/handler";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Handler = (record: any) => Promise<void>;

export const handlerRegistry: Map<Message.Types, Handler> = new Map();

handlerRegistry.set(Message.Types.newLocation, newLocationHandler);