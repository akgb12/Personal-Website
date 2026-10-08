# ObsidianUI Component Integration

Official:
`https://www.obsidianui.dev/`

Developer portal:
`https://www.obsidianui.dev/developers`

API:
`https://www.obsidianui.dev/api`

Components:
`https://www.obsidianui.dev/components`

ObsidianUI is an open-source React component library intended to be copied/customized. Public docs and registry downloads do not require authentication.

## Registry setup

After shadcn initialization, add this registry to `components.json`:

```json
{
  "registries": {
    "@obsidian": "https://www.obsidianui.dev/r/{name}.json"
  }
}
```

The direct registry URL pattern is:
`https://www.obsidianui.dev/r/{name}.json`

An agent can inspect:
`https://www.obsidianui.dev/r/registry.json`

Optional shadcn MCP setup:
```bash
npx shadcn@latest mcp init
```

Direct CLI installation is completely fine and may be simpler.

---

# Preferred components

## Flow Scroll
Docs:
`https://www.obsidianui.dev/docs/flow-scroll`

Install:
```bash
npx shadcn@latest add "https://www.obsidianui.dev/r/flow-scroll.json"
```

Use:
- project storytelling / scene transitions
- inspiration for cinematic transforms

Important:
Do not automatically use the demo layout. Extract the motion mechanic and reskin it.

---

## Fractal Glass
Docs:
`https://www.obsidianui.dev/docs/fractal-glass`

Install:
```bash
npx shadcn@latest add "https://www.obsidianui.dev/r/fractal-glass.json"
```

Typical dependencies include Three.js plus utility helpers.

Use:
- possible hero visual layer
- subtle refraction over a custom image/video

Guardrail:
This should feel like depth in the composition, not “look at this WebGL effect.”

Replace ObsidianUI demo media with local project assets.

---

## Text Stream
Docs:
`https://www.obsidianui.dev/docs/text-stream`

Install:
```bash
npx shadcn@latest add "https://www.obsidianui.dev/r/text-stream.json"
```

Use:
- Coursework
- graduate/undergraduate course streams
- possibly technical keywords in a very restrained supporting role

This component uses GSAP and supports reduced motion.

---

## Split Showcase
Docs:
`https://www.obsidianui.dev/docs/split-showcase`

Install:
```bash
npx shadcn@latest add "https://www.obsidianui.dev/r/split-showcase.json"
```

Potential use:
- optional Engineering ↔ Research identity moment
- only use if it improves pacing
- do not insert it just because it exists

---

## Draggable Marquee
Docs:
`https://www.obsidianui.dev/docs/draggable-marquee`

Install:
```bash
npx shadcn@latest add "https://www.obsidianui.dev/r/draggable-marquee.json"
```

Potential use:
- project screenshots / visual interlude
- only if enough meaningful imagery exists

Do not fill it with stock images.

---

## Magnetic Image Trail
Docs:
`https://www.obsidianui.dev/docs/magnetic-image-trail`

Install:
```bash
npx shadcn@latest add "https://www.obsidianui.dev/r/magnetic-image-trail.json"
```

Potential use:
- optional playful interlude
- only if real project/employer imagery supports it

This is optional, not a requirement.

---

## Text Fill Animation
Docs:
`https://www.obsidianui.dev/docs/text-fill-animation`

Install:
```bash
npx shadcn@latest add "https://www.obsidianui.dev/r/text-fill-animation.json"
```

Potential use:
- short About sentence
- publication title
- one major research statement

Do not use it repeatedly.

---

# Component philosophy

ObsidianUI is a **mechanics library** for this project.

Correct:
- install source
- understand behavior
- replace demo media
- rewrite layout
- change spacing/type/colors
- integrate with the site's motion grammar

Incorrect:
- paste a demo section unchanged
- leave Obsidian branding/assets
- use every component available
- create a site that looks like the ObsidianUI examples stitched together

Before installing an effect, verify that it supports the narrative and performance budget.
