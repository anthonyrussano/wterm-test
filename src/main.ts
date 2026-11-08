import { WTerm } from "@wterm/dom";
import { GhosttyCore } from "@wterm/ghostty";
import { BashShell } from "@wterm/just-bash";
import "@wterm/dom/css";
import "./style.css";

const root = document.getElementById("terminal");
const status = document.getElementById("runtime-status");
const errorPanel = document.getElementById("terminal-error");
const restartButton = document.getElementById("restart");

if (!root || !status || !errorPanel || !restartButton) {
  throw new Error("The terminal page is missing a required element.");
}

restartButton.addEventListener("click", () => window.location.reload());

const setStatus = (message: string) => {
  status.textContent = message;
};

async function start(): Promise<void> {
  try {
    // Vite bundles the Ghostty WASM into dist/assets and resolves its URL,
    // including the /wterm-ghostty-demo/ GitHub Pages base path.
    const core = await GhosttyCore.load({
      foregroundColor: "#d7e0ed",
      backgroundColor: "#0b111b",
    });

    const terminal = new WTerm(root!, { core });
    await terminal.init();

    const shell = new BashShell({
      greeting: [
        "\x1b[1;32mGhostty + just-bash\x1b[0m   \x1b[90m(wterm demo)\x1b[0m",
        "Your commands run locally in the browser, not on a server.",
        "Type \x1b[1;36mhelp\x1b[0m or \x1b[1;36mcat README.md\x1b[0m to get started.",
        "",
      ],
      files: {
        "/home/user/README.md": `# Ghostty + just-bash

Welcome to an entirely static browser terminal!

Terminal emulator : @wterm/dom + @wterm/ghostty
Command interpreter: @wterm/just-bash + just-bash
Hosting            : GitHub Pages
Backend            : None

Try these commands:
  pwd
  ls -la
  cat README.md
  bash hello.sh
  echo 'Hello, browser!'

Commands and files stay in this browser session.
This is not a real operating-system shell or SSH connection.
`,
        "/home/user/hello.sh": `#!/usr/bin/env bash
echo 'Hello from a browser-only Bash interpreter!'
echo 'No server or login required.'
pwd
`,
        "/home/user/docs/architecture.md": `# Architecture

GitHub Pages --(static assets)--> Your browser

Your browser:
  @wterm/dom      terminal renderer and keyboard input
  @wterm/ghostty  WebAssembly VT parser and terminal state
  @wterm/just-bash + just-bash  virtual shell and files

There is no backend service.
`,
      },
    });

    await shell.attach(terminal.write.bind(terminal));
    terminal.onData = (data: string) => {
      void shell.handleInput(data).catch((err: unknown) => {
        console.error("Shell error:", err);
        terminal.write("\r\n\x1b[31mCommand failed unexpectedly.\x1b[0m\r\n");
      });
    };

    setStatus("Ghostty WASM ready");
  } catch (err) {
    setStatus("Failed to load");
    errorPanel!.hidden = false;
    errorPanel!.textContent = `The terminal could not start. ${err instanceof Error ? err.message : String(err)}. Check the browser developer console for details.`;
    console.error("Ghostty terminal initialization failed:", err);
  }
}

void start();
