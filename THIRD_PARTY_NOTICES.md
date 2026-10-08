# Third-party notices and visual sources

## ObsidianUI Text Stream

`src/components/block/text-stream.tsx` adapts the scroll-responsive ticker and wrapping mechanics of [Text Stream](https://www.obsidianui.dev/r/text-stream.json). It changes the orientation, layout, typography, pause controls, and offscreen behavior. This component is retained but no longer rendered after the owner's Coursework revision; the MATH / CSCE / STAT SVG marks and circular motion are original code-native visuals. Flow Scroll was inspected but its registry endpoint returned 404; the project scenes use custom GSAP choreography instead.

MIT License

Copyright (c) 2026 ObsidianUI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Paladin project preview

`public/projects/paladin-preview.svg` comes from [the owner's project](https://github.com/akgb12/Paladin/blob/main/preview-v3.svg).

MIT License

Copyright (c) 2026 akgb12

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Organization imagery

- Texas A&M: `https://www.tamu.edu/_files/images/logos/primaryTAM.png`
- Walt Disney: `https://thewaltdisneycompany.com/app/uploads/2026/01/organization-logo.png`
- BroadStreet: the favicon/organization mark linked from `https://www.broadstreet.org`, hosted at `https://static.wixstatic.com/media/3aa850_206f634abab04266aef2241fe891fa32~mv2.png`
- Acumentor: owner-supplied asset in `_onboarding/assets`.
- m1neral: owner-supplied logo attached during the Experience revision, saved unchanged as `public/companies/m1neral.png`.

Marks identify the organizations in the experience history. They remain the property of their respective owners.

## Hero artwork

Created with the built-in imagegen tool, then optimized locally to WebP. Saved as `public/images/alpine-world.webp`; the source is `public/images/alpine-world.png`. The supplied taste-reference image is never served by the application.

Final generation prompt:

> Use case: stylized-concept. Asset type: original full-bleed website hero background, wide landscape 16:9 composition. Create a premium cinematic alpine landscape with an impossibly clear turquoise lake threading between bold cobalt-blue mountain peaks, rolling emerald green meadows and vivid orange-red and pale yellow wildflowers in the foreground. Sophisticated art-directed 3D landscape illustration, detailed and tactile, beautiful natural texture, sunlit sculptural terrain, slight analog softness, a contemporary editorial feeling. Horizon and mountains in the upper third, lake reflection and open valley through the center, foreground plants at the lower edge. Large calm open central area with medium-dark teal and blue tones to allow oversized white website typography to be placed in code. Sky luminous pale cyan, saturated blues and greens, warm sun on meadow grasses. Panoramic wide-angle view with layered depth. No people, buildings, computer imagery, text, lettering, logos or watermark. Do not imitate stock photography. This is a new artwork inspired by the reference's colorful full-viewport feeling, not a copy. Return the generated image and save its local file for use in the project.

## Landscape overlays

`src/components/sections/hero-life.tsx` contains original code-native SVG bird and rowboat illustrations, including the generic seated person. No stock or third-party bird/boat assets, external requests, video, or additional graphics libraries are used. The original generated background is unchanged.

## Molang footer character

`src/components/sections/molang-greeting.tsx` is a code-native SVG rendition with an independently animated arm, requested by the owner for their personal profile identity. The full-body character reference was inspected on the [official Molang About page](https://shop.molang.com/pages/about-us), specifically [the complete rolling-character strip](https://shop.molang.com/cdn/shop/files/molang-rolls-about-page.png?v=1614335473). No official image is hotlinked or shipped, and the owner's cropped screenshot is not used as an asset. The older costumed image in repository history was inspected but not restored or published.

Molang is a third-party character; the illustration is not represented as an original character or an official endorsement. The character rights remain with their respective owners. No open-source character license is claimed.
