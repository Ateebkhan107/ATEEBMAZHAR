const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const output = process.env.PERF_REPORT_DIR || path.join(require("node:os").tmpdir(), "portfolio-compact-mobile");
const url = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE_PATH && { executablePath: process.env.BROWSER_EXECUTABLE_PATH }) });
  const results = [];
  try {
    for (const width of [320, 375, 390, 430]) {
      const errors = [];
      const page = await browser.newPage({ viewport: { width, height: width === 320 ? 568 : 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(url);
      await page.locator("#contact form").waitFor({ state: "attached" });
      await page.waitForTimeout(500);
      const baseline = await page.evaluate(() => ({ height: document.body.scrollHeight, overflow: document.documentElement.scrollWidth > innerWidth, sections: [...document.querySelectorAll("main > section")].map((el) => ({ id: el.id, height: Math.round(el.getBoundingClientRect().height) })) }));
      assert(!baseline.overflow);
      assert(baseline.height < 6000, `Page is still too long at ${width}: ${baseline.height}`);
      assert.equal(await page.locator("canvas").count(), 0);
      await page.screenshot({ path: path.join(output, `${width}-page.png`), fullPage: true });
      for (const name of ["Prepzii", "CaseFlow", "SkaleKraft", "Flamzi"]) {
        await page.getByRole("button", { name: `Show ${name}`, exact: true }).click();
        await page.waitForTimeout(120);
        assert.equal(await page.getByRole("button", { name: `Show ${name}`, exact: true }).getAttribute("aria-pressed"), "true");
        const card = page.locator(".mobile-project-card").filter({ has: page.getByRole("heading", { name, exact: true }) });
        const contained = await card.evaluate((el) => { const r = el.getBoundingClientRect(); const t = el.parentElement.getBoundingClientRect(); return r.left >= t.left - 2 && r.right <= t.right + 2; });
        assert(contained, `${name} not fully in track at ${width}`);
        await card.getByRole("button", { name: "View Case Study" }).click();
        await page.getByRole("dialog").waitFor();
        await page.keyboard.press("Escape");
      }
      await page.locator(".project-track").focus();
      await page.keyboard.press("Home");
      await page.waitForTimeout(100);
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(100);
      assert.equal(await page.getByRole("button", { name: "Show CaseFlow", exact: true }).getAttribute("aria-pressed"), "true");
      await page.getByRole("button", { name: "Show Prepzii", exact: true }).click();
      await page.evaluate(() => { const track = document.querySelector('.project-track'); scrollTo({ top: track.getBoundingClientRect().top + scrollY - 100, behavior: 'instant' }); });
      const cdp = await page.context().newCDPSession(page);
      const gesture = async (x1, y1, x2, y2) => {
        await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: x1, y: y1 }] });
        for (let step = 1; step <= 10; step++) {
          await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x1 + (x2 - x1) * step / 10, y: y1 + (y2 - y1) * step / 10 }] });
          await page.waitForTimeout(25);
        }
        await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
        await page.waitForTimeout(600);
      };
      await gesture(width - 35, 240, 35, 240);
      assert.equal(await page.getByRole("button", { name: "Show CaseFlow", exact: true }).getAttribute("aria-pressed"), "true", "Native horizontal touch swipe");
      const beforeVertical = await page.evaluate(() => ({ y: scrollY, x: document.querySelector('.project-track').scrollLeft }));
      await gesture(width / 2, 390, width / 2, 180);
      const afterVertical = await page.evaluate(() => ({ y: scrollY, x: document.querySelector('.project-track').scrollLeft }));
      assert(afterVertical.y > beforeVertical.y + 40, "Vertical touch scrolling over carousel must move the page");
      assert(Math.abs(afterVertical.x - beforeVertical.x) < 2, "Vertical gesture must not change project");
      await page.getByRole("button", { name: "Show Prepzii", exact: true }).click();
      await page.locator("#project-prepzii").getByRole("button", { name: "Try demo" }).click();
      await page.getByRole("dialog", { name: "Prepzii interactive preview" }).waitFor();
      await page.getByRole("button", { name: "Zi AI Assistant", exact: true }).click();
      await page.getByRole("button", { name: "Close interactive preview" }).click();
      assert.equal(await page.getByRole("dialog").count(), 0);
      // These are the only page overflow regions: the horizontal track and fixed navigation menu.
      const nested = await page.evaluate(() => [...document.querySelectorAll("main *")].filter((el) => /auto|scroll/.test(getComputedStyle(el).overflowY) && el.scrollHeight > el.clientHeight + 2).map((el) => el.className));
      assert.deepEqual(nested, [], `Nested vertical scroll areas: ${nested}`);
      for (const section of ["about", "experience"]) {
        const disclosures = page.locator(`#${section} .mobile-disclosure`);
        for (const disclosure of await disclosures.all()) {
          await disclosure.locator(":scope > summary").click();
          assert(await disclosure.evaluate((el) => el.open));
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
          await disclosure.locator(":scope > summary").click();
        }
      }
      await page.getByRole("combobox", { name: "Technology category" }).selectOption("Frontend");
      await page.getByRole("button", { name: /^React / }).click();
      assert(await page.locator("#mobile-tech-detail").evaluate((el) => el.open));
      await page.locator("#mobile-tech-detail > summary").click();
      await page.locator('#contact button[type="submit"]').click();
      assert.equal(await page.locator('#contact [role="alert"]').count(), 3);
      assert.equal(await page.locator("#user_email").evaluate((el) => getComputedStyle(el).fontSize), "16px");
      assert.deepEqual(errors, []);
      results.push({ width, ...baseline, carousel: "All four projects, keyboard, native touch swipes, vertical touch scrolling, case studies and preview pass", disclosures: "All expand without overflow", nestedVerticalScrollers: nested, errors });
      console.log(width, baseline);
      await page.close();
    }
    fs.writeFileSync(path.join(output, "mobile-layout-results.json"), JSON.stringify(results, null, 2));
    console.log("PASS: compact mobile layouts");
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
