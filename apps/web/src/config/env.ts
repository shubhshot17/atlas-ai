/**
 * Typed access to the web app's build-time configuration.
 *
 * Only VITE_-prefixed variables are exposed to the browser, and anything bundled
 * here is public. Never put secrets (API keys with write access, database URIs)
 * in this file — the web app talks to the backend API only.
 */

function readFlag(value: string | undefined, fallback = false): boolean {
  if (value === undefined || value.trim() === '') return fallback;
  return value.trim().toLowerCase() === 'true';
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

export const appEnv = {
  name: import.meta.env.VITE_APP_NAME?.trim() || 'AtlasAI',
  mode: import.meta.env.VITE_APP_ENV?.trim() || import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,

  /**
   * Empty string means "same origin": in development Vite proxies /api to the
   * local backend (see vite.config.ts), which keeps the browser free of CORS.
   */
  apiBaseUrl: trimTrailingSlash(import.meta.env.VITE_API_BASE_URL?.trim() ?? ''),

  featureFlags: {
    tripRecommendations: readFlag(import.meta.env.VITE_ENABLE_TRIP_RECOMMENDATIONS),
  },
} as const;

export type AppEnv = typeof appEnv;
