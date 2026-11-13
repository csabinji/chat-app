# Wenlo — Android app

Capacitor shell around the chat client. The UI lives in `chat-ai-frontend`;
each build compiles it into `www/` and packages it into the app.

- App ID: `com.wenlo.app` (permanent once published on Google Play)
- Capacitor 8.6.2, Android min SDK 24, target SDK 36

## Setup

1. Clone `chat-ai-frontend` next to this repo as `client/` (or set `CLIENT_DIR` in `.env`).
2. `cp .env.example .env` and set `VITE_API_BASE_URL` to the backend's `https://` URL.
3. `npm install`
4. Install Android Studio (bundles the Android SDK and JDK).

## Commands

| Command | Does |
|---|---|
| `npm run build:web` | Builds the client into `www/` |
| `npm run sync` | `build:web`, then copies `www/` into the Android project |
| `npm run open` | Opens the Android project in Android Studio (build, sign, run there) |
| `npm run run` | `sync`, then installs on a connected device or emulator |

Run `npm run sync` after every client change you want in the app.
