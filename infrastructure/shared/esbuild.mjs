import { execSync } from "node:child_process";
import fs from "node:fs";
import * as esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";

const args = process.argv.slice(2);

const serviceName = args[0];
const inclLocationsDb = args[1] === "true";
const infraServiceName = args[2] ?? serviceName;
const serviceModuleName = args[3] ?? "index";

const REPO_ROOT = execSync("git rev-parse --show-toplevel", {
	encoding: "utf-8",
}).trim();

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

const plugins = [excludeVendorFromSourceMapPlugin({ filter: /node_modules/ })];

if (inclLocationsDb) {
	plugins.push(
		copy({
			resolveFrom: "cwd",
			assets: {
				from: [
					`${REPO_ROOT}/app/libs/locations-db/node_modules/prisma/libquery_engine-rhel-openssl-3.0.x.so.node`,
				],
				to: [
					`${REPO_ROOT}/infrastructure/${infraServiceName}/build/dist/libquery_engine-rhel-openssl-3.0.x.so.node`,
				],
			},
			watch: true,
		}),
	);
}

await esbuild.build({
	entryPoints: [
		`${REPO_ROOT}/app/applications/${serviceName}/src/${serviceModuleName}.ts`,
	],
	bundle: true,
	minify: true,
	sourcemap: true,
	platform: "node",
	outdir: `${REPO_ROOT}/infrastructure/${infraServiceName}/build/dist`,
	plugins,
	// have to make external and install separately as esbuild doesn't seem to be able
	// to handle the imports inside them (e.g. to svgs and html files inside those libraries)
	external: ["@fastify/swagger", "@fastify/swagger-ui"],
	loader: {
		".json": "json",
		".svg": "file", // This will inline SVGs as base64
		".png": "dataurl", // Same for other assets
		".jpg": "dataurl",
		".gif": "dataurl",
		".css": "text", // If you need to import CSS as text
		".txt": "text", // Text files
		".html": "text", // HTML files
		".yaml": "text", // YAML files
		".yml": "text", // YML files
	},
});
