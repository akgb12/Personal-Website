# Accessibility and Performance

## Accessibility

- semantic section headings
- skip-to-content link
- keyboard-accessible nav
- visible focus states
- no hover-only critical information
- technology icons need accessible names even though visible labels are intentionally omitted
- sufficient contrast
- meaningful alt text for employer/project imagery
- decorative motion/images marked appropriately
- `prefers-reduced-motion: reduce` must substantially simplify motion
- anchor navigation must work without animation
- publication and coursework text must remain real DOM text

## Reduced motion

In reduced-motion mode:
- remove long pinned timelines where possible
- eliminate parallax
- eliminate large-scale transforms
- freeze continuous marquees/streams or provide static equivalents
- avoid WebGL pointer motion
- keep content order and hierarchy intact

## Performance

Use:
- transform / opacity animation
- `next/image` or optimized local assets
- dynamic import for Three.js/large interactive blocks
- IntersectionObserver or section state to suspend offscreen effects where helpful
- capped device pixel ratio for WebGL
- cleanup of GSAP/Three listeners and animation frames

Avoid:
- shipping multiple large 3D libraries for tiny effects
- huge uncompressed images
- remote demo assets from UI libraries
- several simultaneous perpetual animations

## Mobile

Do not reproduce every desktop effect.
Mobile can use:
- stack instead of pin
- fade/clip instead of 3D
- horizontal icon rail instead of floating constellation
- static/low-motion project visuals
- shorter section heights

The mobile site should still feel premium, not merely “functional.”
