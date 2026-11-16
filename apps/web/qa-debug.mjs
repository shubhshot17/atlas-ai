export default async function run(page) {
  await page.setViewportSize({ width: 375, height: 720 });
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  const toggle = page.locator('button[aria-controls="mobile-menu"]');

  const step = async (label, fn) => {
    try {
      return { label, ...(await fn()) };
    } catch (e) {
      return { label, error: String(e).split("\n")[0] };
    }
  };

  const out = [];
  out.push(
    await step("initial", () =>
      toggle.evaluate((el) => ({ display: getComputedStyle(el).display })),
    ),
  );
  out.push(
    await step("click-toggle", async () => {
      await toggle.click();
      await page.waitForTimeout(300);
      return {
        menuInDom: await page.evaluate(
          () => !!document.querySelector("#mobile-menu"),
        ),
        expanded: await toggle.getAttribute("aria-expanded"),
      };
    }),
  );
  out.push(
    await step("press-escape", async () => {
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      return {
        menuInDom: await page.evaluate(
          () => !!document.querySelector("#mobile-menu"),
        ),
        focusOnToggle: await page.evaluate(
          () => document.activeElement?.tagName,
        ),
      };
    }),
  );
  out.push(
    await step("click-toggle-again", async () => {
      await toggle.click();
      await page.waitForTimeout(300);
      return {
        menuInDom: await page.evaluate(
          () => !!document.querySelector("#mobile-menu"),
        ),
        expanded: await toggle.getAttribute("aria-expanded"),
        itemCount: await page.evaluate(
          () => document.querySelectorAll("#mobile-menu a").length,
        ),
      };
    }),
  );
  return out;
}
