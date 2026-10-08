"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/portfolio";

export function Navigation() {
  const [active, setActive] = useState("about");
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let scheduled = false;
    const update = () => {
      const marker = window.innerHeight * 0.35;
      let current = "about";
      for (const item of navigation) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= marker) current = item.id;
      }
      // A compact footer can sit below the marker even at the end of the page.
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = navigation.at(-1)?.id ?? current;
      }
      setActive(current);
      setOverHero((document.getElementById("hero")?.getBoundingClientRect().bottom ?? 0) > 115);
      scheduled = false;
    };
    const onScroll = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    if (!open) return;
    navRef.current?.querySelector<HTMLAnchorElement>(".nav-links a")?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, [open]);

  return <>
    <noscript><style>{"@media(max-width:600px){.site-header.over-hero{position:relative;background:#f4f2eb;color:#222d29}.nav-shell{height:auto;min-height:70px;flex-wrap:wrap;padding-block:20px}.nav-links{position:static;display:grid;width:100%;order:3;border:0;padding:0}.menu-toggle{display:none}}"}</style></noscript>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`site-header ${overHero && !open ? "over-hero" : "over-content"}`}>
      <nav ref={navRef} className="nav-shell" aria-label="Main navigation">
        <div id="navigation-links" className={`nav-links ${open ? "is-open" : ""}`}>
          {navigation.map((item) => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={() => setOpen(false)}>{item.label}<span className="nav-dot" /></a>)}
        </div>
        <button ref={menuButton} className="menu-toggle" aria-controls="navigation-links" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </nav>
    </header>
  </>;
}
