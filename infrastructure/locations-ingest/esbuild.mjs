import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['./build/app/applications/locations-ingest/src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'node',
  outdir: './build/dist',
})