import Image from "next/image";
import { ArrowRight, Check, FileCode2, GitBranch, ShieldCheck, Sparkles } from "lucide-react";

export function SapphireVisual() {
  return <div className="sapphire-system project-visual" aria-hidden="true">
    <svg className="sapphire-connections" viewBox="0 0 620 500"><path d="M90 150C170 150 160 260 310 260S470 350 550 350M90 350C170 350 160 260 310 260S470 150 550 150" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="310" cy="260" r="130" fill="none" stroke="currentColor" strokeDasharray="4 9" /><circle cx="310" cy="260" r="180" fill="none" stroke="currentColor" opacity=".35" /></svg>
    <div className="source-node"><FileCode2 size={30} strokeWidth={1.2} /><span>Legacy code</span><small>.zip / source files</small></div>
    <div className="sapphire-core"><div className="sapphire-crystal"><Sparkles size={60} strokeWidth={1} /></div><span>Agentic translation</span></div>
    <div className="output-node"><Check size={30} strokeWidth={1.2} /><span>Selected stack</span><small>Code + runnable tests</small></div>
    <div className="pipeline-caption mono"><GitBranch size={16} /> Translate / Validate / Test</div>
  </div>;
}

export function PaladinVisual() {
  return <div className="paladin-system project-visual" aria-hidden="true">
    <div className="receipt receipt-back"><span className="receipt-star">✳</span><div className="receipt-line" /><div className="receipt-line short" /><div className="barcode" /></div>
    <div className="paladin-preview"><Image src="/projects/paladin-preview.svg" alt="" width={1600} height={1000} unoptimized className="paladin-screenshot" /><span className="preview-caption mono">Receipt vault / Project interface</span></div>
    <div className="receipt receipt-front"><span className="mono">Paladin</span><h4>Every receipt.<br />In its place.</h4><div className="receipt-rule" /><div className="receipt-field"><span>Merchant</span><Check size={14} /></div><div className="receipt-field"><span>Date</span><Check size={14} /></div><div className="receipt-field"><span>Line items</span><Check size={14} /></div><div className="receipt-rule" /><div className="barcode" /><span className="receipt-footer mono">Upload → Extract → Organize</span></div>
  </div>;
}

export function FrostVisual() {
  const bars = Array.from({ length: 40 }, (_, i) => {
    const col = i % 8, row = Math.floor(i / 8);
    const x = 270 + (col - row) * 34, y = 220 + (col + row) * 17;
    const height = 26 + ((col * 31 + row * 43) % 135);
    return <g key={i}><path d={`M${x} ${y}l34 17v-${height}l-34 -17Z`} fill={i % 3 === 0 ? "#3f98b5" : "#23738e"} /><path d={`M${x + 34} ${y + 17}l34 -17v-${height}l-34 17Z`} fill="#16546e" /><path d={`M${x} ${y - height}l34 -17 34 17 -34 17Z`} fill={i % 5 === 0 ? "#d7efb2" : "#8ccee2"} /></g>;
  });
  return <div className="frost-system project-visual" aria-hidden="true"><svg viewBox="0 0 680 500"><g stroke="#195c75" opacity=".16" strokeWidth="1">{Array.from({ length: 12 }, (_, i) => <g key={i}><path d={`M${130 + i * 34} ${230 - i * 17}l408 204`} /><path d={`M${130 + i * 34} ${230 + i * 17}l408 -204`} /></g>)}</g>{bars}</svg><div className="frost-label mono"><span className="status-dot" /> Cloud spend / A different perspective</div></div>;
}

export function CloudGuardVisual() {
  return <div className="cloudguard-system project-visual" aria-hidden="true"><div className="guard-orbit orbit-one" /><div className="guard-orbit orbit-two" /><div className="guard-core"><ShieldCheck size={86} strokeWidth={.8} /></div><div className="guard-node guard-events"><span className="mono">01 / Ingest</span><strong>Security events</strong><div className="event-lines"><i /><i /><i /></div></div><div className="guard-node guard-analysis"><span className="mono">02 / Correlate</span><strong>Deterministic detection</strong><ArrowRight size={24} /></div><div className="guard-node guard-response"><span className="mono">03 / Reason</span><strong>Agent + memory</strong><span className="guard-check"><Check size={12} /> Structured response</span></div></div>;
}

export function KungFuVisual() {
  return <div className="kungfu-system project-visual" aria-hidden="true"><div className="menu-ticket"><span className="mono">Kung Fu Express</span><span className="ticket-title">Order.<br />Serve.<br />Repeat.</span><span className="ticket-bottom mono">POS / AI ordering</span></div><svg className="bowl-illustration" viewBox="0 0 480 450"><ellipse cx="242" cy="390" rx="178" ry="25" fill="#742f17" opacity=".14" /><path d="M62 200Q70 373 242 380Q414 373 422 200Z" fill="#f6efe1" /><ellipse cx="242" cy="201" rx="180" ry="79" fill="#e4d0a4" /><ellipse cx="242" cy="200" rx="158" ry="63" fill="#754927" />{Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${120 + (i % 4) * 45} ${165 + Math.floor(i / 4) * 18}q35 -25 66 6t-40 17`} fill="none" stroke={i % 3 === 0 ? "#e9c063" : "#d9a752"} strokeWidth="5" strokeLinecap="round" />)}<g fill="#527647"><ellipse cx="142" cy="185" rx="32" ry="14" transform="rotate(-20 142 185)" /><ellipse cx="325" cy="215" rx="30" ry="12" transform="rotate(30 325 215)" /><ellipse cx="280" cy="157" rx="22" ry="10" /></g><g fill="#da6940"><circle cx="198" cy="190" r="12" /><circle cx="291" cy="208" r="11" /></g><path d="M337 168 425 28M353 170 450 42" fill="none" stroke="#422d1a" strokeWidth="8" strokeLinecap="round" /><path d="M217 66q-20 20 0 35M259 49q-20 20 0 35" fill="none" stroke="#f6efe1" strokeWidth="3" strokeLinecap="round" /></svg></div>;
}
