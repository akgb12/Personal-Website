"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { companyAssets, experiences } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/shared";

function CompanyMark({ name, small = false }: { name: string; small?: boolean }) {
  const asset = companyAssets[name];
  if (asset) return <Image src={asset} alt={`${name} logo`} width={small ? 100 : 360} height={small ? 70 : 260} className={`company-image ${name === "Texas A&M University" ? "tamu-mark" : name === "m1neral" ? "m1neral-mark" : ""}`} />;
  return <span className={`company-wordmark ${name === "m1neral" ? "mineral-mark" : "broadstreet-mark"}`} role="img" aria-label={name}>{name === "m1neral" ? <><span className="mineral-symbol">m</span>m1neral</> : <>BroadStreet<span>Institute</span></>}</span>;
}

export function Experience() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      experiences.forEach((_, index) => {
        ScrollTrigger.create({ trigger: `#experience-${index}`, start: "top 48%", end: "bottom 48%", onEnter: () => setActive(index), onEnterBack: () => setActive(index) });
      });
    }, root);
    return () => context.revert();
  }, []);
  const selected = experiences[active];
  return <section id="experience" ref={root} className="experience section-pad">
    <SectionLabel number="02">Experience</SectionLabel>
    <div className="experience-heading"><h2>Where I’ve Worked.</h2></div>
    <div className="experience-layout">
      <div className="experience-stage" aria-hidden="true">
        <div className={`company-stage ${selected.organization === "Texas A&M University" ? "academic-stage" : ""}`}><div key={selected.organization} className="company-stage-inner"><CompanyMark name={selected.organization} /></div><span className="stage-cross cross-one">+</span><span className="stage-cross cross-two">+</span></div>
        <div className="experience-stage-caption"><span className="mono">{String(active + 1).padStart(2, "0")} / 09</span><span>{selected.organization}</span></div>
      </div>
      <div className="experience-sequence">
        {experiences.map((item, index) => <article id={`experience-${index}`} key={`${item.role}-${item.organization}`} className={`experience-entry ${index === active ? "is-active" : ""}`}>
          <div className="experience-date mono"><span>{item.start} — {item.end}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
          <div className="mobile-company-mark"><CompanyMark name={item.organization} small /></div>
          <h3>{item.role}</h3><p className="experience-organization">{item.organization}</p><p className="experience-location mono">{item.location}</p>
        </article>)}
      </div>
      <div className="experience-rail" aria-label="Jump to an experience">{experiences.map((item, index) => <a key={index} href={`#experience-${index}`} className={active === index ? "is-active" : ""} aria-current={active === index ? "step" : undefined} aria-label={`${item.role} at ${item.organization}`}><span /></a>)}</div>
    </div>
  </section>;
}
