// Dumps inline-run geometry for the places most likely to wrap or clip:
// the sticky header row, hero CTAs, section heading rows, and every card title.
const SIZES = [
  { name: "m360", width: 360, height: 800 },
  { name: "m390", width: 390, height: 844 },
  { name: "sm640", width: 640, height: 900 },
  { name: "t768", width: 768, height: 1024 },
  { name: "t820", width: 820, height: 1180 },
  { name: "lg1024", width: 1024, height: 900 },
  { name: "d1280", width: 1280, height: 900 },
];

const PROBE = () => {
  const round = (n) => Math.round(n * 10) / 10;
  const box = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      l: round(r.left),
      r: round(r.right),
      t: round(r.top),
      b: round(r.bottom),
      w: round(r.width),
      h: round(r.height),
    };
  };
  // A block whose inline content occupies more than one visual line.
  const lineCount = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const lh =
      parseFloat(getComputedStyle(el).lineHeight) ||
      parseFloat(getComputedStyle(el).fontSize) * 1.4;
    return Math.max(1, Math.round(r.height / lh));
  };

  const header = document.querySelector("header");
  const headerRow = header?.firstElementChild;
  const hdrKids = headerRow
    ? [...headerRow.children].map((c) => ({
        tag: c.tagName.toLowerCase(),
        ...box(c),
      }))
    : [];

  const hero = document.querySelector("#hero-heading")?.closest("section");
  const ctas = hero
    ? [...hero.querySelectorAll("a, button")].map((a) => ({
        txt: a.textContent.trim().slice(0, 22),
        ...box(a),
      }))
    : [];

  const headingRows = [...document.querySelectorAll("main h2")].map((h) => {
    const row = h.parentElement;
    return {
      heading: h.textContent.trim().slice(0, 26),
      rowWrapLines: row ? lineCount(row) : null,
      rowHeight: row ? round(row.getBoundingClientRect().height) : null,
      headingLines: lineCount(h),
      eyebrowLeft: box(row?.parentElement?.querySelector("p")).l,
    };
  });

  const cardTitles = [...document.querySelectorAll("main h3")].map((h) => ({
    txt: h.textContent.trim().slice(0, 24),
    lines: lineCount(h),
    ...box(h),
  }));

  return {
    vw: document.documentElement.clientWidth,
    scrollW: document.documentElement.scrollWidth,
    headerH: header ? round(header.getBoundingClientRect().height) : null,
    headerRowWrapLines: headerRow ? lineCount(headerRow) : null,
    hdrKids,
    ctas,
    headingRows,
    cardTitleLines: cardTitles.map((c) => c.lines),
    cardTitles: cardTitles.filter((c) => c.lines > 1).map((c) => c.txt),
  };
};

export default async function run(page) {
  const out = {};
  for (const s of SIZES) {
    await page.setViewportSize({ width: s.width, height: s.height });
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
    await page.waitForSelector("#hero-heading");
    out[s.name] = await page.evaluate(PROBE);
  }
  return out;
}
