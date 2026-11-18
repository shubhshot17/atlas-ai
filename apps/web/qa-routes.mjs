// Cross-page smoke probe at three widths: overflow, header height, and
// per-route content checks. Used after the homepage pass to make sure the
// shared header/footer/container changes did not regress other routes.
const ROUTES = [
  "/",
  "/explore",
  "/plan",
  "/dashboard",
  "/login",
  "/register",
  "/nope-404",
];
const SIZES = [
  { name: "m390", width: 390, height: 844 },
  { name: "t768", width: 768, height: 1024 },
  { name: "d1280", width: 1280, height: 900 },
];

export default async function run(page) {
  const out = [];
  for (const s of SIZES) {
    await page.setViewportSize({ width: s.width, height: s.height });
    for (const route of ROUTES) {
      const res = await page.goto("http://localhost:4173" + route, {
        waitUntil: "networkidle",
      });
      await page.waitForTimeout(250);
      const m = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const over = [...document.querySelectorAll("body *")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && (r.right > vw + 1 || r.left < -1);
          })
          .slice(0, 4)
          .map((el) => ({
            tag: el.tagName.toLowerCase(),
            right: Math.round(el.getBoundingClientRect().right),
            txt: (el.textContent || "").trim().slice(0, 26),
          }));
        const header = document.querySelector("header");
        return {
          h1: (document.querySelector("h1")?.textContent || "")
            .trim()
            .slice(0, 40),
          scrollW: document.documentElement.scrollWidth,
          vw,
          headerH: header
            ? Math.round(header.getBoundingClientRect().height)
            : null,
          over,
        };
      });
      out.push({ size: s.name, route, status: res?.status(), ...m });
    }
  }
  return out;
}
