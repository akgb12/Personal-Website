# Rebuild verification

Verified locally on October 7, 2026, on branch `new_version`. The legacy deletions that existed before the rebuild were preserved. The owner subsequently authorized staging, committing, and pushing this branch; no branch switch, merge, or deployment is included.

## Passing checks

- `npm run lint`: zero errors and warnings.
- `npm run typecheck`: zero TypeScript errors.
- `npm run build`: successful Webpack production build; the home page is statically rendered.
- `npm run qa`: passes against development and production servers.
- `npm run qa:a11y`: zero axe violations for WCAG 2 A/AA and 2.1 AA tags at 1440px and 390px, with both ordinary and reduced motion. Automated scanning does not establish complete WCAG conformance.
- `npm run qa:hero`: exact background-plane cover/crop alignment, visible lake placement and text clearance, bird/boat movement, position-preserving pause/resume, offscreen suspension, responsive resize, live reduced-motion changes, and no-JavaScript static rendering.
- `npm audit --omit=dev`: zero production dependency vulnerabilities.

## Browser and visual coverage

The repeatable Playwright suite checks 1440×900, 768×1024, and 390×844. It produces 46 screenshots: the opening, every major section including the Projects introduction, every project, every research study, and a reduced-motion view. Screenshots are local evidence under `qa/screenshots/`, not committed site assets.

The dedicated landscape suite adds six early/later motion screenshots at those sizes, plus placement checks after live resizing to 320×768, 844×390, and 1920×1080. Development headless Chrome frame-interval samples had 16.7 ms medians and 16.7–16.8 ms 95th percentiles, with zero intervals over 34 ms, both animated and paused. These are local animation-frame scheduling diagnostics, not a guarantee of rendered frame rate on physical mobile devices.

Rendered desktop, tablet, and mobile compositions were inspected and iterated. Fixes included sharper hero image selection on narrow screens, readable low-contrast labels, visible project technology rails, mobile hero sizing, and timeline anchor positioning.

Assertions cover:

