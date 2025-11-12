import * as esbuild from "esbuild";

const args = process.argv;
const isDevMode = args.includes("--dev");

const baseConfig = {
  entryPoints: ["src/server.ts"],
  bundle: true,
  packages: "external",
  format: "esm",
  outfile: "dist/server.js",
  platform: "node",
  sourcemap: isDevMode,
};

const ctx = await esbuild.context(baseConfig);

if (isDevMode) {
  await ctx.watch();
  console.log("watching...");
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
