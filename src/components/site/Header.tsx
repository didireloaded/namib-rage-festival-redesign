import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { festivals } from "@/data/site";
import { ArrowUpRight, Menu, X } from "lucide-react";
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
    links: [
      { label: "Festival", href: "/festivals/sound-of-summer" },
      { label: "Lineup", href: "/festivals/sound-of-summer#lineup" },
      { label: "Stages", href: "/festivals/sound-of-summer/stages" },
      { label: "Past summers", href: "/festivals/sound-of-summer#gallery" },
      { label: "Getting there", href: "/festivals/sound-of-summer#getting-there" },
      { label: "FAQ", href: "/festivals/sound-of-summer#faq" }
    ],
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
    title: "Namib Rage", accent: "text-[#208ec7]", links: generalLinks,
    action: { label: "Tickets", href: "/festivals" }, actionClass: "bg-nr text-cream",
  };
}

/** Each brand gets an in-context header, without losing the master brand switcher. */
export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const path = useRouterState({ select: (state) => state.location.pathname });
  const current = navigation(path);
  const isNamibRage = path === "/namib-rage";

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
    <header className={cn("sticky top-0 z-50", isNamibRage ? "bg-bone text-night" : path.startsWith("/festivals/sound-of-summer") ? "bg-sos-deep text-cream" : "bg-ink text-cream")}>
      <div className="mx-auto flex h-16 max-w-[1700px] items-center justify-between gap-3 px-4 md:px-10">
        <Link to="/" className="shrink-0" aria-label="All Namib Rage brands">
          <img
            src={isNamibRage ? "/brands/namib-rage-events-blue-nav.png" : "/brands/namib-rage-events.png"}
            alt="Namib Rage Events"
            className="h-11 w-auto max-w-[140px] object-contain md:h-12 md:max-w-[170px]"
            decoding="async"
          />
        </Link>
        <span className={cn("display min-w-0 truncate text-base sm:text-xl lg:text-2xl", current.accent)}>{current.title}</span>
        <nav className="hidden min-w-0 items-center gap-4 xl:flex" aria-label="Within this experience">
          {current.links.map((n) => (
            <a key={n.href} href={n.href} className={cn(
              "whitespace-nowrap border-b-2 border-transparent pb-1 text-sm font-semibold transition-[color,border-color] duration-150",
              isNamibRage
                ? "text-night/80 hover:border-night hover:text-night focus-visible:text-night"
                : "text-cream/80 hover:border-cream hover:text-cream focus-visible:text-cream"
            )}>{n.label}</a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={current.action.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={cn("display px-3 py-2 text-base transition-opacity hover:opacity-85 md:px-4 md:text-lg", isNamibRage ? "bg-[#208ec7] text-white" : current.actionClass)}
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
            {open ? <><X className="mr-2 inline-block size-4" aria-hidden="true" />Close</> : <><Menu className="mr-2 inline-block size-4" aria-hidden="true" />Menu</>}
          </button>
          <Link to="/" className={cn("hidden text-xs font-semibold xl:block", isNamibRage ? "text-night/75 hover:text-night" : "text-cream/75 hover:text-cream")}>All brands <ArrowUpRight className="ml-1 inline-block size-4" aria-hidden="true" /></Link>
        </div>
      </div>

      {open && (
        <nav id="experience-nav" aria-label="Mobile experience navigation" className={cn("nav-panel-enter fixed inset-x-0 bottom-0 top-16 overflow-y-auto px-5 pb-14 pt-6 xl:hidden", isNamibRage ? "bg-bone text-night" : path.startsWith("/festivals/sound-of-summer") ? "bg-sos-deep text-cream" : "bg-ink text-cream")}>
          <p className={cn("mb-3 text-sm", isNamibRage ? "text-night/65" : "text-cream/60")}>Explore {current.title}</p>
          {current.links.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className={cn("display block border-b py-3 text-3xl", isNamibRage ? "border-night/20 text-night" : "border-cream/20 text-cream")}>{n.label}</a>
          ))}
          <p className={cn("mb-3 mt-8 text-sm", isNamibRage ? "text-night/65" : "text-cream/60")}>Switch experience</p>
          <Link to="/" className={cn("display block py-3 text-3xl", isNamibRage ? "text-[#208ec7]" : "text-camp")} onClick={() => setOpen(false)}>All brands <ArrowUpRight className="ml-1 inline-block size-5" aria-hidden="true" /></Link>
          <Link to="/festivals/sound-of-summer" className="block py-2 text-lg text-sos" onClick={() => setOpen(false)}>Sound of Summer</Link>
          <Link to="/festivals/campout" className="block py-2 text-lg text-camp" onClick={() => setOpen(false)}>Campout Dune Fest</Link>
        </nav>
      )}
    </header>
  );
}
