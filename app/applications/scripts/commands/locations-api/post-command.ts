import { Command } from "@oclif/core";

export default class PostCommand extends Command {
	public async run(): Promise<void> {
		this.log("Hello from oclif!");
	}
}
