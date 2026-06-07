# Pawly Website

Marketing site for [Pawly](https://github.com/mangiapanejohn-dev/Pawly) — the agent companion that lives in your menu bar.

## Stack

Static site, zero build step. Just HTML / CSS / JS.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Pushed to Vercel via the CLI. Live at https://pawly-website-beta.vercel.app

## File map

- `index.html` — landing page
- `styles.css` — all styles
- `script.js` — interactivity
- `favicon.svg` — paw icon
- `vercel.json` — Vercel project config (`public: true`, `cleanUrls`)

## License

See `LICENSE`.
