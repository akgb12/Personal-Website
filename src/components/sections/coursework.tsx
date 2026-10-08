"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Plus } from "lucide-react";
import { coursework } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/shared";

const disciplines = ["MATH", "CSCE", "STAT"] as const;

function DisciplineMark({ subject }: { subject: (typeof disciplines)[number] }) {
  return <div className="discipline-mark">
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {subject === "MATH" && <>
        <path d="M40 9C29 4 26 15 26 29V35C26 49 23 60 12 55" />
        <path d="M38 28L52 42M52 28L38 42" />
      </>}
      {subject === "CSCE" && <>
        <path d="M18 20L6 32L18 44M46 20L58 32L46 44M38 14L26 50" />
      </>}
      {subject === "STAT" && <>
        <path d="M7 49H57M9 43C18 43 20 16 32 16S46 43 55 43" />
        <path d="M32 23V43M23 34V43M41 34V43" opacity=".4" />
      </>}
    </svg>
    <span>{subject}</span>
  </div>;
}

export function Coursework() {
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const courseCount = coursework.graduate.length + coursework.undergraduate.length;

  useEffect(() => {
    const section = root.current, field = visual.current;
    if (!section || !field) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const updateMotion = () => {
      section.dataset.moving = String(inView && !paused && !reducedMotion.matches && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateMotion();
    });
    observer.observe(field);
    section.dataset.motionReady = "true";
    reducedMotion.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateMotion);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateMotion);
      section.dataset.moving = "false";
    };
  }, [paused]);

  return <section id="coursework" className="coursework" ref={root} data-moving="false" data-motion-ready="false">
    <div className="coursework-heading section-pad">
      <SectionLabel number="06">Coursework</SectionLabel>
      <div className="course-heading-row">
        <h2>What I’ve Studied.</h2>
        <button className="course-motion-control mono" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume subject orbit" : "Pause subject orbit"} aria-pressed={paused}>
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {paused ? "Play motion" : "Pause motion"}
        </button>
      </div>
    </div>
    <div className="course-disciplines" ref={visual} role="img" aria-label="Mathematics, Computer Science, and Statistics">
      <div className="discipline-orbit" aria-hidden="true">
        {disciplines.map((subject) => <div className={`discipline-node discipline-${subject.toLowerCase()}`} key={subject}><DisciplineMark subject={subject} /></div>)}
      </div>
    </div>
    <div className="course-index-wrap section-pad">
      <details className="course-index">
        <summary><span>Explore all coursework <span className="mono">({courseCount})</span></span><Plus size={22} aria-hidden="true" /></summary>
        <div className="course-index-groups">
          {(["graduate", "undergraduate"] as const).map((group) => <div key={group}>
            <h3>{group === "graduate" ? "Graduate" : "Undergraduate"}</h3>
            <ul>{coursework[group].map((course) => <li key={course.code}><span className="mono">{course.code}</span><span>{course.title}</span></li>)}</ul>
          </div>)}
        </div>
      </details>
    </div>
  </section>;
}
