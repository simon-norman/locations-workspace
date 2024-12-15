import fs from "node:fs";
import * as esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";

const excludeVendorFromSourceMapPlugin = ({ filter }) => ({
	name: "excludeVendorFromSourceMap",
	setup(build) {
		build.onLoad({ filter }, (args) => {
			if (args.path.includes("@breeze32")) {
				return null;
			}

			if (args.path.endsWith(".js")) {
				return {
					contents:
						// biome-ignore lint/style/useTemplate: <explanation>
						fs.readFileSync(args.path, "utf8") +
						"\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiJdLCJtYXBwaW5ncyI6IkEifQ==",
					loader: "default",
				};
			}
		});
	},
});

await esbuild.build({
	entryPoints: ["./build/app/applications/locations-ingest/src/index.ts"],
	bundle: true,
	minify: true,
	sourcemap: true,
	platform: "node",
	outdir: "./build/dist",
	plugins: [
		excludeVendorFromSourceMapPlugin({ filter: /node_modules/ }),
		copy({
			resolveFrom: "cwd",
			assets: {
				from: [
					"./build/app/libs/locations-db/node_modules/prisma/libquery_engine-rhel-openssl-3.0.x.so.node",
				],
				to: ["./build/dist/libquery_engine-rhel-openssl-3.0.x.so.node"],
			},
			watch: true,
		}),
	],
});
