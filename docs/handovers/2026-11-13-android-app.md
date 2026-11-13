# Handover: Wenlo Android app scaffold

- Date: 2026-11-13
- Repo: `csabinji/chat-app`, branch `proto/android-app`

## What was done

| Item | State |
|---|---|
| Approach | Capacitor 8.6.2 wrapper around the chat client (`chat-ai-frontend`); Android only. Admin panel not included. |
| App identity | Name "Wenlo", app ID `com.wenlo.app`. Name chosen after a web-search check of Google Play and the App Store on 2026-11-13 (no exact match found); not a trademark search. |
| Build | `scripts/build-web.mjs` builds the client from `../client` (or `CLIENT_DIR`) into `www/`. Fails unless `VITE_API_BASE_URL` is set and `https://`. |
| Client code | No changes needed. The in-app-browser screen only triggers for Facebook/Messenger/Instagram UAs; the app opens on the first character, as the bare website URL does. |

## Verified

- Client builds into `www/` with the API URL baked in (tested with placeholder `https://api.invalid`, not committed).
- `npx cap add android` generated the project with `com.wenlo.app`.

## Not verified

- No Gradle build or device run: this machine has no Android SDK or JDK.

## Open items

- Production API URL: unknown; must be set in `.env` before a real build.
- App icon and splash screen: Capacitor defaults. Need Wenlo artwork.
- Release signing key and Google Play listing.
- Trademark search for "Wenlo" before publishing.
- Page title in the client still reads "Chat with Ava" (not visible in the app's launcher).
- Server CORS is open (`cors()`), which the app relies on (origin `https://localhost`). If CORS is restricted later, allow that origin.
- No `AGY-STANDARDS.md` at the repo root; add from the org template.
