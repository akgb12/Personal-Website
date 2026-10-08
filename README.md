# Aney Kanji — portfolio

A single-page, editorial portfolio rebuilt on `new_version`. It uses Next.js App Router, TypeScript, Tailwind CSS, local Geist fonts, and GSAP with native scrolling. No backend or external account is required.

## Run locally

Use Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). For a production preview:

```bash
npm run build
npm run start
```

The production build deliberately uses Webpack. Turbopack's production CSS worker could not bind its subprocess port in this machine's restricted execution environment; the Webpack build passes. Development still uses Next.js's default Turbopack server.

Set `NEXT_PUBLIC_SITE_URL` before building if the canonical deployment domain changes. Its default is `https://aneykanji12.vercel.app`. Nothing has been deployed by this rebuild.

## Content and structure

`_onboarding/data/` remains the factual source of truth. `src/data/portfolio.ts` types and imports that JSON directly. The original onboarding documents and assets are preserved locally; the supplied résumé and visual reference are ignored and excluded from GitHub.

The page follows About/Education → Experience → Projects → Research → Publication → Coursework → Contact. Its opening landscape is original generated artwork, not the supplied reference. Nine experience entries share a sticky organization stage; five projects have distinct visual compositions; three research studies and one formal citation follow. Coursework uses three original MATH / CSCE / STAT marks on a slow circular orbit, with upright labels, a pause control, and a complete, readable course index. The owner's added graduate CSCE 633 — Machine Learning brings the total to 31 courses.

- `src/app/`: page entry, metadata, fonts, and shared styling.
- `src/components/sections/`: the editorial sections and project/research visuals.
- `src/components/layout/`: accessible desktop/mobile navigation.
- `src/components/motion/`: restrained scroll-linked choreography.
- `src/components/block/text-stream.tsx`: previous adapted ObsidianUI ticker, retained but no longer rendered.
- `public/`: local organization imagery, project imagery, and original landscape. No résumé or PDF is published.

Native anchors, keyboard controls, reduced motion, and a no-JavaScript reading path are supported. Mobile replaces the sticky experience layout with a simple sequential history.

The Contact footer uses a complete code-native Molang character in place of the rotating star. Its short greeting wave also replays on hover, keyboard focus, or click, and stays static for reduced motion or without JavaScript. The cropped reference screenshot is not a public asset; visual references and character attribution are recorded in the third-party notices.

The opening landscape has three small gliding birds and a shaded rowboat with a seated person, gentle drift/bob, oar movement, and faint water marks. Its overlay plane follows the image's exact cover scale, crop, and existing scroll transform. An icon-only pause control sits beside the down arrow; motion stops offscreen, in hidden tabs, for reduced motion, and without JavaScript. These additions do not change the approved content or image assets.

The approved pre-landscape-motion version is preserved locally in ignored `private/checkpoints/approved-content-2026-10-07-before-landscape-motion.tar.gz`. It contains source, public assets, content data, and configuration, but not dependencies, build output, or private résumés. This checkpoint is local-only and is not published or committed.

The résumé is deliberately private per the owner's revision. There are no résumé links, and the former download URL returns 404. The prepared copy is preserved locally under ignored `private/resume/`; the supplied source PDF is untouched. The optional `scripts/prepare-private-resume.py` helper writes only to that private directory, never to public assets.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
npm run qa
npm run qa:a11y
npm run qa:hero
```

Start a server before running browser checks. All browser QA commands default to port 3000; pass `-- --url http://127.0.0.1:3001` or set `QA_URL` to test another server. They use installed Google Chrome on macOS, `CHROME_EXECUTABLE` if supplied, or Playwright's browser otherwise. On another machine without Chrome, install the test browser with `npx playwright install chromium`.

`qa:hero` verifies image-plane alignment, boat placement, paused/resumed positions, offscreen suspension, live resizing, reduced motion, static no-JavaScript rendering, and diagnostic frame intervals. It also compares unchanged content/assets against the local private checkpoint when available; that comparison is skipped on machines without the archive. Canonical-content checks in `qa` always run.

The browser suite writes screenshots to ignored `qa/screenshots/`. See [QA.md](QA.md) for results, scope, and remaining third-party limitations. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for licenses, asset sources, and the complete hero generation prompt.

The owner authorized staging, committing, and pushing this rebuild on `new_version`. No merge or deployment is part of that authorization.
