export default async function run(page) {
  const out = {};

  for (const [label, size] of [
    ["desktop", { width: 1280, height: 900 }],
    ["mobile", { width: 375, height: 720 }],
  ]) {
    await page.setViewportSize(size);
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    out[label] = await page.evaluate(() => {
      const footer = document.querySelector("footer");
      const links = Array.from(footer.querySelectorAll("a")).map((a) => ({
        text: a.textContent.trim(),
        href: a.getAttribute("href"),
      }));
      const headings = Array.from(footer.querySelectorAll("h2")).map((h) =>
        h.textContent.trim(),
      );
      const grid = footer.querySelector(".grid");
      return {
        headingCount: footer.querySelectorAll("h1").length,
        headings,
        links,
        hasTagline: footer.textContent.includes(
          "Your World. Intelligently Explored.",
        ),
        copyright:
          footer.textContent.match(/©\s*\d{4}\s*AtlasAI[^.]*\./)?.[0] ?? null,
        linkStacked: grid
          ? getComputedStyle(grid).gridTemplateColumns.split(" ").length
          : null,
        footerWidth: Math.round(footer.getBoundingClientRect().width),
        overflowX: document.documentElement.scrollWidth > window.innerWidth,
      };
    });
    await page.screenshot({
      path: `d:/atlas-ai/apps/web/qa-footer-${label}.png`,
    });
  }

  return out;
}
