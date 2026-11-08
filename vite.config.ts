import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  base: "/wterm-test/",
  resolve: {
    alias: {
      "node:zlib": fileURLToPath(new URL("./src/browser-zlib.ts", import.meta.url)),
    },
  },
  build: { target: "esnext" },
});
