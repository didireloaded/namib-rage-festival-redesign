import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { festivals } from "@/data/site";
import { cn } from "@/lib/utils";

type Nav = { label: string; href: string };
type Context = { title: string; accent: string; links: Nav[]; action: Nav; actionClass: string };

const generalLinks: Nav[] = [
  { label: "Namib Rage", href: "/namib-rage" },
  { label: "Festivals", href: "/festivals" },
  { label: "Services", href: "/services" },
  { label: "Events we power", href: "/events-we-power" },
  { label: "Partners", href: "/partners" },
  { label: "Work with us", href: "/work-with-us" },
];

function navigation(path: string): Context {
  if (path.startsWith("/festivals/sound-of-summer")) return {
    title: "Sound of Summer", accent: "text-sos-cyan",
    links: [{ label: "Lineup", href: "#lineup" }, { label: "Stages", href: "#stages" }, { label: "Past summers", href: "#gallery" }, { label: "Getting there", href: "#getting-there" }, { label: "FAQ", href: "#faq" }],
    action: { label: "Get tickets", href: festivals[0].ticketUrl }, actionClass: "bg-sos-orange text-sos-deep",
  };
  if (path.startsWith("/festivals/campout")) return {
    title: "Campout Dune Fest", accent: "text-camp",
    links: [{ label: "Camping", href: "#camping" }, { label: "Getting there", href: "#getting-there" }, { label: "FAQ", href: "#faq" }],
    action: { label: "Get tickets", href: festivals[1].ticketUrl }, actionClass: "bg-camp text-camp-ink",
  };
  if (path.startsWith("/services/bar-management")) return {
    title: "Barbarian", accent: "text-barb-orange",
    links: [{ label: "What we do", href: "#services" }, { label: "Events", href: "#events" }, { label: "Enquire", href: "#enquire" }],
    action: { label: "Enquire", href: "#enquire" }, actionClass: "bg-barb-orange text-ink",
  };
  if (path.startsWith("/services/ticketing-cashless")) return {
    title: "Howler", accent: "text-howler",
    links: [{ label: "Services", href: "#services" }, { label: "Ticket help", href: "#ticket-help" }, { label: "Enquire", href: "#enquire" }],
    action: { label: "Enquire", href: "#enquire" }, actionClass: "bg-howler text-cream",
  };
  if (path.startsWith("/services/fast-track")) return {
    title: "Fast Track", accent: "text-ft",
    links: [{ label: "Services", href: "#services" }, { label: "How it works", href: "#process" }, { label: "Enquire", href: "#enquire" }],
    action: { label: "Enquire", href: "#enquire" }, actionClass: "bg-ft text-cream",
  };
  return {
    title: "Namib Rage", accent: "text-nr", links: generalLinks,
    action: { label: "Tickets", href: "/festivals" }, actionClass: "bg-nr text-cream",
  };
}

/** Each brand gets an in-context header, without losing the master brand switcher. */
export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const path = useRouterState({ select: (state) => state.location.pathname });
  const current = navigation(path);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); };
  }, [open]);

  const external = current.action.href.startsWith("https://");

  return (
    <header className={cn("sticky top-0 z-50 text-cream", path.startsWith("/festivals/sound-of-summer") ? "bg-sos-deep" : "bg-ink")}>
      <div className="mx-auto flex h-16 max-w-[1700px] items-center justify-between gap-3 px-4 md:px-10">
        <Link to="/" className="display shrink-0 text-xl md:text-2xl" aria-label="All Namib Rage brands">Namib<span className="text-nr">Rage</span></Link>
        <span className={cn("display min-w-0 truncate text-base sm:text-xl lg:text-2xl", current.accent)}>{current.title}</span>
        <nav className="hidden min-w-0 items-center gap-4 xl:flex" aria-label="Within this experience">
          {current.links.map((n) => (
            <a key={n.href} href={n.href} className="whitespace-nowrap border-b-2 border-transparent pb-1 text-sm font-semibold text-cream/80 transition-[color,border-color] duration-150 hover:border-cream hover:text-cream focus-visible:text-cream">{n.label}</a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={current.action.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={cn("display px-3 py-2 text-base transition-opacity hover:opacity-85 md:px-4 md:text-lg", current.actionClass)}
          >
            {current.action.label}
          </a>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="experience-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="min-h-10 px-2 text-sm font-semibold xl:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
          <Link to="/" className="hidden text-xs font-semibold text-cream/75 hover:text-cream xl:block">All brands ↗</Link>
        </div>
      </div>

      {open && (
        <nav id="experience-nav" aria-label="Mobile experience navigation" className={cn("nav-panel-enter fixed inset-x-0 bottom-0 top-16 overflow-y-auto px-5 pb-14 pt-6 xl:hidden", path.startsWith("/festivals/sound-of-summer") ? "bg-sos-deep" : "bg-ink")}>
          <p className="mb-3 text-sm text-cream/60">Explore {current.title}</p>
          {current.links.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="display block border-b border-cream/20 py-3 text-3xl text-cream">{n.label}</a>
          ))}
          <p className="mb-3 mt-8 text-sm text-cream/60">Switch experience</p>
          <Link to="/" className="display block py-3 text-3xl text-camp" onClick={() => setOpen(false)}>All brands ↗</Link>
          <Link to="/festivals/sound-of-summer" className="block py-2 text-lg text-sos" onClick={() => setOpen(false)}>Sound of Summer</Link>
          <Link to="/festivals/campout" className="block py-2 text-lg text-camp" onClick={() => setOpen(false)}>Campout Dune Fest</Link>
        </nav>
      )}
    </header>
  );
}
