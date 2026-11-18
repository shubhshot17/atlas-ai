import "dotenv/config";

type EnvironmentMode = "development" | "test" | "production";

const modeValue = process.env.NODE_ENV ?? "development";

if (modeValue !== "development" && modeValue !== "test" && modeValue !== "production") {
  throw new Error(`NODE_ENV must be "development", "test", or "production"; received "${modeValue}".`);
}

export const environmentMode: EnvironmentMode = modeValue;

const portValue = process.env.PORT ?? "4000";
const parsedPort = Number(portValue);

if (!/^\d+$/.test(portValue) || !Number.isInteger(parsedPort) || parsedPort < 0 || parsedPort > 65535) {
  throw new Error(`PORT must be an integer between 0 and 65535; received "${portValue}".`);
}

export const port = parsedPort;
export const applicationName = process.env.API_NAME?.trim() || "atlasai-api";

const defaultFrontendOrigins = environmentMode === "development"
  ? ["http://localhost:5173"]
  : [];
const configuredOrigins = process.env.FRONTEND_ORIGINS === undefined
  ? defaultFrontendOrigins
  : process.env.FRONTEND_ORIGINS.split(",");

const parseFrontendOrigin = (value: string): string => {
  const origin = value.trim();
  let url: URL;

  try {
    url = new URL(origin);
  } catch {
    throw new Error(`FRONTEND_ORIGINS contains an invalid origin: "${origin}".`);
  }

  if (
    (url.protocol !== "http:" && url.protocol !== "https:")
    || url.username !== ""
    || url.password !== ""
    || url.pathname !== "/"
    || url.search !== ""
    || url.hash !== ""
  ) {
    throw new Error(`FRONTEND_ORIGINS contains an invalid origin: "${origin}".`);
  }

  return url.origin;
};

export const frontendOrigins = configuredOrigins
  .map((origin) => origin.trim())
  .filter(Boolean)
  .map(parseFrontendOrigin);
