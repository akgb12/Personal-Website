# Aney Kanji Portfolio — Agent Instructions

You are rebuilding Aney Kanji's personal portfolio on a deliberately blank branch.

## Start here
Before changing code, read these files in order:

1. `_onboarding/docs/00_PROJECT_BRIEF.md`
2. `_onboarding/docs/01_DECISIONS_LOG.md`
3. `_onboarding/docs/02_CONTENT_SOURCE_OF_TRUTH.md`
4. `_onboarding/docs/03_INFORMATION_ARCHITECTURE.md`
5. `_onboarding/docs/04_DESIGN_DIRECTION.md`
6. `_onboarding/docs/05_MOTION_SCROLL_STORYBOARD.md`
7. `_onboarding/docs/06_OBSIDIANUI_COMPONENTS.md`
8. `_onboarding/docs/07_TECH_STACK_ARCHITECTURE.md`
9. `_onboarding/docs/08_IMPLEMENTATION_PLAN.md`
10. `_onboarding/docs/09_ACCEPTANCE_CRITERIA.md`
11. `_onboarding/docs/10_ACCESSIBILITY_PERFORMANCE.md`
12. `_onboarding/docs/11_ASSETS_AND_VISUALS.md`
13. `_onboarding/docs/12_COPY_GUIDE.md`
14. `_onboarding/docs/13_SOURCES_AND_LINKS.md`
15. `_onboarding/docs/14_FRESH_BRANCH_SETUP.md`

Structured factual data is in `_onboarding/data/`.

## Non-negotiable rules

- This is a **single-page portfolio**. Do not create separate About, Projects, Research, or Contact pages.
- The section order is:
  **About/Education → Experience → Projects → Research → Publication → Coursework → Contact**
- The website should feel like a premium interactive product page, not a résumé translated into HTML.
- Do not restore the old site's HTML/CSS/JS. The branch is intentionally a fresh slate.
- Do not invent employment dates, locations, research results, metrics, project technologies, or publication information.
- The user's direct corrections in the onboarding docs override the attached résumé and any older/public source.
- **No GPA anywhere.**
- Experience must not use résumé bullet lists.
- Project technology stacks must be presented primarily as **icons with no permanently visible text labels**. Accessible labels/tooltips are allowed.
- Do not use a cheesy hero slogan. No copy like “I build systems that think, scale, breathe...” or similar.
- Do not default to a dark cyber/dev dashboard aesthetic, card grid, terminal hero, neon-on-black, or skill-pill soup.
- Do not overuse glassmorphism, gradients, parallax, or WebGL. One intentional focal motion at a time.
- ObsidianUI components are implementation primitives, not the final visual identity. Heavily reskin them.
- Support `prefers-reduced-motion`.
- Mobile should be intentionally simplified, not a broken miniature of desktop.
- Use the company/organization image or logo for each experience where possible. Acumentor's supplied logo is included in `_onboarding/assets/`.
- Avoid advisor/researcher names in the Research section unless genuinely necessary. Formal publication authorship is an exception.
- Do not expose phone number on the public site unless explicitly asked.
- Do not commit, merge, rebase, or push unless the user explicitly asks.

## Working method

1. Inspect the current branch and repository state.
2. Read all onboarding docs.
3. Create an implementation plan before writing substantial UI.
4. Scaffold the new application safely without overwriting onboarding materials.
5. Establish the design system and layout shell first.
6. Build sections in the documented order.
7. Integrate animation only after static hierarchy/layout works.
8. Run the app and visually inspect rendered screenshots at desktop and mobile sizes.
9. Iterate on composition, hierarchy, spacing, motion, and responsiveness.
10. Run a production build and satisfy the acceptance criteria before considering the task complete.

When design judgment conflicts with “adding more effects,” choose restraint.
