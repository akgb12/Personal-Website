import { chromium } from "@playwright/test";
import { readFile, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import assert from "node:assert/strict";
import { baseURL, launchOptions } from "./qa-browser.mjs";

const repo = new URL("../", import.meta.url);
const checkpoint = fileURLToPath(new URL("private/checkpoints/approved-content-2026-10-07-before-landscape-motion.tar.gz", repo));
if (existsSync(checkpoint)) {
const approvedFiles = execFileSync("tar", ["-tzf", checkpoint], { encoding: "utf8" }).trim().split("\n")
  .filter((entry) => !entry.endsWith("/") && /^(src\/|public\/|_onboarding\/data\/)/.test(entry))
  .filter((entry) => !["src/app/globals.css", "src/components/sections/hero.tsx", "src/components/sections/molang-greeting.tsx"].includes(entry));
for (const entry of approvedFiles) {
  const before = execFileSync("tar", ["-xOf", checkpoint, entry], { maxBuffer: 15 * 1024 * 1024 });
  assert.deepEqual(await readFile(new URL(entry, repo)), before, `Approved content/asset is unchanged: ${entry}`);
}
console.log(`PASS approved baseline: ${approvedFiles.length} content, source, and asset files unchanged`);
const molangFile = "src/components/sections/molang-greeting.tsx";
const beforeMolang = execFileSync("tar", ["-xOf", checkpoint, molangFile], { encoding: "utf8" });
const afterMolang = await readFile(new URL(molangFile, repo), "utf8");
assert.equal(afterMolang.match(/<svg[\s\S]*<\/svg>/)[0], beforeMolang.match(/<svg[\s\S]*<\/svg>/)[0], "Molang artwork remains unchanged while its hydrated click control is corrected");
} else console.log("SKIP local checkpoint comparison: the private archive is not present on this machine; canonical-content checks remain in npm run qa");

const browser = await chromium.launch(launchOptions);
const output = fileURLToPath(new URL("qa/screenshots/", repo));
await mkdir(output, { recursive: true });
const errors = [];
const states = ".bird-flight, .bird-wing, .boat-drift, .boat-float, .boat-oar-left, .boat-oar-right";
const sample = (page) => page.locator(states).evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).transform));
const paint = (page) => page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

async function verifyPlacement(page) {
  const placement = await page.evaluate(() => {
    const art = document.querySelector(".hero-art"), plane = document.querySelector(".hero-life-plane");
    const image = art.querySelector("img"), boat = document.querySelector(".rowboat-sprite");
    const artBox = art.getBoundingClientRect(), planeBox = plane.getBoundingClientRect();
    const boatBox = boat.getBoundingClientRect(), heroBox = document.querySelector(".hero").getBoundingClientRect();
    const textBoxes = [...document.querySelectorAll(".hero-identity h1, .hero-identity p")].map((element) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      return range.getBoundingClientRect();
    });
    const factor = Math.max(art.offsetWidth / 1672, art.offsetHeight / 941);
    const width = 1672 * factor, height = 941 * factor;
    const scale = artBox.width / art.offsetWidth;
    const [px, py] = getComputedStyle(image).objectPosition.split(" ").map((part) => Number.parseFloat(part) / 100);
    return {
      correctCover: Math.abs(plane.offsetWidth - width) < 1 && Math.abs(plane.offsetHeight - height) < 1,
      correctCrop: Math.abs(planeBox.left - (artBox.left + (art.offsetWidth - width) * px * scale)) < 1
        && Math.abs(planeBox.top - (artBox.top + (art.offsetHeight - height) * py * scale)) < 1,
      visible: boatBox.left > heroBox.left && boatBox.right < heroBox.right && boatBox.top > heroBox.top && boatBox.bottom < heroBox.bottom,
      clearOfText: textBoxes.every((text) => boatBox.left >= text.right + 12 || boatBox.right <= text.left - 12 || boatBox.top >= text.bottom + 12 || boatBox.bottom <= text.top - 12),
      lakeX: (boatBox.x + boatBox.width / 2 - planeBox.x) / planeBox.width * 1672,
      lakeY: (boatBox.y + boatBox.height / 2 - planeBox.y) / planeBox.height * 941,
      compact: boatBox.width < heroBox.width * .22 && boatBox.width < 140,
    };
  });
  assert(placement.correctCover && placement.correctCrop, `Overlay follows the exact image cover/crop: ${JSON.stringify(placement)}`);
  assert(placement.visible && placement.clearOfText && placement.compact, `Boat remains small, visible, and clear of the name: ${JSON.stringify(placement)}`);
  assert(placement.lakeY > 620 && placement.lakeY < 675, "Boat stays within the lake's safe vertical region");
  assert(placement.lakeX > (page.viewportSize().width <= 1100 ? 945 : 1210) && placement.lakeX < (page.viewportSize().width <= 1100 ? 1070 : 1350), "Boat remains on open water, not the shore");
}

async function timing(page, frames = 90) {
  return page.evaluate(async (frames) => {
    const intervals = [];
    let last;
    for (let i = 0; i <= frames; i++) {
      const now = await new Promise(requestAnimationFrame);
      if (last !== undefined) intervals.push(now - last);
      last = now;
    }
    intervals.sort((a, b) => a - b);
    return {
      medianMs: Number(intervals[Math.floor(intervals.length / 2)].toFixed(2)),
      p95Ms: Number(intervals[Math.floor(intervals.length * .95)].toFixed(2)),
      over34Ms: intervals.filter((interval) => interval > 34).length,
    };
  }, frames);
}

