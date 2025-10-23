# SunMoon Proxy

A lightweight web proxy UI that embeds HTML games and provides a small in-app browser/launcher.

Features implemented so far:
- Clean UI (header, hero, side actions)
- Games page with embedded iframe player
- Version check that compares local `version.txt` with a remote file and shows a popup when outdated

Games are sourced from GN-Math; credit will be shown in-app and in the project when deployed.

This project is a work in progress.

Proxy / search notes
--------------------

GitHub Pages is static, so to proxy external pages you'll need a serverless proxy (example included):

- `workers/proxy.js` — a Cloudflare Worker example that forwards requests and strips common frame-blocking headers (x-frame-options, content-security-policy). Deploy it using Wrangler or the Cloudflare dashboard.
- After you deploy the Worker, set `PROXY_BASE` in `index.html` to the worker URL with a `?url=` parameter prefix (for example: `https://your-worker.example.workers.dev/?url=`). Then the header URL bar will open remote pages through the worker so they can be embedded.

Security note: running an open proxy can be abused. If you deploy this, restrict origins or add an allowlist, and be mindful of third-party terms and copyright.

Adding more games
-----------------

To add a game, place the game's HTML file into the `games/` folder and ensure its assets are reachable relative to that file. Edit `games.html` manually to add a card for the new game (or ask me and I can update it for you).