import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const nav = [
  { to: "/festivals", label: "Festivals" },
  { to: "/services", label: "Services" },
  { to: "/events-we-power", label: "Events we power" },
  { to: "/partners", label: "Partners" },
  { to: "/work-with-us", label: "Work with us" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ink">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:px-10">
        <Link to="/" className="display text-2xl text-cream" aria-label="Namib Rage home">
          Namib<span className="text-nr">Rage</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="eyebrow text-cream/75 transition-colors hover:text-cream" activeProps={{ className: "eyebrow text-camp" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/festivals" className="display bg-nr px-4 py-2 text-lg text-cream transition-transform hover:-translate-y-0.5">
            Tickets
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open} aria-controls="mnav"
            className="display px-3 py-2 text-lg text-cream lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mnav" aria-label="Mobile" className="page-in fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-ink px-5 py-8 lg:hidden">
          <Link to="/" className="display block py-2 text-5xl text-cream">Home</Link>
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="display block py-2 text-5xl text-cream" activeProps={{ className: "display block py-2 text-5xl text-camp" }}>
              {n.label}
            </Link>
          ))}
          <div className="mt-8 grid gap-2 border-t border-border pt-6">
            <Link to="/festivals/sound-of-summer" className="display text-2xl text-sos">Sound of Summer →</Link>
            <Link to="/festivals/campout" className="display text-2xl text-camp">Campout Dune Fest →</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
