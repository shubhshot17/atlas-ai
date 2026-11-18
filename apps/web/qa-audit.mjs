// Applies layout optimisation checks at multiple widths:
//  - scroll overflow (document + each element's scrollWidth vs clientWidth)
//  - interactive target sizes (>= 24px, flag < 44px on touch widths)
//  - a "tall/fat" heuristic: sections whose height grew unexpectedly
const SIZES = [
  { name: "m320", width: 320, height: 700, touch: true },
  { name: "m360", width: 360, height: 800, touch: true },
  { name: "m390", width: 390, height: 844, touch: true },
  { name: "sm640", width: 640, height: 900, touch: true },
  { name: "t768", width: 768, height: 1024, touch: true },
  { name: "lg1024", width: 1024, height: 900, touch: false },
  { name: "d1440", width: 1440, height: 900, touch: false },
];

export default async function run(page) {
  const out = {};
  for (const s of SIZES) {
    await page.setViewportSize({ width: s.width, height: s.height });
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.waitForSelector("#hero-heading");
    await page.waitForTimeout(300);

    out[s.name] = await page.evaluate((touch) => {
      const vw = document.documentElement.clientWidth;

      const hOverflow = [...document.querySelectorAll("body *")]
        .filter(
          (el) =>
            el.scrollWidth > el.clientWidth + 1 &&
            getComputedStyle(el).overflowX === "visible",
        )
        .slice(0, 6)
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          sw: el.scrollWidth,
          cw: el.clientWidth,
          txt: (el.textContent || "").trim().slice(0, 30),
        }));

      const smallTargets = touch
        ? [
            ...document.querySelectorAll(
              "a[href], button, input, select, textarea",
            ),
          ]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return (
                r.width > 0 && r.height > 0 && (r.height < 24 || r.width < 24)
              );
            })
            .slice(0, 8)
            .map((el) => {
              const r = el.getBoundingClientRect();
              return {
                tag: el.tagName.toLowerCase(),
                txt: (el.textContent || el.getAttribute("aria-label") || "")
                  .trim()
                  .slice(0, 22),
                w: Math.round(r.width),
                h: Math.round(r.height),
              };
            })
        : [];

      // Text clipped by its own box (line-clamp or overflow hidden) — informational.
      const clipped = [
        ...document.querySelectorAll(
          "main p, main h1, main h2, main h3, footer p",
        ),
      ]
        .filter(
          (el) =>
            el.scrollHeight > el.clientHeight + 2 ||
            el.scrollWidth > el.clientWidth + 2,
        )
        .slice(0, 8)
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          txt: el.textContent.trim().slice(0, 30),
          sh: el.scrollHeight,
          ch: el.clientHeight,
          sw: el.scrollWidth,
          cw: el.clientWidth,
        }));

      const header = document.querySelector("header");
      const footer = document.querySelector("footer");
      return {
        vw,
        docScrollW: document.documentElement.scrollWidth,
        headerH: header
          ? Math.round(header.getBoundingClientRect().height)
          : null,
        footerH: footer
          ? Math.round(footer.getBoundingClientRect().height)
          : null,
        hOverflow,
        smallTargets,
        clipped,
      };
    }, s.touch);
  }
  return out;
}
