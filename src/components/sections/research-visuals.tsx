export function DocumentPipeline() {
  return <div className="document-pipeline" aria-hidden="true"><div className="document-sources"><span>LaTeX</span><span>Beamer</span></div><span className="pipeline-line" /><div className="canonical-node"><span className="mono">Ingest</span><strong>Canonical<br />representation</strong></div><span className="pipeline-line" /><div className="validation-node"><span>Orchestrate</span><span>Validate</span><span>Remediate ↺</span></div></div>;
}

export function VelocityField() {
  return <svg className="velocity-field" viewBox="0 0 520 320" aria-hidden="true"><defs><marker id="vector-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z" fill="#4e7773" /></marker></defs>{Array.from({ length: 77 }, (_, i) => {
    const x = 35 + (i % 11) * 44, y = 30 + Math.floor(i / 11) * 42;
    const angle = Math.atan2(y - 160, x - 260) + Math.PI / 2;
    return <path key={i} d={`M${x} ${y}l${Math.cos(angle) * 21} ${Math.sin(angle) * 21}`} fill="none" stroke="#4e7773" opacity=".4" markerEnd="url(#vector-arrow)" />;
  })}<path d="M45 235C85 83 222 30 370 95S470 218 345 262 161 182 240 124" fill="none" stroke="#347e69" strokeWidth="3" /><circle cx="45" cy="235" r="7" fill="#347e69" /><circle cx="240" cy="124" r="7" fill="#c76634" /></svg>;
}

export function FibonacciVisual({ large = false }: { large?: boolean }) {
  return <svg className={`fibonacci-visual ${large ? "large" : ""}`} viewBox="0 0 610 380" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1"><rect x="5" y="5" width="370" height="370" /><rect x="375" y="5" width="230" height="230" /><rect x="465" y="235" width="140" height="140" /><rect x="375" y="285" width="90" height="90" /><rect x="375" y="235" width="50" height="50" /><rect x="425" y="235" width="40" height="40" /></g><path d="M5 375A370 370 0 0 1 375 5a230 230 0 0 1 230 230 140 140 0 0 1-140 140 90 90 0 0 1-90-90 50 50 0 0 1 50-50 40 40 0 0 1 40 40" stroke="currentColor" strokeWidth="2" /><g fill="currentColor" fontSize="14" fontFamily="monospace"><text x="25" y="35">F₁₀</text><text x="395" y="35">F₉</text><text x="485" y="265">F₈</text></g></svg>;
}
