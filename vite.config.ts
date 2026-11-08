import { defineConfig } from "vite";

export default defineConfig({
  // GitHub Pages project-site paths include the repository name.
  base: "/wterm-test/",
  build: {
    target: "esnext",
  },
});
