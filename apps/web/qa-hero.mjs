// Crops the hero headline block at the given viewport so descender clipping
// and line breaks can be inspected visually.
export default async function run(page) {
  const width = Number(process.env.QA_W || 390);
  await page.setViewportSize({ width, height: 900 });
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await page.waitForSelector("#hero-heading");
  await page.waitForTimeout(300);

  const h1 = page.locator("#hero-heading");
  const box = await h1.boundingBox();
  const metrics = await h1.evaluate((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const range = document.createRange();
    range.selectNodeContents(el);
    const lines = range.getClientRects().length;
    return {
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      overflow: cs.overflow,
      clientH: el.clientHeight,
      scrollH: el.scrollHeight,
      boxH: Math.round(r.height),
      lineBoxes: lines,
      textAlign: "start",
    };
  });

  await page.screenshot({
    path: `qa-hero-${width}.png`,
    clip: {
      x: 0,
      y: Math.max(0, (box?.y ?? 0) - 10),
      width,
      height: Math.min(260, (box?.height ?? 160) + 30),
    },
  });
  return metrics;
}
