// Visual evidence for the headline descender question: screenshot the H1
// region with a marker line at the element's bottom edge, and report whether
// visible font ink pixels exist below that line.
export default async function run(page) {
  const w = Number(process.env.QA_W || 1280);
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await page.waitForSelector("#hero-heading");
  await page.waitForTimeout(300);

  const info = await page.evaluate(() => {
    const h1 = document.querySelector("#hero-heading");
    const r = h1.getBoundingClientRect();
    // Band right at and just below the box bottom, over the full width.
    const marker = document.createElement("div");
    marker.style.cssText = `position:absolute;left:0;top:${Math.round(r.bottom)}px;width:100%;height:1px;background:#ff00aa;z-index:9999;pointer-events:none`;
    document.body.appendChild(marker);
    const band = document.createElement("div");
    band.style.cssText = `position:absolute;left:${Math.round(r.left)}px;top:${Math.round(r.bottom)}px;width:${Math.round(r.width)}px;height:12px;outline:1px dashed #ff00aa;z-index:9999;pointer-events:none`;
    document.body.appendChild(band);
    return {
      top: r.top + scrollY,
      bottom: r.bottom,
      height: r.height,
      width: r.width,
      left: r.left,
    };
  });

  await page.screenshot({
    path: `qa-desc-${w}.png`,
    clip: {
      x: Math.max(0, info.left - 8),
      y: Math.max(0, info.top - 8),
      width: Math.min(w - info.left + 8, info.width + 16),
      height: info.height + 26,
    },
  });
  return info;
}
