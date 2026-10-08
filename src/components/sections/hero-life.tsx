"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const birds = [
  { top: "10.9%", position: 45, phase: .455, duration: 58 },
  { top: "13.2%", position: 56, phase: .555, duration: 64 },
  { top: "12%", position: 63, phase: .625, duration: 61 },
];

function Rowboat() {
  return <svg viewBox="-48 -32 96 64" className="rowboat-sprite" aria-hidden="true">
    <defs>
      <linearGradient id="hero-boat-wood" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#c49c62" /><stop offset="1" stopColor="#765738" />
      </linearGradient>
      <linearGradient id="hero-boat-hull" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#ad7d48" /><stop offset="1" stopColor="#594b37" />
      </linearGradient>
    </defs>
    <g className="boat-water" fill="none" stroke="#b8e8df" strokeWidth=".7" opacity=".28">
      <path d="M-36 9Q-42 13-32 17M-38 20Q-19 26 1 24M10 22Q26 22 34 15" />
      <path d="M-29 24Q-14 28-1 27" opacity=".45" />
    </g>
    <ellipse cx="0" cy="13" rx="28" ry="5" fill="#103f4d" opacity=".3" />
    <path d="M-28 0Q-23 13-6 14Q18 12 29-6L26 1Q17 16-8 17Q-24 16-28 0Z" fill="url(#hero-boat-hull)" />
    <path d="M-28 0Q-4-11 29-6Q21 8-10 9Q-25 10-28 0Z" fill="url(#hero-boat-wood)" stroke="#e2c38a" strokeWidth=".65" />
    <path d="M-23-1Q-2-8 23-5Q12 5-9 6Q-22 6-23-1Z" fill="#524e3c" />
    <path d="M-9-5L-8 6M8-6L7 5" stroke="#bca272" strokeWidth="2.3" />
    <g className="boat-rower">
      <path d="M-5-8L-3-1 3 0 5-5" fill="none" stroke="#263e45" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M-6-15Q-2-18 2-15L4-7Q-2-4-6-8Z" fill="#bc7447" />
      <path d="M-5-13L-10-8M1-13L6-10" stroke="#b99875" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="-3" cy="-20" r="3" fill="#bfa181" />
      <path d="M-6-20Q-6-24-2-23Q1-22 0-19L-1-21Z" fill="#383d33" />
    </g>
    <g fill="none" stroke="#a18b62" strokeLinecap="round">
      <g className="boat-oar-left"><path d="M-7-10L-30 6" strokeWidth="1.2" /><path d="M-30 6L-36 10" strokeWidth="3" /></g>
      <g className="boat-oar-right"><path d="M4-10L28 12" strokeWidth="1.2" /><path d="M28 12L34 17" strokeWidth="3" /></g>
    </g>
    <path d="M-26 1Q-10 10 13 4" fill="none" stroke="#dbbb7e" strokeWidth=".55" opacity=".7" />
  </svg>;
}

export function HeroLife({ paused }: { paused: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const userPaused = useRef(paused);
  const syncMotion = useRef<(() => void) | null>(null);

  useEffect(() => {
    const scene = root.current, hero = scene?.closest(".hero");
    if (!scene || !hero) return;
    let visible = false;
    let animations: gsap.core.Animation[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const running = visible && !userPaused.current && !document.hidden && !reduced.matches;
      animations.forEach((animation) => animation.paused(!running));
      scene.dataset.running = String(running);
    };
    syncMotion.current = sync;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const flights = [...scene.querySelectorAll<HTMLElement>(".bird-flight")];
      flights.forEach((flight, index) => {
        const bird = birds[index];
        animations.push(gsap.fromTo(flight, { x: 0, xPercent: -5 }, {
          xPercent: 105, duration: bird.duration, repeat: -1, repeatDelay: 12 + index * 2,
          ease: "none", paused: true,
        }).progress(bird.phase));
        const sprite = flight.querySelector(".bird-sprite");
        animations.push(gsap.fromTo(sprite, { yPercent: -6 }, {
          yPercent: 6, duration: 4.8 + index, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true,
        }));
        const wings = [...flight.querySelectorAll(".bird-wing")];
        const flap = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 4.8 + index });
        flap.to(wings, { rotation: (i) => i === 0 ? 19 : -19, svgOrigin: "0 2", duration: .4, ease: "sine.inOut" })
          .to(wings, { rotation: (i) => i === 0 ? -6 : 6, duration: .45, ease: "sine.inOut" })
          .to(wings, { rotation: 0, duration: .5, ease: "sine.inOut" });
        animations.push(flap);
      });
      animations.push(gsap.fromTo(scene.querySelector(".boat-drift"), { xPercent: -28 }, {
        xPercent: 28, duration: 38, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true,
      }).progress(.35));
      animations.push(gsap.fromTo(scene.querySelector(".boat-float"), { yPercent: -1.4, rotation: -.7 }, {
        yPercent: 1.4, rotation: .7, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true,
      }));
      animations.push(gsap.fromTo(scene.querySelector(".boat-water"), { opacity: .16 }, {
        opacity: .3, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true,
      }));
      const oars = [...scene.querySelectorAll(".boat-oar-left, .boat-oar-right")];
      animations.push(gsap.fromTo(oars, { rotation: (i) => i === 0 ? -3 : 3, svgOrigin: "0 -9" }, {
        rotation: (i) => i === 0 ? 4 : -4, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true,
      }));
      sync();
      return () => { animations = []; scene.dataset.running = "false"; };
    }, scene);

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(hero);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      media.revert();
      syncMotion.current = null;
    };
  }, []);

  useEffect(() => { userPaused.current = paused; syncMotion.current?.(); }, [paused]);

  return <div ref={root} className="hero-life" aria-hidden="true" data-running="false">
    <div className="hero-life-plane">
      {birds.map((bird, index) => <div className={`bird-flight bird-${index}`} style={{ top: bird.top, transform: `translateX(${bird.position}%)` }} key={index}>
        <svg className="bird-sprite" viewBox="-18 -12 36 24" fill="#27434b" aria-hidden="true">
          <g className="bird-wing"><path d="M0 2C-4-2-9-6-15-4C-10-3-5 0-1 4Z" /></g>
          <g className="bird-wing"><path d="M0 2C4-2 9-6 15-4C10-3 5 0 1 4Z" /></g>
          <ellipse cx="0" cy="2" rx="1.2" ry="3" /><circle cx="1" cy="0" r="1.4" />
        </svg>
      </div>)}
      <div className="hero-lake-boat"><div className="boat-drift"><div className="boat-float"><Rowboat /></div></div></div>
    </div>
  </div>;
}
