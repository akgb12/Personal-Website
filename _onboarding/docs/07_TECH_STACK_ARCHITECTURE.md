# Recommended Technical Stack

The legacy site stack does not matter. Rebuild cleanly.

## Recommended baseline

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger for major scroll choreography
- Motion (`motion/react`) for component-level motion
- Three.js only where justified
- ObsidianUI source components
- React Icons / Simple Icons for common technology marks
- local SVG assets for missing brand/service icons

No backend or database is needed for the portfolio.

## Why Next.js

- strong React ecosystem
- works naturally with ObsidianUI
- straightforward Vercel deployment
- easy image/font optimization
- TypeScript-first structure
- supports static portfolio content well

## Suggested project structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    layout/
    sections/
      hero/
      about-education/
      experience/
      projects/
      research/
      publication/
      coursework/
      contact/
    motion/
    block/              # ObsidianUI/source-copy components
    ui/
  data/
    portfolio.ts
  lib/
    motion/
    effects/
    utils.ts
  styles/

public/
  companies/
  projects/
  research/
  tech/
  resume/
```

## Data model

Do not hardcode all content directly into JSX.
Build typed data objects for:
- education
- experiences
- projects
- research
- publication
- coursework
- social links

The JSON files under `_onboarding/data/` can be converted into TypeScript.

## Animation architecture

Use one orchestrated scroll system.

Preferred:
- GSAP ScrollTrigger for pinned section timelines and project/research sequences
- Motion for hover/local enter/exit
- native scrolling
- only add Lenis if a rendered prototype proves it improves the experience without harming accessibility

Avoid:
- multiple competing scroll libraries
- global requestAnimationFrame loops unless required
- WebGL scenes kept alive offscreen

## Three.js

Allowed:
- restrained hero refraction
- FrostSight visual
- one research visual

Not allowed:
- Three.js in every section
- full-site 3D scene just for novelty

Lazy-load heavy client components.

## Icons

Use `react-icons/si` or a Simple Icons wrapper where available.
For missing service logos (LangGraph, Gemini, AWS Textract, Cloud SQL, etc.), use official/local SVG assets.

Visible UI:
icons only.

Accessibility:
- `aria-label`
- title/tooltip on hover/focus where useful

Do not display permanent technology labels under every icon.

## Deployment

The repository is already associated with the user's current portfolio workflow.
Use the `new_version` branch for development.
If Vercel is connected to the repo, branch pushes can generate preview deployments.
Do not change production/main unless explicitly asked.
