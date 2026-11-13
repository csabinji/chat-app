// Builds the chat client (the chat-ai-frontend repo) into www/, which
// Capacitor packages into the Android app. The UI lives only in the client
// repo; this repo holds the native shell.
//
// Settings come from the environment or mobile/.env:
//   VITE_API_BASE_URL  required: the app can't use the website's relative /api
//   CLIENT_DIR         path to the client checkout (default ../client)
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Minimal .env reader: KEY=value lines, # comments. Real env vars win.
const envFile = resolve(root, ".env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
  }
}

function fail(msg) {
  console.error(`build-web: ${msg}`);
  process.exit(1);
}

const apiBase = process.env.VITE_API_BASE_URL;
if (!apiBase) fail("VITE_API_BASE_URL is not set. Add it to mobile/.env (see .env.example).");
if (!/^https:\/\//.test(apiBase)) {
  // The app's pages load from https://localhost, so plain http is blocked as mixed content.
  fail(`VITE_API_BASE_URL must start with https:// (got ${apiBase}).`);
}

const clientDir = resolve(root, process.env.CLIENT_DIR || "../client");
if (!existsSync(resolve(clientDir, "package.json"))) {
  fail(`no client checkout at ${clientDir}. Clone chat-ai-frontend there or set CLIENT_DIR.`);
}

const run = (cmd) => execSync(cmd, { cwd: clientDir, stdio: "inherit", env: process.env });
if (!existsSync(resolve(clientDir, "node_modules"))) run("npm ci");
run(`npx vite build --outDir "${resolve(root, "www")}" --emptyOutDir`);
