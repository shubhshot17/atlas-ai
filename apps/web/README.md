# AtlasAI Web App

The React web application for AtlasAI, built with React 19, Vite 6, and TypeScript 5.9.

Planned responsibilities:

- User-facing travel planning experience
- Dashboard and trip management screens
- Authentication and onboarding flows
- Shared UI components and design system

## Requirements

- Node.js `>= 20.19` (developed against Node 22)
- npm 10+

## Getting started

```powershell
cd apps/web
npm install
Copy-Item .env.example .env.local   # optional: local overrides
npm run dev
```

The dev server runs at <http://localhost:5173>. All source lives in `src/`.

## Scripts

| Script              | Command                | Purpose                                                                |
| ------------------- | ---------------------- | ---------------------------------------------------------------------- |
| `npm run dev`       | `vite`                 | Development server with hot module replacement on port 5173            |
| `npm run build`     | `tsc -b && vite build` | Type-check the whole project, then emit a production bundle to `dist/` |
| `npm run preview`   | `vite preview`         | Serve the built `dist/` bundle locally on port 4173                    |
| `npm run lint`      | `eslint .`             | Lint TypeScript/TSX with the flat config in `eslint.config.js`         |
| `npm run typecheck` | `tsc -b --noEmit`      | Type-check only, without producing output                              |

## Project structure

```text
apps/web/
├── public/              # Static assets copied as-is (favicon)
├── src/
│   ├── main.tsx         # React entry point
│   ├── App.tsx          # Root component
│   ├── App.css          # Component styles
│   ├── index.css        # Global styles and CSS variables
│   ├── config/env.ts    # Typed access to VITE_ environment variables
│   └── vite-env.d.ts    # Ambient types for import.meta.env
├── index.html           # Vite HTML entry
├── vite.config.ts       # Vite config (React plugin, @ alias, /api dev proxy)
├── tsconfig.json        # Solution file referencing the two configs below
├── tsconfig.app.json    # App source compiler options (strict)
├── tsconfig.node.json   # Vite config compiler options
└── eslint.config.js     # ESLint flat config
```

The `@/` import alias maps to `src/`, for example `import { appEnv } from '@/config/env';`.

## Environment variables

Only `VITE_`-prefixed variables are exposed to the browser, and **everything bundled is public**. See
`.env.example` for the full list. The important ones:

- `VITE_API_BASE_URL` — absolute backend URL for deployed environments. Leave empty locally.
- `VITE_API_PROXY_TARGET` — where Vite's dev server forwards `/api` requests (default `http://localhost:4000`).

In development the app calls `/api/...` on its own origin and Vite proxies it to the backend, so no CORS setup is
needed and the backend's `CLIENT_ORIGIN=http://localhost:5173` stays valid.

## Security boundary

This app talks to the Node.js backend API only. It must never hold MongoDB credentials (including `MONGODB_URI`) and
never connects to MongoDB directly — see [docs/database-design.md](../../docs/database-design.md).

## Deployment

`npm run build` produces a static bundle in `dist/` that can be served by any static host or CDN. Configure the host to
rewrite unknown paths to `index.html` so client-side routes resolve correctly.
