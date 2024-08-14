import type { Message } from "./message";

export namespace LocationIngest {
	export type New = {
		latitude: string;
		longitude: string;
		name: string;
	};

	export type NewLocationMessage = Message.Payload<LocationIngest.New>;
}
