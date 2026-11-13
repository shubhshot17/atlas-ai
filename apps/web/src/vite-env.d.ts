/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Display name of the application. */
  readonly VITE_APP_NAME?: string;
  /** Current app environment, e.g. "development" or "production". */
  readonly VITE_APP_ENV?: string;
  /** Base URL of the AtlasAI backend API. Leave empty to use same-origin requests. */
  readonly VITE_API_BASE_URL?: string;
  /** Dev-only: where Vite's /api proxy forwards requests. */
  readonly VITE_API_PROXY_TARGET?: string;
  /** Feature flag: trip recommendations. */
  readonly VITE_ENABLE_TRIP_RECOMMENDATIONS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
