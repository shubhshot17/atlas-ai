// Measures section gap rhythm and per-section content width by directly
// probing wrapper geometry (no class/text guessing).
const SIZES = [
  { name: "m360", width: 360, height: 800 },
  { name: "t768", width: 768, height: 1024 },
  { name: "d1280", width: 1280, height: 900 },
];

export default async function run(page) {
  const out = {};
  for (const s of SIZES) {
    await page.setViewportSize({ width: s.width, height: s.height });
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.waitForSelector("#hero-heading");

    out[s.name] = await page.evaluate(() => {
      const r = (el) => {
        const b = el.getBoundingClientRect();
        return {
          top: Math.round(b.top + scrollY),
          bottom: Math.round(b.bottom + scrollY),
          left: Math.round(b.left),
          width: Math.round(b.width),
        };
      };

      const blocks = [...document.querySelectorAll("main > *")].map((el) => {
        const h = el.querySelector("h1, h2");
        const cs = getComputedStyle(el);
        return {
          id: el.id || el.tagName.toLowerCase(),
          heading: (h?.textContent || "").trim().slice(0, 28),
          ...r(el),
          padTop: cs.paddingTop,
          padBottom: cs.paddingBottom,
          maxWidth: cs.maxWidth,
        };
      });

      // Gaps between consecutive top-level blocks.
      const gaps = [];
      for (let i = 1; i < blocks.length; i++)
        gaps.push(blocks[i].top - blocks[i - 1].bottom);

      // Section heading rows: measure the row element itself, per section.
      const rows = [...document.querySelectorAll("main section")].map((sec) => {
        const head = sec.querySelector("p + h2, h2");
        const row = head?.parentElement;
        const rowBox = row ? row.getBoundingClientRect() : null;
        const kids = row
          ? [...row.children].map((c) => {
              const b = c.getBoundingClientRect();
              return {
                tag: c.tagName.toLowerCase(),
                left: Math.round(b.left),
                top: Math.round(b.top),
                h: Math.round(b.height),
                w: Math.round(b.width),
                lines: null,
              };
            })
          : [];
        // count lines for text kids
        if (row)
          [...row.children].forEach((c, i) => {
            const lh = parseFloat(getComputedStyle(c).lineHeight) || 20;
            kids[i].lines = Math.max(
              1,
              Math.round(c.getBoundingClientRect().height / lh),
            );
          });
        return {
          rowDisplay: row ? getComputedStyle(row).display : null,
          rowAlign: row ? getComputedStyle(row).alignItems : null,
          rowWidth: rowBox ? Math.round(rowBox.width) : null,
          kids,
        };
      });

      return {
        vw: document.documentElement.clientWidth,
        scrollW: document.documentElement.scrollWidth,
        blocks,
        gaps,
        rows,
      };
    });
  }
  return out;
}
