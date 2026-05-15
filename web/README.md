# SiteDrift Web Frontend

This is the decoupled SiteDrift web presence described in `FRONTEND.md`.

## Features

- Public landing page with live `/stats/summary` integration.
- Searchable supported-sites directory seed.
- Community stats dashboard using public backend stats.
- Admin login, reports queue, delete vote, and password-change screens wired to existing Go admin APIs.

## Commands

```bash
npm install
npm run build
```

For local development, run this manually from `web/`:

```bash
npm run dev
```

Set `VITE_API_BASE_URL` to point at a local or deployed SiteDriftCrowd API. It defaults to `https://crowd.sitedrift.team`.

## Backend Notes

The current Go backend must allow CORS for the deployed frontend origin on `/stats/summary` and `/admin/api/*` before this can run from a separate domain. The legacy static admin panel can remain until deployment routing is switched to this app.
