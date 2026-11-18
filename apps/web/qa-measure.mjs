// Measures the homepage at three breakpoints: horizontal overflow, header
// height, per-section alignment, and any element wider than the viewport.
const SIZES = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 900 },
];

export default async function run(page) {
  const out = {};

  for (const size of SIZES) {
    await page.setViewportSize({ width: size.width, height: size.height });
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.waitForSelector("#hero-heading");

    out[size.name] = await page.evaluate(() => {
      const doc = document.documentElement;
      const vw = doc.clientWidth;

      const overflowing = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;
        if (r.right > vw + 1 || r.left < -1) {
          overflowing.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className || "").toString().slice(0, 70),
            left: Math.round(r.left),
            right: Math.round(r.right),
            text: (el.textContent || "").trim().slice(0, 40),
          });
        }
      }

      const header = document.querySelector("header");
      const main = document.querySelector("main");

      // Left edge of each section's content box, to catch ragged gutters.
      const edges = [...main.querySelectorAll(":scope > *")].map((s) => {
        const first = s.querySelector("h1, h2, h3, ul, p");
        return {
          tag: s.tagName.toLowerCase(),
          heading: (s.querySelector("h1, h2")?.textContent || "")
            .trim()
            .slice(0, 34),
          left: first ? Math.round(first.getBoundingClientRect().left) : null,
        };
      });

      const headings = [...document.querySelectorAll("h1, h2, h3")].map(
        (h) => ({
          tag: h.tagName.toLowerCase(),
          size: getComputedStyle(h).fontSize,
          text: h.textContent.trim().slice(0, 30),
        }),
      );

      const grid = document.querySelector("main ul.grid");
      return {
        viewport: vw,
        scrollWidth: doc.scrollWidth,
        horizontalOverflow: doc.scrollWidth > vw + 1,
        headerHeight: header
          ? Math.round(header.getBoundingClientRect().width)
          : null,
        headerHeightPx: header
          ? Math.round(header.getBoundingClientRect().height)
          : null,
        sectionEdges: edges,
        headings,
        overflowing: overflowing.slice(0, 8),
        overflowCount: overflowing.length,
      };
    });
  }

  return out;
}
