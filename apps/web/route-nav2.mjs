export default async function run(page, ui) {
  await page.goto("http://localhost:4173/dashboard", {
    waitUntil: "networkidle",
  });

  await page.getByRole("link", { name: "Sign up" }).click();
  // Wait for the destination heading, not just the URL.
  await page
    .getByRole("heading", { level: 1, name: "Create an account" })
    .waitFor({ timeout: 5000 });

  return {
    url: new URL(page.url()).pathname,
    h1: await page.evaluate(() =>
      document.querySelector("h1")?.textContent.trim(),
    ),
    activeNav: await page.evaluate(
      () =>
        document.querySelector(
          'nav[aria-label="Primary"] a[aria-current="page"]',
        )?.textContent ?? null,
    ),
  };
}
