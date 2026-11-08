import { defineConfig } from "vite";

export default defineConfig({
  base: "/wterm-test/",
  resolve: {
    alias: {
      "node:zlib": new URL("./src/browser-zlib.ts", import.meta.url).pathname,
    },
  },
  build: { target: "esnext" },
});
