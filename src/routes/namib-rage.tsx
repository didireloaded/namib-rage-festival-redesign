import { createFileRoute, Link } from "@tanstack/react-router";
import { brands, festivals, photos, poweredEvents, sponsors } from "@/data/site";
import { Credit, Media } from "@/components/site/Media";
import { Chip, CtaLink, Sticker, TicketLink, Wordmark } from "@/components/site/Bits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/namib-rage")({
  head: () => ({
    meta: [
      { title: "Namib Rage — The festival company" },
      { name: "description", content: "Home of Sound of Summer (28 Dec 2026) and Campout Dune Fest (31 Dec 2026). Plus Barbarian bars, Howler ticketing and Fast Track permits." },
      { property: "og:title", content: "Namib Rage Events — We make Namibia come alive" },
      { property: "og:description", content: "Sound of Summer and Campout Dune Fest 2026 tickets, plus event services from Windhoek." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [sos, camp] = festivals;
  return (
    <>
      {/* HERO: split stage */}
      <section className="relative grid h-[calc(100svh-4rem)] min-h-[560px] grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <Link to="/festivals/sound-of-summer" className="group relative overflow-hidden" aria-label="Sound of Summer 2026">
          <Media photo={sos.hero} priority sizes="(min-width:768px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          <Sticker className="absolute right-4 top-4 bg-sos text-ink">{sos.dateSticker}</Sticker>
        </Link>
        <Link to="/festivals/campout" className="group relative overflow-hidden bg-camp-ink" aria-label="Campout Dune Fest 2026">
          <Media photo={camp.hero} priority sizes="(min-width:768px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
          <Sticker className="absolute right-4 top-4 rotate-3 bg-camp text-camp-ink">{camp.dateSticker}</Sticker>
        </Link>
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4 md:p-10">
          <h1 className="display text-[15vw] leading-[0.82] text-cream drop-shadow-[0_2px_0_var(--ink)] md:text-[9.5vw]">
            We make<br />Namibia<br /><span className="text-camp">come alive</span>
          </h1>
          <div className="pointer-events-auto mt-4 grid grid-cols-2 gap-2 md:mt-6 md:flex md:gap-3">
            <TicketLink f={sos} className="text-base md:text-xl">SoS 2026</TicketLink>
            <TicketLink f={camp} className="text-base md:text-xl">Campout 2026</TicketLink>
          </div>
          <a href="#ecosystem" className="pointer-events-auto eyebrow mt-4 hidden text-cream/80 hover:text-cream md:block">Scroll to explore ↓</a>
        </div>
      </section>

      {/* SIX BRANDS */}
      <section id="ecosystem" className="bg-ink">
        <div className="grid grid-cols-2 md:grid-cols-6">
          {brands.map((b) => (
            <Link key={b.key} to={b.to} className={cn("group flex min-h-36 flex-col justify-between p-4 transition-all hover:brightness-110", b.accentClass, b.textOnAccent)}>
              <span className="eyebrow text-[0.6rem] opacity-80">{b.role}</span>
              <Wordmark k={b.key} className="text-2xl md:text-3xl" />
              <span className="eyebrow text-[0.6rem] opacity-0 transition-opacity group-hover:opacity-100">Explore →</span>
            </Link>
          ))}
        </div>
        <p className="px-5 py-3 text-xs text-muted-foreground md:px-10">Two festivals we own. Three service divisions. One master brand. Wordmarks are placeholders for approved logo files.</p>
      </section>

      {/* FESTIVAL FEATURES */}
      <FestivalBlock f={sos} flip={false} extra={photos.sosBeach} />
      <FestivalBlock f={camp} flip extra={null} />

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <p className="eyebrow text-muted-foreground">Behind the stage</p>
        <h2 className="display mt-3 text-5xl md:text-8xl">Services that run events</h2>
        <div className="mt-10 grid gap-3 md:grid-cols-12">
          <Link to="/services/bar-management" className="group relative overflow-hidden bg-barb md:col-span-7 md:row-span-2">
            <div className="aspect-[4/3] md:aspect-auto md:h-full">
              <Media photo={photos.nrGallery3} sizes="(min-width:768px) 58vw, 100vw" className="opacity-60 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="eyebrow text-barb-orange">Event bar operations · atmosphere photo</span>
              <Wordmark k="barb" className="mt-2 text-6xl md:text-8xl" />
              <p className="mt-2 max-w-sm">Full-service event bars, from build to last call.</p>
            </div>
          </Link>
          <Link to="/services/ticketing-cashless" className="group flex flex-col justify-between bg-howler p-6 md:col-span-5">
            <span className="eyebrow">Ticketing partner</span>
            <Wordmark k="howler" className="mt-10 text-6xl" />
            <p className="mt-2">Tickets · access control · cashless.</p>
          </Link>
          <Link to="/services/fast-track" className="group flex flex-col justify-between bg-ft p-6 md:col-span-5">
            <span className="eyebrow">Permits & bookings</span>
            <Wordmark k="ft" className="mt-10 text-6xl" />
            <p className="mt-2">Visas, licences, flights and artist bookings.</p>
          </Link>
        </div>
      </section>

      {/* EVENTS WE POWER */}
      <section className="bg-cream py-20 text-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-5xl md:text-8xl">Events we power</h2>
            <Link to="/events-we-power" className="display text-xl underline-offset-4 hover:underline">See all →</Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-3">
            {poweredEvents.map((e) => (
              <li key={e.name} className="relative aspect-[4/3] overflow-hidden bg-barb">
                {e.photo && <Media photo={e.photo} sizes="33vw" />}
                <div className={cn("absolute inset-0 flex flex-col justify-end p-3", e.photo && "bg-gradient-to-t from-ink/80 to-transparent")}>
                  <div className="flex gap-1">{e.roles.map((r) => <Chip key={r} k={e.by[0]} label={r === "Owned" ? "Owned festival" : "Barbarian · Bar operations"} />)}</div>
                  <p className="display mt-2 text-2xl text-cream md:text-4xl">{e.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <h2 className="display text-4xl md:text-6xl">Partners & sponsors</h2>
        {sponsors.filter((s) => s.approved).length === 0 ? (
          <p className="mt-4 max-w-lg border-l-4 border-nr pl-4 text-muted-foreground">Sponsor logos appear here once approved by each partner.</p>
        ) : null}
      </section>

      {/* CTA */}
      <section className="grid md:grid-cols-2">
        <div className="relative min-h-80 overflow-hidden">
          <Media photo={photos.nrGallery1} sizes="50vw" />
          <div className="absolute inset-0 flex flex-col justify-end gap-4 bg-ink/50 p-6 md:p-10">
            <h2 className="display text-5xl md:text-7xl">Partner with us</h2>
            <div><CtaLink to="/partners">Partnerships</CtaLink></div>
          </div>
          <Credit photo={photos.nrGallery1} className="absolute right-2 top-2" />
        </div>
        <div className="flex min-h-80 flex-col justify-end gap-4 bg-nr p-6 md:p-10">
          <h2 className="display text-5xl md:text-7xl">Join the crew</h2>
          <p className="max-w-sm">Bar staff, ticketing crew and vendors for the 2026 season.</p>
          <div><CtaLink to="/work-with-us" variant="outline">Work with us</CtaLink></div>
        </div>
      </section>
    </>
  );
}

function FestivalBlock({ f, flip, extra }: { f: (typeof festivals)[number]; flip: boolean; extra: typeof photos.sosBeach | null }) {
  const isSos = f.brand === "sos";
  return (
    <section className={cn("grid md:grid-cols-12", isSos ? "bg-sos text-ink" : "bg-camp-ink text-cream")}>
      <div className={cn("relative aspect-[4/5] overflow-hidden md:col-span-7 md:aspect-auto md:min-h-[80vh]", flip && "md:order-2")}>
        <Media photo={f.hero} sizes="(min-width:768px) 58vw, 100vw" fit={isSos ? "cover" : "cover"} />
        <Credit photo={f.hero} className="absolute bottom-2 left-2" />
      </div>
      <div className="flex flex-col justify-center gap-5 p-6 md:col-span-5 md:p-12">
        <Sticker className={cn("self-start", isSos ? "bg-sos-cyan text-ink" : "bg-camp text-camp-ink")}>{f.dateSticker} 2026</Sticker>
        <h2 className="display text-6xl md:text-8xl">{f.name}</h2>
        <p className="text-lg">{f.tagline} {f.venue}, {f.area}. {f.age}.</p>
        {extra && (
          <div className="hidden aspect-video overflow-hidden md:block"><Media photo={extra} sizes="40vw" /></div>
        )}
        <div className="flex flex-wrap gap-3">
          <TicketLink f={f} className={isSos ? "bg-ink text-sos" : ""}>Get tickets</TicketLink>
          <Link to={isSos ? "/festivals/sound-of-summer" : "/festivals/campout"} className="display self-center text-lg underline underline-offset-4">Festival info →</Link>
        </div>
      </div>
    </section>
  );
}
