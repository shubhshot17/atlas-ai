import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";

process.env.NODE_ENV = "test";
process.env.FRONTEND_ORIGINS = "https://web.example,https://admin.example";

const { default: app } = await import("../src/app.js");
const { applicationName } = await import("../src/config/env.js");

test("GET /api/health returns the service status and CORS allow-list", async (context) => {
  const server = app.listen(0);
  await once(server, "listening");
  context.after(() => new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  }));

  const address = server.address();
  assert.ok(address && typeof address !== "string");

  const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
  const allowedOriginResponse = await fetch(`http://127.0.0.1:${address.port}/api/health`, {
    headers: { Origin: "https://web.example" },
  });
  const deniedOriginResponse = await fetch(`http://127.0.0.1:${address.port}/api/health`, {
    headers: { Origin: "https://unlisted.example" },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    status: "ok",
    application: applicationName,
  });
  assert.equal(allowedOriginResponse.headers.get("access-control-allow-origin"), "https://web.example");
  assert.equal(deniedOriginResponse.headers.get("access-control-allow-origin"), null);
});
