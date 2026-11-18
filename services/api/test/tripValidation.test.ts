import assert from "node:assert/strict";
import { once } from "node:events";
import { test } from "node:test";

process.env.NODE_ENV = "test";
process.env.FRONTEND_ORIGINS = "https://web.example";

const { default: app } = await import("../src/app.js");

const withServer = async (run: (baseUrl: string) => Promise<void>): Promise<void> => {
  const server = app.listen(0);
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address !== "string");

  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
};

test("valid trip creation requests pass validation", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destination: "  Kyoto ",
        startDate: "2027-04-10",
        endDate: "2027-04-14",
        travelers: 2,
      }),
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      status: "valid",
      trip: {
        destination: "Kyoto",
        startDate: "2027-04-10",
        endDate: "2027-04-14",
        travelers: 2,
      },
    });
  });
});

test("invalid trip creation requests return field-level errors", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destination: "  ",
        startDate: "2027-02-30",
        endDate: "2027-02-20",
        travelers: 0,
      }),
    });
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.equal(payload.error.code, "VALIDATION_ERROR");
    assert.deepEqual(
      payload.error.details.map((issue: { field: string }) => issue.field).sort(),
      ["destination", "endDate", "startDate", "travelers"],
    );
    assert.ok(payload.error.details.some((issue: { field: string; message: string }) =>
      issue.field === "endDate" && issue.message === "End date must be after start date.",
    ));
  });
});
