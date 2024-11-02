import * as esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";

await esbuild.build({
	entryPoints: ["./build/app/applications/locations-ingest/src/index.ts"],
	bundle: true,
	minify: true,
	sourcemap: true,
	platform: "node",
	outdir: "./build/dist",
	plugins: [
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
