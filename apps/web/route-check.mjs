export default async function run(page, ui) {
  const routes = [
    ["/", "Home"],
    ["/explore", "Explore"],
    ["/destinations/dst_456", "Destination details"],
    ["/plan", "Plan trip"],
    ["/login", "Login"],
    ["/register", "Register"],
    ["/dashboard", "Dashboard"],
    ["/this/does/not/exist", "Not found"],
  ];

  const results = [];

  for (const [path, label] of routes) {
    const consoleErrors = [];
    const failed = [];
    const onConsole = (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    };
    const onFailed = (req) => {
      if (req.failure())
        failed.push(
          `${req.method()} ${req.url()} -> ${req.failure().errorText}`,
        );
    };
    page.on("console", onConsole);
    page.on("requestfailed", onFailed);

    await page.goto(`http://localhost:4173${path}`, {
      waitUntil: "networkidle",
    });
    await page.waitForSelector("h1", { timeout: 5000 }).catch(() => {});

    const info = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const active = document.querySelector(
        'nav[aria-label="Primary"] a[aria-current="page"]',
      );
      const links = Array.from(
        document.querySelectorAll('nav[aria-label="Primary"] a'),
      ).map((a) => a.textContent);
      return {
        h1: h1 ? h1.textContent.trim() : null,
        h1Count: document.querySelectorAll("h1").length,
        activeNav: active ? active.textContent.trim() : null,
        navLinks: links,
        hasHeader: !!document.querySelector("header"),
        hasFooter: !!document.querySelector("footer"),
        mainTextLen: (document.querySelector("main")?.innerText || "").length,
        title: document.title,
      };
    });

    page.off("console", onConsole);
    page.off("requestfailed", onFailed);

    results.push({ route: path, label, ...info, consoleErrors, failed });
  }

  return results;
}
