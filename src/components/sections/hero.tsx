"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, Pause, Play } from "lucide-react";
import { HeroLife } from "./hero-life";
import { useClientReady } from "@/lib/use-client-ready";

export function Hero() {
  const [paused, setPaused] = useState(false);
  const ready = useClientReady();
  return <div id="hero" className="hero">
    <div className="hero-art"><Image src="/images/alpine-world.webp" alt="" fill preload sizes="(max-width: 1100px) 1800px, 100vw" quality={90} /><HeroLife paused={paused} /></div>
    <div className="hero-shade" />
    <div className="hero-identity">
      <h1>Aney Kanji</h1>
      <p>Software + AI Engineer</p>
    </div>
    <div className="hero-bottom"><div className="hero-actions"><button type="button" className="landscape-motion-control circle-arrow" disabled={!ready} onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume landscape animation" : "Pause landscape animation"}>{paused ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}</button><a href="#about" className="hero-scroll" aria-label="Explore About and Education"><span className="circle-arrow"><ArrowDown size={21} aria-hidden="true" /></span></a></div></div>
  </div>;
}
