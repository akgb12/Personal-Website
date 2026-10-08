"use client";

import { useCallback, useEffect, useRef } from "react";
import { useClientReady } from "@/lib/use-client-ready";

// Code-native rendition of Molang, referenced from the official full-body artwork.
// See THIRD_PARTY_NOTICES.md. The supplied cropped screenshot is not a site asset.
export function MolangGreeting() {
  const ready = useClientReady();
  const button = useRef<HTMLButtonElement>(null);
  const arm = useRef<SVGGElement>(null);
  const animation = useRef<Animation | null>(null);

  const wave = useCallback(() => {
    if (!arm.current || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animation.current?.cancel();
    animation.current = arm.current.animate([
      { transform: "rotate(0deg)", offset: 0 },
      { transform: "rotate(-18deg)", offset: .18 },
      { transform: "rotate(13deg)", offset: .36 },
      { transform: "rotate(-18deg)", offset: .54 },
      { transform: "rotate(10deg)", offset: .72 },
      { transform: "rotate(0deg)", offset: 1 },
    ], { duration: 1800, easing: "ease-in-out" });
  }, []);

  useEffect(() => {
    const target = button.current;
    if (!target) return;
    let greeted = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => animation.current?.cancel();
    const preferenceChanged = () => { if (reducedMotion.matches) stop(); };
    const visibilityChanged = () => { if (document.hidden) stop(); };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stop();
      else if (!greeted && entry.intersectionRatio >= .6) {
        greeted = true;
        wave();
      }
    }, { threshold: [0, .6] });
    observer.observe(target);
    reducedMotion.addEventListener("change", preferenceChanged);
    document.addEventListener("visibilitychange", visibilityChanged);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", preferenceChanged);
      document.removeEventListener("visibilitychange", visibilityChanged);
      stop();
    };
  }, [wave]);

  return <button ref={button} className="footer-molang" type="button" disabled={!ready} aria-label="Wave with Molang" onPointerEnter={wave} onFocus={wave} onClick={wave}>
    <svg className="molang-character" viewBox="0 0 180 220" fill="#fffdfa" stroke="#71330f" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M71 49C67 34 68 15 77 14C86 13 89 31 88 45M92 45C89 31 91 9 101 9C111 9 115 27 113 48" />
      <path d="M43 187C37 196 39 207 48 207C57 207 62 197 61 190M120 191C119 202 124 208 132 206C141 204 143 196 138 187" />
      <path d="M28 111C15 110 9 119 14 126C17 132 24 132 29 127" />
      <path d="M90 43C49 43 28 67 25 103L21 143C16 184 45 201 90 201C135 201 164 184 159 143L155 103C152 67 131 43 90 43Z" />
      <g fill="#f4c7d2" stroke="none"><circle cx="47" cy="103" r="11" /><circle cx="126" cy="103" r="11" /></g>
      <g fill="#71330f" stroke="none"><circle cx="58" cy="86" r="4.8" /><circle cx="115" cy="86" r="4.8" /></g>
      <path d="M87 86V94M77 94Q82 101 87 94Q93 101 99 94" fill="none" strokeWidth="3.5" />
      <g ref={arm} className="molang-wave-arm"><path d="M139 114C147 116 150 105 155 103C162 100 166 106 163 113C160 125 150 134 139 128" /></g>
    </svg>
  </button>;
}
