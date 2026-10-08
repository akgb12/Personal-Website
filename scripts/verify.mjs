import { chromium } from "@playwright/test";
import { readFile, mkdir, readdir } from "node:fs/promises";
import assert from "node:assert/strict";
import { baseURL, launchOptions } from "./qa-browser.mjs";

const source = async (name) => JSON.parse(await readFile(new URL(`../_onboarding/data/${name}.json`, import.meta.url), "utf8"));
const [experience, projects, research, publication, courses] = await Promise.all(["experience", "projects", "research", "publication", "coursework"].map(source));
const browser = await chromium.launch(launchOptions);
const output = new URL("../qa/screenshots/", import.meta.url).pathname;
await mkdir(output, { recursive: true });
const errors = [];
const evidence = [];
const targets = ["hero", "about", "experience", "projects", "project-0", "project-1", "project-2", "project-3", "project-4", "research", "research-study-1", "research-study-2", "publication", "coursework", "contact"];

try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport });
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    const response = await page.goto(baseURL, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
    assert.equal(await page.locator("h1").innerText(), "Aney Kanji");
    assert.equal(await page.locator(".hero-identity p").innerText(), "Software + AI Engineer");
    const heroLayout = await page.evaluate(() => {
      const title = document.querySelector("#hero h1");
      const titleBox = title.getBoundingClientRect();
      const subtitleBox = document.querySelector(".hero-identity p").getBoundingClientRect();
      const heroBox = document.getElementById("hero").getBoundingClientRect();
      return {
        groupCenter: (titleBox.top + subtitleBox.bottom) / 2 - heroBox.top,
        heroHeight: heroBox.height,
        titleTop: titleBox.top,
        headerBottom: document.querySelector(".site-header").getBoundingClientRect().bottom,
        subtitleGap: subtitleBox.top - titleBox.bottom,
        fontSize: Number.parseFloat(getComputedStyle(title).fontSize),
      };
    });
    const previousFontSize = viewport.width <= 600 ? viewport.width * .26 : viewport.width <= 800 ? viewport.width * .17 : Math.min(280, Math.max(86, viewport.width * .168));
    assert(heroLayout.fontSize < previousFontSize && heroLayout.fontSize >= previousFontSize * .85, "Name is only slightly smaller");
    assert(Math.abs(heroLayout.groupCenter / heroLayout.heroHeight - .5) < .01, "Name and subtitle are centered together");
    assert(heroLayout.titleTop > heroLayout.headerBottom + 20, "Name clears the navigation comfortably");
    assert(heroLayout.subtitleGap >= 24 && heroLayout.subtitleGap <= 29, "Subtitle stays grouped with the name");
    assert.equal(await page.locator(".hero-kicker, #hero .tiny-star").count(), 0);
    assert.equal((await page.locator("#hero").innerText()).replace(/\s+/g, " "), "Aney Kanji Software + AI Engineer");
    assert.equal(await page.locator(".hero-scroll").innerText(), "");
    assert.equal(await page.locator(".hero-scroll .circle-arrow").count(), 1);
    assert.equal(await page.locator(".wordmark, .nav-resume, .hero-topline, .name-period, .hero-bottom > p").count(), 0);
    assert(!/A personal portfolio|College Station, Texas|Computer Science|Statistics|Texas A&M|Software Engineering|Machine Learning|Scroll to explore/.test(await page.locator("#hero").innerText()), "Removed hero copy must stay absent");
    assert.equal(await page.locator('a[href*="/resume"], a[href$=".pdf"]').count(), 0, "No public résumé links");
    assert.equal((await page.locator("#about h2").innerText()).replace(/\s+/g, " "), "A Little About Me.");
    assert.equal(await page.locator("#contact h2").innerText(), "Let’s Connect.");
    assert.equal(await page.locator(".footer-name-text").innerText(), "Aney Kanji");
    assert.equal(await page.locator(".footer-meta").innerText(), "Back to top");
    assert.equal(await page.locator(".footer-meta > span").count(), 0);
    assert.equal(await page.locator(".footer-meta a").getAttribute("href"), "#hero");
    assert(!/©|Computer Science \+ Statistics|Texas A&M|✳/.test(await page.locator("#contact").innerText()), "Removed footer labels and star stay absent");
    assert.equal(await page.locator(".footer-molang").getAttribute("aria-label"), "Wave with Molang");
    assert.equal(await page.locator(".molang-character").getAttribute("viewBox"), "0 0 180 220");
    assert.equal(await page.locator(".experience-entry").count(), 9);
    assert.equal(await page.locator(".project-scene").count(), 5);
    assert.equal(await page.locator(".projects-heading h2").innerText(), "What I’ve Built.");
    assert.equal(await page.locator(".projects-heading > span, .project-discipline").count(), 0, "No project-header side copy or bottom captions");
    const categories = ["Code Modernization / Google-Sponsored", "Cloud-Native / Full Stack", "Cloud Infrastructure / Data Visualization", "Security / Agentic Systems", "Product Engineering / AI Ordering"];
    assert.deepEqual(await page.locator(".project-scene-top > span:nth-child(2)").allTextContents(), categories, "All project categories use title case");
    assert.equal(await page.locator('.bowl-illustration path[d="M81 260Q244 303 402 260"]').count(), 0, "The decorative line across the bowl is removed");
    assert.equal(await page.locator('.bowl-illustration path[d="M62 200Q70 373 242 380Q414 373 422 200Z"]').count(), 1, "Bowl shape is unchanged");
    assert.equal(await page.locator('.bowl-illustration path[stroke-width="5"]').count(), 16, "Noodles are unchanged");
    assert.equal(await page.locator('.bowl-illustration path[stroke="#422d1a"]').count(), 1, "Chopsticks are unchanged");
    assert.equal(await page.locator('.bowl-illustration path[stroke="#f6efe1"]').count(), 1, "Steam is unchanged");
    assert.equal(await page.locator(".research-study").count(), 3);
    assert.equal(await page.locator(".experience-entry li").count(), 0);
    assert.equal(await page.locator(".experience-heading h2").innerText(), "Where I’ve Worked.");
    assert.equal(await page.locator(".experience-heading > p, .experience-summary").count(), 0, "No experience side copy or job descriptions");
    assert.equal(await page.locator("#experience .mineral-symbol").count(), 0, "The supplied logo replaces the typographic m1neral mark");
    assert((await page.locator('#experience-0 img[alt="m1neral logo"]').getAttribute("src")).includes("m1neral.png"));
    const experienceText = await page.locator("#experience").innerText();
    assert(!/Along the way|Industry, research|and the classroom/.test(experienceText));
    for (const [index, item] of experience.entries()) {
      const text = await page.locator(`#experience-${index}`).innerText();
      for (const value of [item.role, item.organization, item.start, item.end, item.location]) assert(text.includes(value), `Missing experience ${value}`);
      if (item.summary) assert(!experienceText.includes(item.summary), "Job descriptions are not displayed");
    }
    for (const [index, item] of projects.entries()) {
      assert.equal((await page.locator(`#project-${index} h3`).innerText()).replace(/\s+/g, " "), `${item.name}.`);
      assert((await page.locator(`#project-${index}`).innerText()).includes(item.description));
      assert.equal(await page.locator(`#project-${index} .tech-icon`).count(), item.tech.length);
      assert.deepEqual(await page.locator(`#project-${index} .tech-icon`).evaluateAll((icons) => icons.map((icon) => icon.getAttribute("aria-label"))), item.tech);
    }
    const projectText = await page.locator("#projects").innerText();
    for (const removed of ["A few things", "I’ve worked on.", "Five selected projects", "Engineering / 01—05", "Translation, validation, and runnable tests.", "A little order for everyday spending.", "A clearer view of cloud costs.", "From security events to structured analysis.", "Software for the rhythm of a restaurant."]) {
      assert(!projectText.includes(removed), `Removed project copy: ${removed}`);
    }
    assert.equal(await page.locator("#project-4 a").count(), 0, "Private project must not have a fabricated repo link");
    assert.equal(await page.locator(".research-heading h2").innerText(), "My Research.");
    assert.equal(await page.locator(".research-heading > p").count(), 0, "No research header side copy");
    const researchText = await page.locator("#research").innerText();
    assert(!/Questions worth|working through|Three studies at/.test(researchText), "Removed research introduction stays absent");
    for (const item of research) assert(researchText.includes(item.description));
    assert((await page.locator("#publication").innerText()).includes(publication.title));
    assert.equal(await page.locator(".paper-meta").innerText(), "");
    assert.equal(await page.locator(".publication-bottom").innerText(), "");
    assert.equal(await page.locator(".publication-bottom").evaluate((element) => getComputedStyle(element).borderTopWidth), "1px", "Publication divider remains unchanged");
    const publicationText = await page.locator("#publication").innerText();
    for (const removed of ["Peer-reviewed /", "Mathematics", "2 / 3 / 5 / 8 / 13 / 21 / 34 / 55", "From a question to a paper."]) assert(!publicationText.includes(removed), `Removed publication label: ${removed}`);
    for (const value of [...publication.authors, publication.journal, publication.volume, publication.pages, publication.published, publication.doi]) assert(publicationText.includes(value), `Publication citation remains intact: ${value}`);
    for (const url of [publication.official_url, publication.arxiv_url, publication.doi_url]) assert.equal(await page.locator(`#publication a[href="${url}"]`).count(), 1);
    assert.equal(await page.locator(".course-heading-row h2").innerText(), "What I’ve Studied.");
    assert.equal(await page.locator(".coursework-heading > p, .course-lane, .course-stream, .course-track").count(), 0, "The coursework paragraph and both streams are removed");
    assert.deepEqual(await page.locator(".discipline-mark span").allTextContents(), ["MATH", "CSCE", "STAT"]);
    assert.equal(await page.locator(".course-disciplines").getAttribute("aria-label"), "Mathematics, Computer Science, and Statistics");
    const visibleText = await page.locator("body").innerText();
    assert(!/\bGPA\b|Smokeless Chimney|Community Data Intern|Mathematics Research Lab Assistant/i.test(visibleText));
    assert(!/résumé|\bresume\b/i.test(visibleText), "No visible résumé references");
    assert(!/\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/.test(visibleText), "No public phone number");
    assert(visibleText.includes("Aug 2023 — May 2027") && visibleText.includes("Aug 2024 — May 2027"));

    for (const target of targets) {
      await page.evaluate((id) => {
        const element = document.getElementById(id);
        window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY - (id === "hero" ? 0 : 88));
      }, target);
      await page.waitForTimeout(400);
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
      assert(dimensions.document <= dimensions.viewport, `Horizontal overflow at ${viewport.width}/${target}: ${JSON.stringify(dimensions)}`);
      const path = `${output}${viewport.width}-${target}.png`;
      await page.screenshot({ path });
      evidence.push(path);
    }
    assert.equal(await page.locator('nav a[aria-current="location"]').innerText(), "Contact");
    const broken = await page.locator("img").evaluateAll((images) => images.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src));
    assert.deepEqual(broken, []);
    await page.locator(".footer-molang").focus();
    assert(await page.locator(".footer-molang").isEnabled());
    await page.locator(".footer-molang").click();
    await page.waitForFunction(() => document.querySelector(".molang-wave-arm").getAnimations().length === 1);
    const waveStart = await page.locator(".molang-wave-arm").evaluate((el) => getComputedStyle(el).transform);
    await page.waitForTimeout(200);
    assert.notEqual(await page.locator(".molang-wave-arm").evaluate((el) => getComputedStyle(el).transform), waveStart, "Molang's arm waves on interaction");
    for (const phase of [0, .2, .4, .6, .8, .99]) {
      const character = await page.locator(".molang-character").evaluate((svg, phase) => {
        const arm = svg.querySelector(".molang-wave-arm"), animation = arm.getAnimations()[0];
        const duration = Number(animation.effect.getTiming().duration);
        animation.pause();
        animation.currentTime = duration * phase;
        const bounds = svg.getBoundingClientRect(), hand = arm.getBoundingClientRect();
        const name = document.querySelector(".footer-name-text").getBoundingClientRect();
        const button = svg.closest("button").getBoundingClientRect();
        const artwork = svg.getBBox();
        const row = document.querySelector(".footer-meta").getBoundingClientRect();
        const link = document.querySelector(".footer-meta a").getBoundingClientRect();
        return {
          handVisible: hand.left >= bounds.left && hand.right <= bounds.right && hand.top >= bounds.top && hand.bottom <= bounds.bottom,
          artworkVisible: artwork.x > 3 && artwork.y > 3 && artwork.x + artwork.width < 177 && artwork.y + artwork.height < 217,
          noOverlap: button.left >= name.right + 7,
          backLinkRight: Math.abs(row.right - link.right) < 1,
          duration,
        };
      }, phase);
      assert(character.handVisible && character.artworkVisible && character.noOverlap, `The complete Molang character and wave fit the footer: ${viewport.width}/${phase}`);
      assert(character.backLinkRight, "Back to top retains its right alignment");
      assert(character.duration < 5000, "The wave is a brief greeting, not continuous motion");
    }
    await page.locator(".molang-wave-arm").evaluate((el) => el.getAnimations().forEach((animation) => animation.finish()));
    await page.locator(".footer-molang").evaluate((button) => button.click());
    await page.waitForFunction(() => document.querySelector(".molang-wave-arm").getAnimations().length === 1);
    await page.locator(".footer-meta a").click();
    await page.waitForFunction(() => window.scrollY < 10);
    await page.locator(".course-index summary").click();
    assert.equal(await page.locator(".course-index li").count(), 31);
    assert((await page.locator(".course-index summary").innerText()).includes("(31)"), "The count is derived from the current data");
    assert.equal(await page.locator(".course-index-groups > div").first().locator("li").count(), 8);
    assert.equal((await page.locator(".course-index-groups > div").first().locator("li").filter({ hasText: "CSCE 633" }).innerText()).replace(/\s+/g, " "), "CSCE 633 Machine Learning");
    for (const course of [...courses.graduate, ...courses.undergraduate]) assert((await page.locator(".course-index").innerText()).includes(course.title));
    await page.locator(".course-index summary").click();
    await page.locator(".course-disciplines").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector("#coursework").dataset.moving === "true");
    const transform = () => page.locator(".discipline-orbit").evaluate((el) => getComputedStyle(el).transform);
    const moving = await transform();
    await page.waitForTimeout(350);
    assert.notEqual(await transform(), moving, "The three subjects orbit when visible");
    await page.locator(".course-motion-control").click();
    assert.equal(await page.locator(".course-motion-control").getAttribute("aria-label"), "Resume subject orbit");
    assert.equal(await page.locator(".course-motion-control").getAttribute("aria-pressed"), "true");
    await page.waitForFunction(() => document.querySelector("#coursework").dataset.moving === "false");
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const frozen = await transform();
    await page.waitForTimeout(250);
    assert.equal(await transform(), frozen, "Pause freezes the current orbit position");
    for (const phase of [0, .25, .5, .75, .99]) {
      const geometry = await page.locator(".course-disciplines").evaluate((field, phase) => {
        const orbit = field.querySelector(".discipline-orbit");
        for (const animation of orbit.getAnimations({ subtree: true })) animation.currentTime = Number(animation.effect.getTiming().duration) * phase;
        const bounds = field.getBoundingClientRect(), ring = orbit.getBoundingClientRect();
        const center = { x: ring.x + ring.width / 2, y: ring.y + ring.height / 2 };
        const parent = new DOMMatrix(getComputedStyle(orbit).transform);
        return [...field.querySelectorAll(".discipline-mark")].map((mark) => {
          const box = mark.getBoundingClientRect();
          const combined = parent.multiply(new DOMMatrix(getComputedStyle(mark).transform));
          return {
            inBounds: box.left >= bounds.left - 1 && box.right <= bounds.right + 1 && box.top >= bounds.top - 1 && box.bottom <= bounds.bottom + 1,
            radius: Math.hypot(box.x + box.width / 2 - center.x, box.y + box.height / 2 - center.y),
            upright: Math.abs(combined.b) < .001 && Math.abs(combined.a - 1) < .001,
          };
        });
      }, phase);
      assert(geometry.every((mark) => mark.inBounds && mark.upright), `All marks remain upright and unclipped throughout the orbit: ${viewport.width}/${phase}`);
      assert(Math.max(...geometry.map((mark) => mark.radius)) - Math.min(...geometry.map((mark) => mark.radius)) < 2, "All three marks share one circular path");
    }
    await page.locator(".course-motion-control").click();
    await page.locator(".course-disciplines").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector("#coursework").dataset.moving === "true");
    assert.equal(await page.locator(".course-motion-control").getAttribute("aria-pressed"), "false");
    await page.locator("#hero").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector("#coursework").dataset.moving === "false");
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const offscreen = await transform();
    await page.waitForTimeout(200);
    assert.equal(await transform(), offscreen, "Orbit work stops offscreen");
    if (viewport.width === 390) {
      await page.locator(".menu-toggle").click();
      assert.equal(await page.locator(".menu-toggle").getAttribute("aria-expanded"), "true");
      assert(await page.locator("nav .nav-links a").first().evaluate((link) => link === document.activeElement), "Menu opening focuses its first link");
      await page.keyboard.press("Escape");
      assert.equal(await page.locator(".menu-toggle").getAttribute("aria-expanded"), "false");
      await page.locator(".menu-toggle").click();
    }
    await page.locator('nav a[href="#research"]').click();
    await page.waitForTimeout(300);
    assert.equal(await page.locator('nav a[aria-current="location"]').innerText(), "Research");
    if (viewport.width >= 768) {
      await page.locator('.experience-rail a[href="#experience-2"]').click();
      await page.waitForTimeout(350);
      assert.equal(await page.locator(".experience-entry.is-active").getAttribute("id"), "experience-2");
      assert((await page.locator(".experience-stage-caption").innerText()).includes("Walt Disney"));
    }
    console.log(`PASS ${viewport.width}×${viewport.height}: content, overflow, images, navigation, controls`);
    await page.close();
  }
  const reduced = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await reduced.goto(baseURL, { waitUntil: "networkidle" });
  await reduced.locator("#coursework").scrollIntoViewIfNeeded();
  assert.equal(await reduced.locator(".experience-stage").evaluate((el) => getComputedStyle(el).position), "relative");
  assert.equal(await reduced.locator(".discipline-orbit").evaluate((el) => getComputedStyle(el).transform), "none");
  assert.equal(await reduced.locator(".discipline-mark").first().evaluate((el) => getComputedStyle(el).transform), "none");
  assert.equal(await reduced.locator(".course-motion-control").isVisible(), false);
  assert.equal(await reduced.locator(".hero-art").evaluate((el) => getComputedStyle(el).transform), "none");
  await reduced.screenshot({ path: `${output}reduced-motion.png` });
  await reduced.locator(".footer-molang").scrollIntoViewIfNeeded();
  await reduced.locator(".footer-molang").click();
  assert.equal(await reduced.locator(".molang-wave-arm").evaluate((el) => el.getAnimations().length), 0, "Molang remains still with reduced motion");
  console.log("PASS reduced motion: static hero, unpinned experience, static subject orbit");
  await reduced.close();
  const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await noJS.goto(baseURL);
  assert.equal(await noJS.locator(".experience-entry").count(), 9);
  assert.equal(await noJS.locator(".project-scene").count(), 5);
  await noJS.locator(".course-index summary").click();
  assert(await noJS.locator(".course-index li").first().isVisible());
  assert.equal(await noJS.locator(".course-index li").count(), 31);
  assert.equal(await noJS.locator(".discipline-orbit").evaluate((el) => getComputedStyle(el).animationPlayState), "paused");
  assert.equal(await noJS.locator(".course-motion-control").isVisible(), false);
  assert.equal(await noJS.locator(".footer-molang").isDisabled(), true, "Molang is a static illustration without JavaScript");
  await noJS.close();
  assert.deepEqual(errors, [], "Browser errors");
  for (const url of ["/resume/Aney_Kanji_Resume.pdf", "/private/resume/Aney_Kanji_Resume.pdf", "/_onboarding/assets/Aney_Kanji_Resume.pdf"]) {
    const response = await fetch(`${baseURL}${url}`);
    assert.equal(response.status, 404, `Résumé must not be served from ${url}`);
  }
  const publicAssets = await readdir(new URL("../public/", import.meta.url), { recursive: true });
  assert(!publicAssets.some((name) => /\.pdf$/i.test(name)), "No PDF may remain in public assets");
  console.log(`PASS no-JavaScript content and résumé privacy (no links or public PDF; former URL returns 404). ${evidence.length + 1} screenshots saved to ${output}`);
} finally { await browser.close(); }
