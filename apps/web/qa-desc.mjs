// Is the H1 clipping visible? Compares how far glyph ink extends past the
// element box on the rendering benchmark, then reports plain scroll metrics.
const SIZES = [320, 390, 768, 1280, 1440];

export default async function run(page) {
  const out = {};
  for (const w of SIZES) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.waitForSelector("#hero-heading");

    out[w] = await page.evaluate(() => {
      const h1 = document.querySelector("#hero-heading");
      const r = h1.getBoundingClientRect();
      // Paint every text line box with a translucent band: if text glyphs
      // landed outside the element's box, the band edge tells us where.
      const cs = getComputedStyle(h1);
      const range = document.createRange();
      range.selectNodeContents(h1);
      const rects = [...range.getClientRects()].map((b) => ({
        top: Math.round(b.top - r.top),
        bottom: Math.round(b.bottom - r.top),
        h: Math.round(b.height),
      }));
      // Overflow: which ancestor would clip? Header/main/footer all visible.
      const clippingAncestor = (() => {
        let el = h1.parentElement;
        while (el) {
          const s = getComputedStyle(el);
          if (s.overflow !== "visible" && s.overflowY !== "visible")
            return el.tagName + "." + el.className.slice(0, 30);
          el = el.parentElement;
        }
        return null;
      })();
      return {
        boxH: Math.round(r.height),
        scrollH: h1.scrollHeight,
        lineHeight: cs.lineHeight,
        fontSize: cs.fontSize,
        paddingTop: cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        lineRects: rects,
        lastLineBottomVsBox: rects.length
          ? rects[rects.length - 1].bottom - Math.round(r.height)
          : null,
        clippingAncestor,
      };
    });
  }
  return out;
}
