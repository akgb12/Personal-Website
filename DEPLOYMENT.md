# Vercel deployment

## Project

- Name: `aney-kanji-portfolio`
- Scope: `aney-kanjis-projects` (Aney Kanji's projects)
- Plan: Hobby; no paid upgrade or add-on was enabled.
- GitHub repository: `akgb12/Personal-Website`
- Production branch: `main`
- Intended production alias: `https://aney-kanji-portfolio.vercel.app`

This is a new project. Existing Vercel projects and domains were not changed.

## Build settings

- Framework preset: Next.js
- Node.js: 24.x
- Install: `npm ci`
- Build: `npm run build` (uses `next build --webpack`)
- Root/output directory: automatic framework defaults
- `NEXT_PUBLIC_SITE_URL`: `https://aney-kanji-portfolio.vercel.app` in production, preview, and development; this is public configuration, not a secret.

Pushes to `main` are configured for production deployments through Vercel's GitHub integration. Other branches use preview deployments.

## Local CLI use

On another machine, install the Vercel CLI and sign in to the same scope, then:

```bash
vercel link --yes --scope aney-kanjis-projects --project aney-kanji-portfolio
vercel deploy --dry --json --scope aney-kanjis-projects
vercel deploy --prod --scope aney-kanjis-projects
```

Deploy only reviewed source. `--prod` publishes the current local files, which may differ from GitHub's `main`; prefer the GitHub integration for routine releases.

## Privacy

The local `.vercel/` directory and `.env.local` are ignored. The link operation may create a short-lived Vercel OIDC credential in `.env.local`; never commit or print it.

`.vercelignore` uses an upload allowlist: `src/`, `public/`, `_onboarding/data/`, and explicit package/build configuration. Private files, original onboarding assets, supplied visual references, and test evidence are not uploaded by the CLI. The original and prepared résumé PDFs remain local and ignored.

No résumé is served by the application. Legacy copies still exist in old Git history; this deployment setup does not rewrite history.

## Agent setup

The official guide is [Vercel's agent setup playbook](https://vercel.com/get-started.md). The CLI is authenticated independently of the agent's MCP connection.

The official Vercel guidance plugin is installed for Codex in user scope. Reload the agent to load its commands. The shared MCP endpoint is `https://mcp.vercel.com`; its separate OAuth approval is required before authenticated agent tools can be verified. Keep human confirmation enabled for agent mutations.
