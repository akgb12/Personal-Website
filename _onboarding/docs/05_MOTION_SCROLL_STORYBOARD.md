# Motion / Scroll Storyboard

This is a choreography guide, not a rigid pixel specification. Tune distances after rendering.

## 0. Global

- Native browser scrolling should remain usable.
- GSAP ScrollTrigger is acceptable for major pinned/scrolled scenes.
- Motion is appropriate for local component transitions.
- Do not stack multiple scroll engines unless necessary.
- Prefer transforms/opacity/clip-path over layout-thrashing properties.
- Reduced-motion mode must avoid long pins and large transforms.

---

# 1. Hero → About/Education

### Entry
- full viewport
- strong image/visual world
- `Aney Kanji` is the dominant object
- minimal nav
- supporting identity line is secondary

### Scroll
As the user moves down:
- background subtly scales or refracts
- title rises slightly
- title/supporting line lose opacity at different rates
- next section typography becomes visible underneath/through the transition
- no hard “section break” if possible

### About/Education reveal
- About paragraph appears as a typographic composition, not a card
- degree lines arrive separately
- dates are quiet metadata
- Engineering Honors appears as a small, clean detail

---

# 2. Experience

Preferred desktop choreography:
- pin a 100vh experience stage
- scroll updates active experience
- company image/logo changes with each beat
- role, company, date, and location transition independently
- transition can use scale/fade/slide/clip but should remain consistent across all roles
- subtle progress index (e.g. `01 / 09`) is allowed

Do not create nine giant cards.

TAMU appears multiple times; reusing the mark is fine, but differentiate the role through typography and scene state.

Mobile:
- unpin
- use vertical sequencing
- small image/logo per entry
- light enter transitions only

---

# 3. Projects

Five major scenes.

## Google Sapphire
Mood:
orchestration / translation / code systems.

Possible visual:
- abstract pipeline or editor/workspace geometry
- icons settle from distributed positions into a coherent system

Suggested tech icons:
React, Next.js, Tailwind, Flask, PostgreSQL, LangGraph, Gemini, GCP Cloud SQL, GCP Cloud Storage

## Paladin
Mood:
structured, cloud-native, receipt/data organization.

Possible visual:
- receipt/document planes or structured columns
- cleaner/more orderly than Sapphire

Suggested icons:
React, TypeScript, Spring Boot, GraphQL/Apollo, DynamoDB, S3, AWS Textract, Docker

## FrostSight
Mood:
cloud spend / data / visualization.

Possible visual:
- dimensional cost field, depth grid, or Three.js-inspired geometry
- this is the project most naturally suited to a restrained 3D visual

Suggested icons:
Vue.js, Three.js, Node.js, Express.js, MongoDB, Redis, AWS S3, Datadog, Docker

## CloudGuard Audit Agent
Mood:
security / detection / agentic reasoning.

Possible visual:
- event nodes → detection → agent → response
- avoid generic green “hacker” visuals

Suggested icons:
Python, FastAPI, LangChain, Gemini, GCP Pub/Sub, Docker

## Kung Fu Express
Mood:
product/operations/POS.

Suggested icons:
TypeScript, React.js, FastAPI, PostgreSQL, LangChain, AWS RDS, Heroku, Render, Docker

The project repo is not accessible in the linked GitHub installation. Do not block on it.

### Project transitions
Use Flow Scroll or custom pinned transitions as inspiration.
Each project can have a distinct composition, but typography, icon treatment, spacing, link styling, and motion grammar must be shared.

---

# 4. Research

Three stages, newest to oldest.

## AI Systems
Use an orchestration diagram that comes alive with scroll:
`source → ingestion → canonical representation → agent/orchestration → validation → remediation`

Do not imply publication-quality results that do not exist.

## Kestrel / Flow Matching
Use trajectories / vector fields / particles / lines if implemented efficiently.
The visual should evoke research tooling, not generic “AI brain” imagery.

## Mathematics
Transition toward Fibonacci/decomposition typography or geometric sequences.
This stage should naturally hand off to Publication.

---

# 5. Publication

Slow the page down visually.
Less motion, more confidence.

Possible:
- paper title fills the viewport
- small citation details resolve afterward
- a Fibonacci/decomposition layer moves very subtly in the background
- Journal / arXiv / DOI appear only once title hierarchy is established

---

# 6. Coursework

Use Text Stream or a custom kinetic typographic stream.
Scroll velocity can influence the stream slightly.
Do not make it difficult to actually read course names.

Graduate and undergraduate may occupy two lanes or two sequential treatments.

---

# 7. Contact

Motion should simplify again.
Large quiet type.
Links respond to hover/pointer cleanly.
No huge animated 3D finale is needed.
