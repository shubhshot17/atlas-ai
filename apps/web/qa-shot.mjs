// Screenshots one breakpoint of the homepage (full page) plus the header.
// Usage via --script; reads SIZE/NAME from argv passed through process.env.
export default async function run(page) {
  const name = process.env.QA_NAME || "desktop";
  const width = Number(process.env.QA_W || 1280);
  const height = Number(process.env.QA_H || 900);

  await page.setViewportSize({ width, height });
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await page.waitForSelector("#hero-heading");
  await page.waitForTimeout(400);

  await page.screenshot({ path: `qa-${name}.png`, fullPage: true });
  const header = await page.locator("header").boundingBox();
  await page.screenshot({
    path: `qa-${name}-header.png`,
    clip: {
      x: 0,
      y: 0,
      width,
      height: Math.min(200, header ? header.height + 60 : 200),
    },
  });
  return { name, width, headerHeight: header?.height };
}
