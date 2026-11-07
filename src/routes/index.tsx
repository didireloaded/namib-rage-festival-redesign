import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { brands, photos, type BrandKey, type Photo } from "@/data/site";
import { Media } from "@/components/site/Media";
import { cn } from "@/lib/utils";

/**
 * Immersive brand switchboard. It is a gateway, not a replacement for the
 * existing Namib Rage home, now reachable at /namib-rage.
 * Imagery for services is authentic Namib Rage event *atmosphere*, never
 * represented as proof of a particular service, crew or client.
 */
const scenes: Record<BrandKey, { photo: Photo; caption: string }> = {
  nr: { photo: photos.nrGallery1, caption: "Namib Rage · event archive" },
  sos: { photo: photos.sosCrowd, caption: "Sound of Summer · past festival" },
  camp: { photo: photos.campArt, caption: "Campout · official 2026 artwork" },
  barb: { photo: photos.nrGallery4, caption: "Namib Rage archive · bar photography pending" },
  howler: { photo: photos.nrGallery2, caption: "Namib Rage archive · Howler-specific imagery pending" },
  ft: { photo: photos.nrGallery3, caption: "Namib Rage archive · Fast Track imagery pending" },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Namib Rage — Choose your experience" },
      { name: "description", content: "Explore Namib Rage, Sound of Summer, Campout Dune Fest, Barbarian Bar Management, Howler ticketing and Fast Track services." },
      { property: "og:title", content: "Namib Rage — Choose your experience" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BrandGateway,
});

function BrandGateway() {
  const [active, setActive] = useState<BrandKey>("nr");
  const [previous, setPrevious] = useState<BrandKey | null>(null);
  const selected = brands.find((b) => b.key === active) ?? brands[0];

  function preview(next: BrandKey) {
    if (next === active) return;
    setPrevious(active);
    setActive(next);
  }

  useEffect(() => {
    if (!previous) return;
    const timer = window.setTimeout(() => setPrevious(null), 440);
    return () => window.clearTimeout(timer);
  }, [active, previous]);

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-cream" aria-label="Namib Rage brand entrance">
      {previous && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <Media photo={scenes[previous].photo} className="h-full w-full" />
        </div>
      )}
      <div key={active} className="gateway-image pointer-events-none absolute inset-0" aria-hidden="true">
        <Media photo={scenes[active].photo} priority={active === "nr"} className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-ink/60" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" aria-hidden="true" />

      <div className="relative z-10 flex min-h-svh flex-col justify-between">
        <header className="flex items-start justify-between gap-4 px-5 pb-8 pt-6 md:px-10 md:pt-9">
          <span className="display text-3xl md:text-4xl">Namib<span className="text-nr">Rage</span></span>
          <span className="hidden text-right text-sm font-semibold sm:block">Festivals · Event services<br />Windhoek, Namibia</span>
          <span className="text-sm font-semibold sm:hidden">NAMIBIA</span>
        </header>

        <div className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col justify-end px-5 pb-9 pt-16 md:px-10 md:pb-14">
          <p className="mb-4 text-sm font-semibold tracking-wide">Choose where to go</p>
          <h1 className="display max-w-4xl text-[clamp(3.5rem,8.5vw,9rem)] leading-[0.92]">
            One name.<br /><span className="text-camp">A whole lot happening.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85">
            Explore our festivals, the bars and ticketing behind major events, and the team that makes the details happen.
          </p>

          <nav aria-label="Choose a Namib Rage brand" className="mt-12 flex flex-col border-t border-cream/30 lg:grid lg:grid-cols-6 lg:gap-0">
            {brands.map((b) => (
              <Link
                key={b.key}
                to={b.to}
                onMouseEnter={() => preview(b.key)}
                onFocus={() => preview(b.key)}
                onTouchStart={() => preview(b.key)}
                className={cn(
                  "group relative flex min-h-16 items-center justify-between gap-3 border-b border-cream/25 py-3 text-left outline-offset-[-4px] transition-colors duration-150 lg:min-h-32 lg:flex-col lg:items-start lg:justify-end lg:border-r lg:px-4 lg:py-5",
                  selected.key === b.key ? "text-cream" : "text-cream/70 hover:text-cream",
                )}
                aria-current={selected.key === b.key ? "true" : undefined}
              >
                <span className={cn("absolute left-0 top-0 h-[3px] w-0 transition-[width] duration-200 lg:left-4", selected.key === b.key && "w-16", b.accentClass)} aria-hidden="true" />
                <span className="display max-w-full text-2xl leading-none sm:text-3xl lg:text-[clamp(1.15rem,1.9vw,2rem)] lg:leading-[1.04]">{b.name}</span>
                <span className="flex items-center gap-3 text-right text-xs lg:w-full lg:justify-between lg:text-left">
                  <span className="opacity-80">{b.role}</span>
                  <span className="text-lg transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-wrap justify-between gap-3 text-xs text-cream/70">
            <span>Hover, focus or select a brand to explore.</span>
            <span>{scenes[active].caption} · {scenes[active].photo.credit}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
