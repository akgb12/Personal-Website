"use client";

// Adapted from ObsidianUI Text Stream (MIT). See THIRD_PARTY_NOTICES.md.
// Retains its ticker, scroll-velocity response, wrap, and reduced-motion mechanics;
// uses horizontal editorial lanes with offscreen suspension and a separate course index.
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Course } from "@/data/portfolio";

export function TextStream({ items, reverse = false, paused }: { items: Course[]; reverse?: boolean; paused: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = root.current, target = track.current, copy = content.current;
    if (!container || !target || !copy || paused) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let distance = copy.offsetWidth, position = reverse ? -distance / 2 : 0;
      let visible = false, hovered = false, velocity = 0.35, targetVelocity = 0.35;
      let lastY = window.scrollY;
      let timeout: ReturnType<typeof setTimeout> | undefined;
      const resize = new ResizeObserver(() => { distance = copy.offsetWidth; });
      resize.observe(copy);
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "100px" });
      observer.observe(container);
      const tick = (_: number, delta: number) => {
        if (!visible || hovered || !distance || document.hidden) return;
        velocity = gsap.utils.interpolate(velocity, targetVelocity, 0.08);
        position += velocity * Math.min(delta / (1000 / 60), 3) * (reverse ? 1 : -1);
        position = gsap.utils.wrap(-distance, 0, position);
        gsap.set(target, { x: position });
      };
      const scroll = () => {
        const difference = Math.abs(window.scrollY - lastY);
        lastY = window.scrollY;
        targetVelocity = Math.min(2.4, .35 + difference * .012);
        clearTimeout(timeout);
        timeout = setTimeout(() => { targetVelocity = .35; }, 140);
      };
      const enter = () => { hovered = true; }, leave = () => { hovered = false; };
      container.addEventListener("pointerenter", enter);
      container.addEventListener("pointerleave", leave);
      window.addEventListener("scroll", scroll, { passive: true });
      gsap.ticker.add(tick);
      return () => { resize.disconnect(); observer.disconnect(); clearTimeout(timeout); gsap.ticker.remove(tick); window.removeEventListener("scroll", scroll); container.removeEventListener("pointerenter", enter); container.removeEventListener("pointerleave", leave); };
    });
    return () => media.revert();
  }, [items, reverse, paused]);
  return <div className="course-stream" ref={root} aria-hidden="true"><div ref={track} className="course-track">{[0, 1].map((copy) => <div className="course-copy" ref={copy === 0 ? content : undefined} key={copy}>{items.map((item) => <span className="stream-course" key={item.code}><span>{item.title}</span><span className="mono">{item.code}</span><span className="course-separator">✳</span></span>)}</div>)}</div></div>;
}
