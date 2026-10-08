import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { baseURL, launchOptions } from "./qa-browser.mjs";

const browser = await chromium.launch(launchOptions);
try {
  for (const { width, motion } of [{ width: 1440, motion: "reduce" }, { width: 390, motion: "reduce" }, { width: 1440, motion: "no-preference" }, { width: 390, motion: "no-preference" }]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: motion });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: "networkidle" });
    await page.locator(".course-index summary").click();
    await page.evaluate(() => window.scrollTo(0, 0));
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    console.log(JSON.stringify({ width, motion, violations: violations.map((v) => ({ id: v.id, nodes: v.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })) })) }, null, 2));
    assert.equal(violations.length, 0, `Accessibility violations at ${width}px`);
    await context.close();
  }
} finally { await browser.close(); }