try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto(baseURL, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => document.querySelector(".hero-life").dataset.running === "true");
    assert.equal(await page.locator(".bird-flight").count(), 3);
    assert.equal(await page.locator(".hero-lake-boat, .boat-rower").count(), 2);
    assert.equal(await page.locator(".hero-life").getAttribute("aria-hidden"), "true");
    assert.equal(await page.locator(".hero-life").evaluate((node) => getComputedStyle(node).pointerEvents), "none");
    await verifyPlacement(page);

    const before = await sample(page);
    await page.waitForTimeout(450);
    const moving = await sample(page);
    assert.notDeepEqual(moving.slice(0, 3), before.slice(0, 3), "Birds travel through the sky");
    assert.notEqual(moving.at(-4), before.at(-4), "The rowboat drifts slowly on the water");
    assert.notEqual(moving.at(-3), before.at(-3), "The rowboat gently bobs");
    assert.notEqual(await page.locator(".boat-drift").evaluate((node) => getComputedStyle(node).transform), "none");
    const activeTiming = await timing(page);
    await page.screenshot({ path: `${output}${viewport.width}-hero-life.png` });

    await page.locator(".landscape-motion-control").click();
    await page.waitForFunction(() => document.querySelector(".hero-life").dataset.running === "false");
    await paint(page);
    const frozen = await sample(page);
    await page.waitForTimeout(300);
    assert.deepEqual(await sample(page), frozen, "Pause freezes bird, wing, boat, and oar motion");
    assert.equal(await page.locator(".landscape-motion-control").getAttribute("aria-label"), "Resume landscape animation");
    const pausedTiming = await timing(page);
    await page.locator(".landscape-motion-control").click();
    await page.waitForFunction(() => document.querySelector(".hero-life").dataset.running === "true");
    await page.waitForTimeout(150);
    const resumed = await sample(page);
    assert.notDeepEqual(resumed, frozen, "Resume continues the existing motion");
    const resumedDistance = await page.evaluate(([before, after]) => Math.abs(new DOMMatrix(after).e - new DOMMatrix(before).e), [frozen[0], resumed[0]]);
    assert(resumedDistance < 12, "Resume preserves the current flight position rather than restarting");
    await verifyPlacement(page);

    for (const offset of [90, 180]) {
      await page.evaluate((offset) => window.scrollTo(0, offset), offset);
      await page.waitForTimeout(250);
      await verifyPlacement(page);
    }

    await page.evaluate(() => window.scrollTo(0, document.querySelector("#research").offsetTop));
    await page.waitForFunction(() => document.querySelector(".hero-life").dataset.running === "false");
    await paint(page);
    const offscreen = await sample(page);
    await page.waitForTimeout(250);
    assert.deepEqual(await sample(page), offscreen, "Landscape motion pauses offscreen");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForFunction(() => document.querySelector(".hero-life").dataset.running === "true");
    await page.waitForTimeout(700);
    await verifyPlacement(page);
    await page.screenshot({ path: `${output}${viewport.width}-hero-life-later.png` });
    console.log(`PASS landscape ${viewport.width}×${viewport.height}: alignment, lake placement, movement, pause/resume, scroll-camera alignment, offscreen suspension; frame intervals ${JSON.stringify({ active: activeTiming, paused: pausedTiming })}`);
    await page.close();
  }

  const resize = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await resize.goto(baseURL, { waitUntil: "networkidle" });
  await resize.locator(".landscape-motion-control").click();
  for (const viewport of [{ width: 320, height: 768 }, { width: 844, height: 390 }, { width: 1920, height: 1080 }, { width: 390, height: 844 }]) {
    await resize.setViewportSize(viewport);
    await resize.waitForTimeout(300);
    await verifyPlacement(resize);
  }
  await resize.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await resize.locator(".landscape-motion-control").isVisible(), false);
  await resize.waitForTimeout(100);
  const reducedStill = await sample(resize);
  await resize.waitForTimeout(250);
  assert.deepEqual(await sample(resize), reducedStill, "Live reduced-motion preference stops and reverts the scene");
  await resize.emulateMedia({ reducedMotion: "no-preference" });
  assert.equal(await resize.locator(".hero-life").getAttribute("data-running"), "false", "User's pause preference survives media changes");
  await resize.locator(".landscape-motion-control").click();
  await resize.waitForFunction(() => document.querySelector(".hero-life").dataset.running === "true");
  await resize.close();

  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const reduced = await browser.newPage({ viewport, reducedMotion: "reduce" });
    await reduced.goto(baseURL, { waitUntil: "networkidle" });
    assert.equal(await reduced.locator(".landscape-motion-control").isVisible(), false);
    assert.equal(await reduced.locator(".hero-life").getAttribute("data-running"), "false");
    const still = await sample(reduced);
    await reduced.waitForTimeout(350);
    assert.deepEqual(await sample(reduced), still);
    await verifyPlacement(reduced);
    await reduced.close();
  }

  const noJS = await browser.newPage({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  await noJS.goto(baseURL, { waitUntil: "networkidle" });
  assert.equal(await noJS.locator(".landscape-motion-control").isVisible(), false);
  assert.equal(await noJS.locator(".hero-life").getAttribute("data-running"), "false");
  await verifyPlacement(noJS);
  await noJS.close();
  assert.deepEqual(errors, []);
  console.log("PASS live resize, reduced motion, no-JavaScript static scene, unchanged content and assets");
} finally { await browser.close(); }
