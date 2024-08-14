import type { LocationIngest, Message } from "@breeze32/types";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Handler = (record: any) => Promise<void>;

export const handlerRegistry: Map<Message.Types, Handler> = new Map();
