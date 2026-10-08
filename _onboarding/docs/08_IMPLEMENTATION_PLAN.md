# Implementation Plan

Codex should first inspect the repository and create a short `PLAN.md` before implementation.

## Phase 0 — Safety / repo state
- confirm current branch
- expected feature branch: `new_version`
- inspect `git status`
- do not checkout main
- do not restore deleted legacy files
- do not commit/push without user approval

## Phase 1 — Scaffold
- create clean Next.js + TypeScript + Tailwind application
- initialize shadcn-compatible structure if needed
- configure ObsidianUI registry
- establish lint/build scripts
- preserve `_onboarding/` and `AGENTS.md`

## Phase 2 — Design foundation
- typography
- CSS variables/tokens
- spacing scale
- section container rules
- nav shell
- responsive breakpoints
- motion helpers
- reduced-motion strategy

Do not start with every animation.

## Phase 3 — Static page hierarchy
Implement all seven sections with accurate content and no advanced scroll behavior yet.

Check:
- narrative order
- typography
- whitespace
- content density
- logos
- project data
- links

## Phase 4 — Hero / About / Education
Build the opening visual world and first transition.

## Phase 5 — Experience
Build the desktop sticky sequence and mobile vertical fallback.

## Phase 6 — Projects
Build five differentiated project scenes.
Integrate technology iconography.
Add repo links only where valid.

## Phase 7 — Research + Publication
Build research progression.
Build publication scene.
Make transition from mathematics research into publication feel intentional.

## Phase 8 — Coursework + Contact
Integrate Text Stream or custom typographic motion.
Build quiet final contact scene.

## Phase 9 — Major motion integration
- GSAP timelines
- pinned sections
- section transitions
- pointer response
- masks/clip paths
- icon motion

Add only after static composition is strong.

## Phase 10 — ObsidianUI refinement
Use the components documented in `06_OBSIDIANUI_COMPONENTS.md`.
Reskin all demo defaults.
Replace all demo assets.

## Phase 11 — Responsive / accessibility / performance
- 390px mobile
- 768px tablet
- 1280px laptop
- 1440px+ desktop
- reduced motion
- keyboard navigation
- focus states
- image alt text
- no horizontal overflow
- lazy-load heavy effects

## Phase 12 — Visual QA loop
This is mandatory.

Repeatedly:
1. run app
2. capture/inspect hero, experience, each project, research, publication, coursework, contact
3. inspect desktop + mobile
4. identify hierarchy/spacing/motion problems
5. revise
6. repeat

Do not stop at “the code compiles.”

## Phase 13 — Final QA
- `npm run build`
- lint/type checks
- link check
- content comparison against onboarding data
- verify no GPA
- verify experience has no bullets
- verify all five projects
- verify all three research items
- verify publication
- verify course list
- verify social links
