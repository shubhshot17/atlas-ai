# AtlasAI API Service

The API is a Node.js Express service written in TypeScript and configured as an ES module.

## Development

Use Node.js 20.19 or newer:

```sh
npm install
npm run dev
```

The development server listens on port `4000` by default. Set `PORT` to override it.
Copy `.env.example` to `.env` to configure the service. Existing process environment
variables take precedence over values in `.env`. `NODE_ENV` accepts `development`,
`test`, or `production`; `FRONTEND_ORIGINS` is a comma-separated list of HTTP(S)
origins. Development defaults to `http://localhost:5173`; other modes default to
an empty allow-list. Only configured origins receive CORS permission.

## Build and start

```sh
npm run build
npm start
```

`npm run typecheck` checks the TypeScript sources without producing build output.
`npm test` runs the API endpoint tests.

## Structure

```text
src/
├── config/       # Runtime configuration
├── controllers/  # HTTP request handlers
├── middleware/   # Shared Express middleware
├── routes/       # API route registration
└── services/     # Future application/service logic
```

The initial `GET /api/health` route returns the service status and application name; no business features are implemented.