- Each word in the main section headings is capitalized, including “My Research.”; existing wording outside Coursework is retained.
- Canonical identity, separate degree dates, all nine experience roles, exactly five projects, three research studies, the publication, and all 31 courses (including the owner's added graduate CSCE 633 — Machine Learning).
- Experience uses “Where I’ve Worked.” with no right-side introduction or job descriptions; all roles, organizations, dates, and locations remain. The owner-supplied m1neral logo appears on desktop and mobile.
- Correct project descriptions, icon accessible names, repository links, and publication links; no fabricated Kung Fu Express repository.
- Projects uses “What I’ve Built.” without the header's right-side copy or any of the five bottom captions. All top-middle category labels are title-cased. Only the decorative line across the Kung Fu Express bowl was removed; its shape, noodles, chopsticks, and steam remain unchanged.
- Research uses “My Research.” without the right-side introduction. All three studies and their descriptions remain unchanged.
- Publication's peer-review/year label, Mathematics label, bottom number sequence, and bottom caption are removed. Its title, full citation, links, artwork, divider, and spacing remain intact.
- Contact retains “Let’s Connect.” and all email/LinkedIn/GitHub links. The copyright and degree/university labels are removed; the divider and right-aligned Back to top link remain.
- A complete Molang SVG replaces the footer star without using the owner's cropped screenshot. A brief 1.8-second arm wave greets on entering the viewport and can replay on hover, keyboard focus, or click. Bounds and name spacing are checked at six wave phases on all three viewport sizes; reduced motion and no JavaScript leave Molang still.
- No visible GPA, public phone number, obsolete project titles, experience bullet lists, missing images, horizontal overflow, JavaScript exceptions, or console errors.
- Desktop/mobile section navigation, active section state (including Contact at the bottom of the shortened footer), timeline jumps, mobile menu Escape behavior, and focus on opening the menu.
- Coursework uses “What I’ve Studied.” with no introductory paragraph or course streams. Three original MATH / CSCE / STAT marks orbit on one circular path in the existing sage palette; labels remain upright and within the visual's bounds at five sampled phases on desktop, tablet, and mobile.
- Coursework expansion, all eight graduate and 23 undergraduate courses, a data-derived total, accessible pause/resume controls, frozen orbit positions while paused, and offscreen suspension.
- Reduced-motion removal of hero/orbit transforms and the unpinned experience layout; no-JavaScript leaves the subject marks static and the complete native disclosure usable.
- No-JavaScript content and coursework access.
- The hero contains only “Aney Kanji” and “Software + AI Engineer”; every requested removed label, including the star/Software/AI/Research line, is absent. The circular down arrow is retained.
- The name retains its roughly 10% smaller size. The name and subtitle are centered together at all three screen sizes, clear of navigation, with the subtitle directly underneath.
- Three small SVG birds glide with intermittent wingbeats. One shaded SVG rowboat has a seated person, restrained drift/bob, oar motion, and faint water marks. Both remain behind the name and share the unchanged landscape image's responsive crop and scroll transform. The boat's anchor adjusts to remain on visible lake water on tablet/mobile.
- An icon-only landscape pause control sits beside the existing down arrow. It freezes all added bird/boat motion and resumes from the same position, leaving the approved scroll-linked camera unchanged; ambient motion also stops offscreen/in hidden tabs and is static for reduced motion or no JavaScript. The decorative overlay is hidden from assistive technology and does not intercept pointer events.
- The approved pre-landscape version is saved in ignored `private/checkpoints/approved-content-2026-10-07-before-landscape-motion.tar.gz`. Against that local archive, 35 other source/content/asset files and Molang's SVG artwork compare byte-for-byte unchanged. Existing hero text/layout checks protect the separately modified hero component; no approved copy or image asset was changed.
- Hero and Molang controls enable their React click handlers after hydration using a shared readiness hook. This corrects the prior DOM-only disabled-attribute approach; Molang click replay is tested independently of hover/focus, with its artwork and brief wave unchanged.
- Résumé privacy: no visible references or download links, no PDF in public assets, and HTTP 404 at the former download URL.

The prepared résumé was previously text-checked and visually inspected as a rendered one-page image. In this revision, it was removed from public assets and preserved locally in ignored `private/resume/`, following the owner's instruction not to expose any résumé. Its preparation helper now writes only to that private directory. The original PDF remains untouched in `_onboarding/assets/`; both copies are ignored, excluded from GitHub, and not publicly served.

## Implementation and external limitations

The production command uses `next build --webpack`. In this execution environment, the equivalent Turbopack build failed because its CSS subprocess could not bind a port. Development Turbopack and the production Webpack build both work.

The full dependency audit reports five high-severity **development-only** findings through `braces`/`micromatch`/`fast-glob` in the Next.js ESLint tooling. At verification, the upstream `braces` package had no newer compatible release. The proposed forced audit fix would downgrade the Next.js ESLint configuration, so it was not applied. These findings are not present in the production-only dependency audit; reassess them when updating development tooling.

The four public project repositories and arXiv link returned HTTP 200. The journal's canonical page returned HTTP 403 to the automated fetch; its owner-supplied URL was retained, not replaced. Authentication or bot protections on external services are outside the site's control.

The initial m1neral typographic fallback was replaced with the owner's supplied logo during the Experience revision. ObsidianUI's Flow Scroll registry endpoint returned HTTP 404; project scenes instead use custom GSAP motion. The Text Stream source was adapted and its MIT notice retained; the owner's Coursework revision replaced its rendered lanes with an original circular subject graphic.

Hero artwork was generated through the built-in imagegen tool, saved locally, and optimized from a 2.9 MB PNG to a roughly 453 KB WebP. Fonts and all displayed images are local. The supplied visual reference is preserved only in onboarding, never served publicly. Full generation prompt, source URLs, and licenses are recorded in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
