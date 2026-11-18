// Drives the mobile drawer: opens it, measures each row, follows a link,
// and confirms the menu closes and routes. Purely behavioural, no styling.
export default async function run(page) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await page.waitForSelector("#hero-heading");

  const opener = page.locator("header button[aria-expanded]").first();
  const before = await opener.getAttribute("aria-expanded");
  await opener.click();
  await page.waitForSelector("#mobile-menu", { state: "visible" });
  const opened = await opener.getAttribute("aria-expanded");

  const rows = await page.evaluate(() =>
    [...document.querySelectorAll("#mobile-menu a")].map((a) => {
      const r = a.getBoundingClientRect();
      return {
        label: a.textContent.trim(),
        h: Math.round(r.height),
        right: Math.round(r.right),
        vw: document.documentElement.clientWidth,
      };
    }),
  );

  await page.screenshot({
    path: "qa-menu-open.png",
    clip: { x: 0, y: 0, width: 390, height: 420 },
  });

  await page.locator("#mobile-menu a", { hasText: "Explore" }).first().click();
  await page.waitForTimeout(600);
  const afterClick = {
    url: page.url(),
    menuStillMounted: (await page.locator("#mobile-menu").count()) > 0,
    expanded: await page
      .locator("header button[aria-expanded]")
      .first()
      .getAttribute("aria-expanded"),
  };

  // Keyboard close (Escape) on a fresh page.
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await page.locator("header button[aria-expanded]").first().click();
  await page.waitForSelector("#mobile-menu", { state: "visible" });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  const escapeCloses = (await page.locator("#mobile-menu").count()) === 0;

  return { before, opened, rows, afterClick, escapeCloses };
}
