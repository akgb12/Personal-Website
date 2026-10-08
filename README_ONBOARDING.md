# Aney Portfolio Codex Onboarding Package

This package is designed to be copied into the **root of the blank `new_version` branch** of the `Personal_Website` repository.

## What is inside

- `AGENTS.md` — root instructions Codex should read automatically
- `CODEX_START_PROMPT.md` — one prompt to start the implementation
- `_onboarding/docs/` — all design/content/implementation decisions
- `_onboarding/data/` — structured source-of-truth content
- `_onboarding/assets/` — résumé + Acumentor logo
- `_onboarding/references/` — visual inspiration supplied by the user

## Recommended handoff

1. Extract the ZIP into the repo root.
2. Open the repo in Codex on branch `new_version`.
3. Give Codex the contents of `CODEX_START_PROMPT.md` (or simply tell it to read that file).
4. Let it inspect and plan before coding.

The docs explicitly account for the branch being a blank slate and for the onboarding files already making the directory non-empty.
