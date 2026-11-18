const portValue = process.env.PORT ?? "4000";
const parsedPort = Number(portValue);

if (!Number.isInteger(parsedPort) || parsedPort < 0 || parsedPort > 65535) {
  throw new Error(`PORT must be an integer between 0 and 65535; received "${portValue}".`);
}

export const port = parsedPort;
