# wterm Ghostty + just-bash (static GitHub Pages demo)

A browser-only terminal playground powered by:

- [`@wterm/ghostty`](https://github.com/vercel-labs/wterm/tree/main/packages/%40wterm/ghostty) — Ghostty VT emulation compiled to WebAssembly
- [`@wterm/dom`](https://github.com/vercel-labs/wterm/tree/main/packages/%40wterm/dom) — terminal rendering and keyboard input
- [`@wterm/just-bash`](https://github.com/vercel-labs/wterm/tree/main/packages/%40wterm/just-bash) / [`just-bash`](https://github.com/vercel-labs/just-bash) — virtual shell and in-browser files
- Vite — builds static HTML/CSS/JavaScript/WASM

**No server, Docker daemon, SSH service, database, API keys, or live command execution is involved.** The shell is simulated inside the visitor's browser.

## Requirements

- Node.js 24 (for this demo's checked build environment)
- npm

## Run locally

```bash
npm install
npm run dev
```

Vite prints a local URL. `npm run build` type-checks and builds into `dist/`, then verifies that Ghostty's `.wasm` asset and GitHub Pages base path are present. Preview with `npm run preview`.

## Deploy to GitHub Pages

This repository is configured for **`anthonyrussano/wterm-test`**.

1. In **Settings → Pages**, choose **GitHub Actions** as the build and deployment source.
2. Pushing to `main` triggers `.github/workflows/deploy.yml` automatically. If Pages was not enabled before the first push, open **Actions → Deploy static Ghostty demo → Run workflow** to retry after enabling it.
3. The published site is **https://anthonyrussano.github.io/wterm-test/** after a successful deployment.

The GitHub Actions workflow uses Node.js 24, installs dependencies, checks TypeScript, builds the Vite app, validates the emitted Ghostty WebAssembly binary, and deploys `dist/`.

## Architecture and limits

GitHub Pages serves only the compiled assets. The browser downloads and initializes Ghostty WebAssembly, then wterm renders the terminal while just-bash executes supported commands against virtual in-memory files. It cannot access a real Linux PTY, the visitor's local filesystem, GitHub credentials, or a remote machine.

## Troubleshooting

- **404 on assets:** Keep `base: "/wterm-test/"` in `vite.config.ts` for a GitHub Pages project URL.
- **Terminal initialization failed:** Open browser developer tools; confirm the `.wasm` file appears in the network requests (HTTP 200).
- **A command isn't implemented:** `just-bash` simulates a subset of Bash/Linux behavior and commands, not a full operating system.
- **Pages 404 after workflow:** Verify the GitHub Pages source is GitHub Actions and that the workflow completed successfully.

## Attribution

This is an independently assembled demo based on the public [Vercel Labs wterm](https://github.com/vercel-labs/wterm) examples and documentation. Those dependencies are Apache-2.0 licensed. This demo does not bundle modified copies of their source.
