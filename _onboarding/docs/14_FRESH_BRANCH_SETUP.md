# Fresh Branch Setup

The user's screenshot shows the repository `Personal_Website` on branch:

`new_version`

The legacy files were intentionally removed.

## Safety

Before scaffolding:

```bash
git branch --show-current
git status
```

Expected branch:
```text
new_version
```

Do not checkout or modify `main`.

Do not restore the deleted legacy HTML/CSS/JS files.

If the deletions are uncommitted, do not commit them unless the user asks. It is okay to continue working in the existing dirty branch after inspecting the status.

## Important: onboarding files already exist

Because `AGENTS.md` and `_onboarding/` are in the repo, running `create-next-app` directly into `.` may refuse because the directory is non-empty.

Safe approach:

```bash
npx create-next-app@latest .next-scaffold-temp \
  --ts \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --use-npm \
  --import-alias "@/*"
```

Then copy the generated application files into the repo root while preserving:
- `.git/`
- `AGENTS.md`
- `CODEX_START_PROMPT.md`
- `_onboarding/`

For example, inspect first, then use `rsync` or equivalent.

Remove the temporary scaffold only after verifying the root project runs.

## Suggested packages after scaffold

```bash
npm install gsap motion three clsx tailwind-merge react-icons lucide-react
npm install -D @types/three
```

Do not add a smooth-scroll package by default.
Start with native scroll + GSAP ScrollTrigger.
Only add Lenis after visual testing proves it improves the experience.

## shadcn / ObsidianUI

Initialize shadcn if the scaffold does not have `components.json`:

```bash
npx shadcn@latest init
```

Then configure the Obsidian registry as documented in `06_OBSIDIANUI_COMPONENTS.md`.

Install only the effects actually used.

## First milestone

Before advanced animation:
- dev server runs
- all sections render
- all content is correct
- nav works
- desktop/mobile hierarchy is solid

Then add scroll choreography.

## Vercel

If the GitHub repo is already connected to Vercel, a pushed feature branch can normally get a preview deployment.
Do not merge to `main` or change production settings without explicit user approval.
