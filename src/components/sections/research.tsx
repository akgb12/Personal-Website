import { research } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/shared";
import { DocumentPipeline, FibonacciVisual, VelocityField } from "./research-visuals";

const visualizations = [DocumentPipeline, VelocityField, FibonacciVisual];
const shortTitles = ["Accessible documents. Agentic systems.", "Flow Matching, through Kestrel.", "Patterns in Fibonacci numbers."];

export function Research() {
  return <section id="research" className="research section-pad"><SectionLabel number="04">Research</SectionLabel><div className="research-heading"><h2>My Research.</h2></div><div className="research-studies">{research.map((study, index) => {
    const Visual = visualizations[index];
    return <article id={`research-study-${index}`} className="research-study" key={study.title}><div className="study-copy"><span className="study-index mono">0{index + 1} / {index === 0 ? "Current research" : "Research"}</span><h3>{shortTitles[index]}</h3><p className="study-role">{study.title}</p><p className="study-description">{study.description}</p><span className="study-date mono">{study.start} — {study.end}</span>{index === 1 && <div className="study-metrics"><span><strong>45%</strong> lower render time</span><span><strong>30%</strong> lower experiment turnaround</span></div>}</div><div className={`study-visual study-visual-${index}`}><Visual /></div></article>;
  })}</div></section>;
}
