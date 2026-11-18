import assert from "node:assert/strict";
import { once } from "node:events";
import express from "express";
import type { Express } from "express";
import { test } from "node:test";

process.env.NODE_ENV = "production";
process.env.FRONTEND_ORIGINS = "https://web.example";

const { default: app } = await import("../src/app.js");
const { errorHandler } = await import("../src/middleware/errorHandler.js");

const startServer = async (application: Express) => {
  const server = application.listen(0);
  await once(server, "listening");

  const address = server.address();
  assert.ok(address && typeof address !== "string");

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    }),
  };
};

test("unknown routes return a consistent 404 error", async () => {
  const server = await startServer(app);
  try {
    const response = await fetch(`${server.baseUrl}/api/missing`);

    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), {
      error: {
        code: "NOT_FOUND",
        message: "No route found for GET /api/missing.",
      },
    });
  } finally {
    await server.close();
  }
});

test("invalid JSON returns a consistent 400 error", async () => {
  const server = await startServer(app);
  try {
    const response = await fetch(`${server.baseUrl}/api/health`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{invalid json",
    });

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), {
      error: {
        code: "INVALID_JSON",
        message: "Request body contains invalid JSON.",
      },
    });
  } finally {
    await server.close();
  }
});

test("internal errors do not expose details or stack traces in production", async () => {
  const errorApp = express();
  errorApp.get("/failure", (_request, _response, next) => {
    next(new Error("sensitive internal details"));
  });
  errorApp.use(errorHandler);

  const server = await startServer(errorApp);
  try {
    const response = await fetch(`${server.baseUrl}/failure`);

    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred.",
      },
    });
  } finally {
    await server.close();
  }
});
