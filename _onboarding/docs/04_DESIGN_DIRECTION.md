# Design Direction

## The target feeling

A premium interactive editorial/product experience.

The user liked a reference image featuring:
- a saturated mountain/lake/flower landscape
- a full-bleed viewport
- huge white centered sans-serif type
- almost no chrome
- color doing most of the emotional work

Use that as a taste signal, not as a literal mountain-theme requirement.

## Design language

### Typography
Preferred:
- Geist Sans or an equivalently clean modern grotesk
- Geist Mono for small labels, dates, code-like metadata only

Characteristics:
- very large display sizes
- tight but readable tracking
- clean line-height
- restrained font-weight palette
- section numbers/labels can be monospaced

Avoid:
- novelty fonts
- overly techy sci-fi fonts
- excessive all-caps
- “hacker” terminal type as a main identity

### Base palette
Keep the structural UI neutral so visual scenes can carry color.

Suggested starting tokens:
- near-black ink
- warm/off-white canvas
- soft neutral gray
- a small set of vivid accent colors used per scene rather than everywhere

Do not turn the entire page into a rainbow gradient.

### Imagery
Use:
- full-bleed scenes
- employer marks
- project UI screenshots / repo assets where useful
- architecture diagrams built in CSS/SVG
- abstract visuals derived from the subject matter

Avoid:
- generic stock photos
- meaningless 3D blobs
- random space imagery
- gratuitous code screenshots

### Cards
Cards are allowed only when the information truly benefits from a contained surface.
A page made of 12 rounded rectangles is a failure.

### Glass
Glass/refractive effects are allowed sparingly.
One hero/detail moment is enough.
Do not make every surface translucent.

### Borders / radius
Prefer fewer, larger intentional shapes over dozens of small rounded boxes.
Do not default every container to `rounded-3xl`.

---

# Motion grammar

Motion should communicate structure.

Preferred:
- scroll-linked scale
- translate
- clip/mask reveals
- blur-to-focus
- controlled opacity
- image/visual parallax
- icon settling
- sticky scene transitions
- text progression tied to narrative

Avoid:
- every element fading up independently
- bouncing buttons
- perpetual floating
- excessive cursor-follow effects
- scroll hijacking
- long intro animations that block content

Use a consistent easing language.
A good default for non-scroll transitions:
`cubic-bezier(0.22, 1, 0.36, 1)`

For scrubbed scroll animation, let scroll position drive state directly.

---

# Taste guardrails

The user explicitly dislikes:
- cheesy slogans
- generic AI-generated portfolio copy
- dark “developer dashboard” aesthetics
- repetitive project cards
- skill-chip walls
- resume bullets on the experience timeline
- animation added only to prove animation exists

Ask this question for every effect:
**Does this make the story clearer or more memorable?**
If not, remove it.
