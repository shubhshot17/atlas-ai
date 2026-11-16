export default async function run(page, ui) {
  // Start on Explore, then navigate only by clicking links (no full reloads).
  await page.goto("http://localhost:4173/explore", {
    waitUntil: "networkidle",
  });

  const steps = [];
  const record = async (name) => {
    steps.push({
      step: name,
      url: new URL(page.url()).pathname,
      h1: await page.evaluate(
        () => document.querySelector("h1")?.textContent.trim() ?? null,
      ),
      h1Count: await page.evaluate(
        () => document.querySelectorAll("h1").length,
      ),
    });
  };

  await record("landed on /explore");

  // Open a destination from the Explore page's empty state? There is none there,
  // so use the address bar link the layout provides: go back Home via nav link.
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await page.waitForURL("http://localhost:4173/");
  await record("clicked Home nav link");

  // "Start exploring" CTA on the home page.
  await page.getByRole("link", { name: "Start exploring" }).click();
  await page.waitForURL("**/explore");
  await record("clicked Start exploring CTA");

  // Dashboard via nav.
  await page.getByRole("link", { name: "Dashboard" }).click();
  await page.waitForURL("**/dashboard");
  await record("clicked Dashboard nav link");

  // Sign up CTA in header.
  await page.getByRole("link", { name: "Sign up" }).click();
  await page.waitForURL("**/register");
  await record("clicked Sign up header link");

  // Footer-less check: no full page reloads happened.
  return steps;
}
