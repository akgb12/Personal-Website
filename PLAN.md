# Portfolio rebuild

## Architecture
Stay on `new_version`; preserve the intentional legacy deletions and all onboarding material. Build one Next.js App Router page with TypeScript, Tailwind v4, semantic section components, and typed content sourced directly from `_onboarding/data`. No backend, commits, or deployment are required.

## Owner-approved content baseline — October 7, 2026
After the Contact/Molang revision, the owner explicitly approved all current content as perfect. Preserve this content, section order, headings, links, course list (31 courses including graduate CSCE 633), and résumé privacy. Future experimentation should be animation/visual-only unless the owner requests a content change. This is the reference point when the owner asks to return to the approved content. Before implementing the subsequently authorized landscape motion, a local restorable source/assets/configuration checkpoint was saved to ignored `private/checkpoints/approved-content-2026-10-07-before-landscape-motion.tar.gz`. It excludes dependencies, build output, and private résumés. No Git commit was created.

The owner explicitly authorized small birds over the opening alpine backdrop and a tiny person in a boat on the lake. Treat “About over the backdrop” as the opening hero scene, not the separate About/Education text section. Lightweight code-native SVGs will sit in a scene plane mapped exactly to the existing image's cover scale and object position, inside its existing scroll-transformed layer. Use three distant gliding birds with brief wingbeats and one shaded rowboat with a seated person, restrained drift/bob, and faint water marks. Adjust the boat's lake anchor for mobile/tablet cropping, avoid the name/navigation, add an icon-only pause control, and stop motion offscreen, in hidden tabs, for reduced motion, or without JavaScript. Preserve all approved text and image assets. Verify travel/boat bounds, image alignment, pause/resume without resetting positions, resize behavior, and frame timing alongside the full existing QA suite.

## Visual system
Use locally hosted Geist fonts, warm ivory, near-black text, large typography, small monospaced metadata, and generous editorial spacing. Create an original saturated landscape for the full-viewport opening; never publish the supplied reference. Company marks and subject-specific SVG/HTML compositions carry the remaining visual story. Avoid repetitive cards and decorative dashboards.

## Section choreography
1. Hero to About/Education: subtle scroll-linked image scale and title movement; two separate degree lines.
2. Experience: sticky organization stage alongside nine chronological entries; active role follows scrolling, with keyboard-accessible jump controls.
3. Projects: five full-width scenes with individual palettes/compositions, shared typography and icon-only technology rails.
4. Research: three editorial studies with document orchestration, velocity-field, and Fibonacci visuals.
5. Publication: reusable citation component in a large quiet mathematical composition.
6. Coursework: three original MATH / CSCE / STAT marks orbit slowly on one circular path, staying upright; retain the readable graduate/undergraduate disclosure. Pause offscreen and in hidden tabs, provide a pause control, and freeze for reduced motion. Include the owner's added graduate CSCE 633 — Machine Learning and derive course counts from the data.
7. Contact: large quiet closing typography, email/LinkedIn/GitHub links, and the retained Back to top link. A complete code-native Molang character replaces the rotating star; a brief, gentle greeting wave plays on entering the viewport and on hover/focus. Respect reduced motion and keep the character static without JavaScript.

## Component and motion strategy
Configure the ObsidianUI registry. Inspect its source and preserve licensing for adapted mechanics. Use GSAP/ScrollTrigger as the single scroll system; native scrolling and anchor navigation remain intact. Only adopt effects that serve the composition. Avoid WebGL unless visual testing establishes a need.

## Responsive behavior and accessibility
At 390px, use stacked experience entries, static or restrained project visuals, wrapped icon rails, a compact accessible menu, and shorter section heights. At 768px tune typography and scene placement explicitly. Reduced motion removes scroll transforms and freezes the coursework orbit. Include skip link, focus indicators, active navigation, accessible icon names, meaningful logo alternatives, and no horizontal overflow.

## Coursework revision
Use “What I’ve Studied.” without the explanatory paragraph or course streams. Keep the existing section rhythm and sage palette, with lightweight SVG subject marks rather than external logo assets. Capitalize every word in the main section headings, preserving their wording outside Coursework. Verify all 31 courses, the new graduate entry, upright marks, circular spacing, full-orbit bounds at all three viewport sizes, pause/resume, offscreen suspension, reduced motion, and no-JavaScript access. Visually inspect the new composition before the final production checks.

## Validation
Run the app and inspect all sections at 1440×900, 768×1024, and 390×844. Check navigation, timeline controls, coursework disclosure, reduced motion, console errors, links, and exact canonical content. Iterate on screenshots, then run lint, TypeScript, and a production build. Record evidence and any limitations in `QA.md`.

## Contact revision
Remove only the copyright and degree/university metadata at the bottom, preserving the divider and right-aligned Back to top link. Keep “Let’s Connect.” and all contact links. Use official full-body Molang references to create a transparent-background SVG with an independently animated arm; never publish or use the owner's cropped screenshot. Match the existing footer scale and palette, keep the large name unchanged where space permits, and verify complete character bounds, a short wave, keyboard access, reduced-motion behavior, and desktop/mobile composition.
