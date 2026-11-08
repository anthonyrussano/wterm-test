import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = "dist";
if (!existsSync(join(root, "index.html"))) {
  throw new Error("Missing dist/index.html");
}

function filesIn(directory) {
  return readdirSync(directory).flatMap((name) => {
    const file = join(directory, name);
    return statSync(file).isDirectory() ? filesIn(file) : [file];
  });
}

const files = filesIn(root);
const wasm = files.filter((file) => file.endsWith(".wasm"));
const js = files.filter((file) => file.endsWith(".js"));
const index = readFileSync(join(root, "index.html"), "utf8");

if (!wasm.length || !wasm.some((file) => statSync(file).size > 100_000)) {
  throw new Error("Ghostty WASM asset missing or too small in dist/");
}
if (!js.length) throw new Error("Vite JavaScript bundle missing in dist/");
if (!index.includes("/wterm-test/")) {
  throw new Error("Vite GitHub Pages base path missing from index.html");
}
console.log("Validated static bundle:");
console.log(`  ${js.length} JavaScript file(s)`);
console.log(`  ${wasm.length} WASM file(s)`);
console.log("  GitHub Pages base path OK");
