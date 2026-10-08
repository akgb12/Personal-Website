"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollScenes() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(".hero-art", { yPercent: 12, scale: 1.08, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-identity", { y: -100, opacity: 0.15, ease: "none", scrollTrigger: { trigger: "#hero", start: "20% top", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".project-visual").forEach((visual) => {
        gsap.fromTo(visual, { y: 45, rotate: -2 }, { y: -25, rotate: 0, ease: "none", scrollTrigger: { trigger: visual.closest("article"), start: "top bottom", end: "bottom top", scrub: 0.6 } });
      });
      const intro = document.querySelector(".about-copy");
      if (intro) gsap.fromTo(intro, { opacity: 0.75 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: intro, start: "top 90%", end: "top 45%", scrub: true } });
    });
    return () => media.revert();
  }, []);
  return null;
}
