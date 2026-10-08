import { about, education } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/shared";

export function About() {
  return <section id="about" className="about section-pad">
    <SectionLabel number="01">About / Education</SectionLabel>
    <div className="about-layout"><h2>A Little <br />About Me.</h2><p className="about-copy">{about}</p></div>
    <div className="education">
      <div className="university"><span className="mono">Education</span><h3>{education.university}</h3><p>{education.location}</p><span className="honors"><span>✳</span> {education.honors}</span></div>
      <div className="degree-list">{education.degrees.map((degree, index) => <div className="degree" key={degree.degree}><span className="mono degree-index">0{index + 1}</span><div><h4>{degree.degree}</h4><p className="mono">{degree.start} — {degree.end}</p></div></div>)}</div>
    </div>
  </section>;
}
