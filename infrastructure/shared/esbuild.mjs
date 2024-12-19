import { execSync } from "node:child_process";
import fs from "node:fs";
import * as esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";

const args = process.argv.slice(2);

const serviceName = args[0];
const inclLocationsDb = args[1] === "true";

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
					`${REPO_ROOT}/infrastructure/${serviceName}/build/dist/libquery_engine-rhel-openssl-3.0.x.so.node`,
				],
			},
			watch: true,
		}),
	);
}

await esbuild.build({
	entryPoints: [`${REPO_ROOT}/app/applications/${serviceName}/src/index.ts`],
	bundle: true,
	minify: true,
	sourcemap: true,
	platform: "node",
	outdir: `${REPO_ROOT}/infrastructure/${serviceName}/build/dist`,
	plugins,
});
