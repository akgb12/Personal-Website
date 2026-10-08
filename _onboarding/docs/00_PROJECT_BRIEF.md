# Project Brief

## Goal

Rebuild Aney Kanji's personal website as a polished, cinematic, single-page professional portfolio.

The existing site at `https://aneykanji12.vercel.app/` is useful only as a historical content/link reference. Its current visual language should not be preserved.

The most important success criterion is **UI quality**. The finished page should feel much closer to a premium Apple product story, contemporary editorial portfolio, or high-end interactive showcase than a typical student/developer portfolio.

## User priorities

The site must communicate:

- Education at Texas A&M University
- Professional and academic experience
- Five selected software/AI projects
- Three research experiences
- One peer-reviewed publication
- Texas A&M coursework
- LinkedIn, GitHub, email, and résumé
- A clear blend of software engineering, AI systems, ML research, cloud/backend/full-stack work, and teaching

## Information architecture

One page only.

1. About / Education
2. Experience
3. Projects
4. Research
5. Publication
6. Coursework
7. Contact / Footer

Navigation should smooth-scroll to these anchors and indicate the active section.

## Core visual idea

The user strongly prefers:

- full-bleed, cinematic compositions
- large clean sans-serif typography
- strong whitespace
- vivid/sophisticated color when appropriate
- minimal clutter
- scene-like transitions as the user scrolls
- fluid motion that reveals more as the scroll progresses
- backgrounds or visual worlds that use the whole viewport
- restrained depth, hover motion, and pointer response

The user specifically does **not** want the site to read like a résumé rendered as cards.

## Reference image

`_onboarding/references/hero_reference.png` is the strongest taste reference supplied by the user. It is not a literal design to copy. What matters is the composition:
large type over a full-viewport, colorful visual world with almost no clutter.

## Implementation philosophy

Think:

`scroll → transformation → reveal → composition change → next story beat`

Not:

`scroll → card → card → card → card`

ObsidianUI is the preferred source for interaction mechanics. Custom code, GSAP, Motion, CSS, and limited Three.js are allowed when they produce a more coherent result.
