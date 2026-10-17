/* Run against npm run preview. Install Playwright separately for local QA. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const baseURL = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
const output = process.env.PERF_REPORT_DIR || path.join(os.tmpdir(), "portfolio-verification");
const widths = [320, 360, 375, 390, 430, 768, 1024, 1440];
const sections = ["hero", "about", "projects", "experience", "tech", "contact"];
const results = { viewports: [], errors: [], interactions: [], adaptive: [] };

async function main() {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.BROWSER_EXECUTABLE_PATH && { executablePath: process.env.BROWSER_EXECUTABLE_PATH }),
  });
  try {
    for (const width of widths) {
      console.log(`Checking ${width}px`);
      const mobile = width < 768;
      const context = await browser.newContext({
        viewport: { width, height: 900 }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      page.on("pageerror", (error) => results.errors.push({ width, message: error.message }));
      await page.goto(baseURL);
      await page.locator("#contact form").waitFor({ state: "attached" });
      await page.waitForTimeout(1500);
      const initial = await page.evaluate(() => ({
        canvases: document.querySelectorAll("canvas").length,
        js: performance.getEntriesByType("resource")
          .filter((entry) => /\.js(?:$|\?)/.test(entry.name))
          .map((entry) => ({ name: entry.name.split("/").pop(), bytes: entry.decodedBodySize })),
        height: document.body.scrollHeight,
        overflow: document.documentElement.scrollWidth > innerWidth,
      }));
      assert(!initial.overflow, `Horizontal overflow at ${width}px`);
      if (mobile) {
        assert.equal(initial.canvases, 0);
        assert(!initial.js.some((entry) => /three-|HeroCore|Stars|Earth|Mockup|CustomCursor/.test(entry.name)));
      }
      for (const id of sections) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        await page.waitForTimeout(mobile ? 100 : 1300);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        if (width === 390 || width === 1440) {
          await page.locator(`#${id}`).screenshot({ path: path.join(output, `${width}-${id}.png`) });
        }
      }
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((el) => el.decode());
        assert(await image.evaluate((el) => el.naturalWidth > 0));
      }
      if (mobile) {
        assert.equal(await page.locator("#user_name").evaluate((el) => getComputedStyle(el).fontSize), "16px");
        assert.equal(await page.locator("canvas").count(), 0);
      }
      if (width < 1280) {
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        const toggle = page.getByRole("button", { name: "Toggle Navigation" });
        await toggle.click();
        assert.equal(await toggle.getAttribute("aria-expanded"), "true");
        await page.keyboard.press("Escape");
        assert.equal(await toggle.getAttribute("aria-expanded"), "false");
        await toggle.click();
        await page.locator('#mobile-navigation a[href="#projects"]').click();
        assert.equal(await toggle.getAttribute("aria-expanded"), "false");
      }
      results.viewports.push({ width, ...initial });
      await context.close();
    }

    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    page.on("pageerror", (error) => results.errors.push({ interaction: error.message }));
    // Every provider request is intercepted. This test never sends external email.
    let submissions = 0;
    await page.route("https://api.emailjs.com/**", async (route) => {
      submissions++;
      await new Promise((resolve) => setTimeout(resolve, 250));
      await route.fulfill({ status: 200, body: "OK" });
    });
    await page.goto(baseURL);
    await page.getByRole("button", { name: "Resume", exact: true }).click();
    await page.getByRole("dialog", { name: "Resume", exact: true }).waitFor();
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("dialog").count(), 0);
    await page.locator("#project-prepzii button").filter({ hasText: "View Case Study" }).click();
    await page.getByRole("dialog").waitFor();
    await page.keyboard.press("Escape");
    await page.keyboard.press("Meta+k");
    await page.getByRole("dialog", { name: "Command palette" }).waitFor();
    await page.getByRole("textbox", { name: "Search commands" }).fill("terminal");
    await page.getByRole("button", { name: /Launch Interactive Terminal CLI/ }).click();
    await page.getByRole("dialog", { name: "Interactive terminal" }).waitFor();
    await page.getByRole("textbox", { name: "Terminal command" }).fill("projects");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Escape");
    results.interactions.push("Resume, case study, command search, terminal command, Escape dismissal");

    await page.locator("#project-prepzii").getByRole("button", { name: "Try demo" }).click();
    await page.getByRole("dialog", { name: "Prepzii interactive preview" }).waitFor();
    await page.getByRole("dialog").getByRole("button", { name: "Zi AI Assistant" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Rank Predictor" }).click();
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Show Flamzi", exact: true }).click();
    await page.locator("#project-flamzi").getByRole("button", { name: "Try demo" }).click();
    await page.getByRole("dialog", { name: "Flamzi interactive preview" }).waitFor();
    await page.getByRole("button", { name: "START FOCUS (25m)" }).click();
    await page.waitForTimeout(1200);
    await page.getByRole("button", { name: "PAUSE SESSION" }).click();
    assert((await page.getByRole("dialog").innerText()).includes("24:59"));
    await page.keyboard.press("Escape");
    await page.getByRole("combobox", { name: "Technology category" }).selectOption("Frontend");
    await page.getByRole("button", { name: /^React / }).click();
    await page.getByRole("button", { name: "Education", exact: true }).click();
    assert.equal(await page.locator("#experience h3").count(), 1);
    results.interactions.push("Prepzii tabs, Flamzi timer, technology selection, experience filtering");

    await page.locator('#contact button[type="submit"]').click();
    assert.equal(await page.locator('#contact [role="alert"]').count(), 3);
    await page.locator("#user_name").fill("Portfolio QA");
    await page.locator("#user_email").fill("qa@example.com");
    await page.locator("#message").fill("Mocked production preview verification message.");
    await page.locator('#contact button[type="submit"]').click();
    assert(await page.locator('#contact button[type="submit"]').isDisabled());
    await page.locator('#contact [role="status"]').waitFor();
    assert.equal(submissions, 1);
    assert.equal(await page.locator("#user_name").inputValue(), "");
    results.interactions.push("Contact validation, pending state, one mocked submission, success/reset");
    await context.close();

    // Fresh storage ensures the SDK throttle cannot mask the provider-failure test.
    const failureContext = await browser.newContext();
    const failurePage = await failureContext.newPage();
    let failures = 0;
    await failurePage.route("https://api.emailjs.com/**", (route) => {
      failures++;
      return route.fulfill({ status: 500, body: "Mock failure" });
    });
    await failurePage.goto(baseURL);
    await failurePage.locator("#user_name").fill("QA");
    await failurePage.locator("#user_email").fill("qa@example.com");
    await failurePage.locator("#message").fill("Mocked failure response validation.");
    await failurePage.locator('#contact button[type="submit"]').click();
    await failurePage.locator('#contact [role="alert"]').waitFor();
    assert.equal(failures, 1);
    assert.equal(await failurePage.locator("#message").inputValue(), "Mocked failure response validation.");
    results.interactions.push("Mocked provider 500 shows error and retains message");
    await failureContext.close();

    for (const mode of ["reduced-motion", "low-cpu", "save-data", "tablet-touch"]) {
      const adaptiveContext = await browser.newContext({
        viewport: { width: mode === "tablet-touch" ? 768 : 1440, height: 900 },
        reducedMotion: mode === "reduced-motion" ? "reduce" : "no-preference",
        hasTouch: mode === "tablet-touch",
      });
      await adaptiveContext.addInitScript((mode) => {
        if (mode === "low-cpu") Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 2 });
        if (mode === "save-data" && navigator.connection) Object.defineProperty(navigator.connection, "saveData", { get: () => true });
      }, mode);
      const adaptivePage = await adaptiveContext.newPage();
      await adaptivePage.goto(baseURL);
      await adaptivePage.waitForTimeout(1500);
      await adaptivePage.locator("#contact").scrollIntoViewIfNeeded();
      await adaptivePage.waitForTimeout(500);
      assert.equal(await adaptivePage.locator("canvas").count(), 0, mode);
      const scripts = await adaptivePage.evaluate(() => performance.getEntriesByType("resource").map((r) => r.name));
      assert(!scripts.some((url) => /three-|HeroCore|Stars-|Earth-|CustomCursor/.test(url)), mode);
      results.adaptive.push(mode);
      await adaptiveContext.close();
    }
    assert.equal(results.errors.length, 0, JSON.stringify(results.errors));
    console.log("PASS: all viewport, interaction, image, and adaptive checks");
  } finally {
    fs.writeFileSync(path.join(output, "browser-results.json"), JSON.stringify(results, null, 2));
    await browser.close();
    console.log(`Results: ${output}`);
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
