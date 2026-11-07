import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { brands, festivals, homepageHeroVideo, photos, poweredEvents, sponsors, type BrandKey, type Photo } from "@/data/site";
import { Media } from "@/components/site/Media";
import { TicketLink } from "@/components/site/Bits";
import { cn } from "@/lib/utils";

const brandScenes: Record<BrandKey, Photo | null> = {
  nr: photos.nrGallery1,
  sos: photos.sosCrowd,
  camp: photos.campArt,
  barb: null,
  howler: null,
  ft: null,
};

const brandsInOrder: BrandKey[] = ["nr", "sos", "camp", "barb", "howler", "ft"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Namib Rage Events | Festivals & Event Services" },
      { name: "description", content: "Sound of Summer and Campout Dune Fest. Experience Namib Rage's festivals, event bars, ticketing and event services." },
      { property: "og:title", content: "Namib Rage Events" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  const [selected, setSelected] = useState<BrandKey>("nr");
  const selectedRef = useRef<BrandKey>("nr");
  const [departing, setDeparting] = useState<BrandKey | null>(null);
  const position = brandsInOrder.indexOf(selected);
  const scene = brandScenes[selected];

  const previewBrand = (key: BrandKey) => {
    if (key === selectedRef.current) return;
    setDeparting(selectedRef.current);
    selectedRef.current = key;
    setSelected(key);
  };

  useEffect(() => {
    if (!departing) return;
    const t = window.setTimeout(() => setDeparting(null), 350);
    return () => window.clearTimeout(t);
  }, [departing, selected]);

  return (
    <div className="bg-night text-bone">
      <section className="relative isolate flex min-h-svh flex-col justify-between overflow-hidden bg-night" aria-label="Namib Rage Events">
        <div className="absolute inset-0" aria-hidden="true">
          <Media photo={photos.nrGallery1} video={homepageHeroVideo} priority sizes="100vw" className="absolute inset-0" />
          <div className="absolute inset-0 bg-night/55" />
        </div>
        <div className="relative z-10 flex items-center justify-between gap-3 px-5 pt-5 md:px-12 md:pt-9">
          <span className="display text-2xl leading-none sm:text-3xl">NAMIB <span className="text-amber">RAGE</span></span>
          <Link to="/festivals" className="inline-flex min-h-11 items-center gap-2 border border-bone/70 px-4 text-sm font-bold uppercase tracking-wide hover:bg-bone hover:text-night">Tickets <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </div>
        <div className="relative z-10 px-5 pb-9 pt-32 sm:pb-14 md:px-12 md:pb-16">
          <h1 className="display max-w-[1250px] text-[clamp(4.3rem,10vw,11rem)] leading-[.9]">We make<br /><span className="text-amber">Namibia</span><br />come alive.</h1>
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-5">
            <Link to="/festivals" className="display inline-flex min-h-12 items-center gap-3 bg-amber px-6 py-3 text-xl text-night transition-colors hover:bg-bone">Buy tickets <ArrowUpRight className="size-5" aria-hidden="true" /></Link>
            <a href="#brands" className="display inline-flex min-h-12 items-center gap-3 border border-bone px-6 py-3 text-xl text-bone transition-colors hover:bg-bone hover:text-night">Explore brands <ArrowDown className="size-5" aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section id="brands" className="relative isolate scroll-mt-4 overflow-hidden bg-night" aria-label="Our brands">
        {departing && brandScenes[departing] && (
          <div className="pointer-events-none absolute inset-0" aria-hidden="true"><Media photo={brandScenes[departing]} className="absolute inset-0 opacity-25" /></div>
        )}
        {scene && (
          <div key={selected} className="gateway-scene pointer-events-none absolute inset-0" aria-hidden="true">
            <Media photo={scene} className="absolute inset-0 opacity-25" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-night/40" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[1700px] px-5 py-16 md:px-12 md:py-24">
          <div className="flex snap-x snap-mandatory gap-1 overflow-x-auto pb-3 [scrollbar-width:thin]" aria-label="Brand selection">
            {brandsInOrder.map((key) => {
              const b = brands.find((item) => item.key === key)!;
              return (
                <Link key={b.key} to={b.to}
                  onMouseEnter={() => previewBrand(b.key)}
                  onFocus={() => previewBrand(b.key)}
                  onTouchStart={() => previewBrand(b.key)}
                  className={cn("group flex min-h-44 w-[76vw] max-w-72 shrink-0 snap-center flex-col justify-end p-5 outline-offset-[-4px] transition-[filter] duration-200 hover:brightness-110 sm:w-[45vw] lg:w-[16.4%] lg:min-w-0 lg:max-w-none",b.accentClass,b.textOnAccent)}>
                  {b.logo ? <img src={b.logo} alt={b.name} loading="lazy" decoding="async" className="max-h-16 w-auto max-w-full object-contain" /> :
                  <span className="display text-[clamp(2rem,3vw,3.3rem)] leading-none">{b.name}</span>}
                  <ArrowUpRight className="mt-4 size-5 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                </Link>
              );
            })}
          </div>
          <div className="mt-2 flex gap-1" aria-hidden="true">
            {brandsInOrder.map((key, i) => {
              const b = brands.find(item => item.key === key)!;
              return <div key={key} className="h-1 min-w-0 flex-1 bg-bone/20">
                <div className={cn("h-full w-full origin-left transition-transform duration-300",b.accentClass,i <= position ? "scale-x-100" : "scale-x-0")}/>
              </div>;
            })}
          </div>
        </div>
      </section>

      <section className="grid min-h-[75svh] lg:grid-cols-[1.15fr_.85fr]" aria-label="Our festivals">
        {festivals.map((f, i) => (
          <article key={f.slug} className={cn("relative isolate flex min-h-[70svh] flex-col justify-end overflow-hidden",i === 0 ? "bg-sos-deep" : "bg-camp-ink")}>
            <Media photo={f.hero} video={f.heroVideo} sizes="(min-width:1024px) 60vw, 100vw" className="absolute inset-0" />
            <div className="absolute inset-0 bg-night/55" />
            <div className="relative p-6 md:p-12">
              <span className={cn("display text-2xl",i===0?"text-sos-cyan":"text-camp")}>{f.dateSticker} 2026</span>
              <h2 className="display mt-3 text-[clamp(4rem,7.2vw,8.4rem)] leading-none">{f.name}</h2>
              <p className="mt-4 text-base text-bone/90">{f.venue}, {f.area}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <TicketLink f={f} className={i===0?"bg-sos-orange text-sos-deep":"bg-camp text-camp-ink"}>Get tickets</TicketLink>
                <Link to={i===0?"/festivals/sound-of-summer":"/festivals/campout"} className="inline-flex items-center gap-2 border-b border-bone py-2 font-semibold">Festival details <ArrowRight className="size-4" aria-hidden="true" /></Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-bone px-5 py-20 text-night md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <h2 className="display text-[clamp(3.8rem,8vw,8rem)]">Events we power</h2>
            <Link to="/events-we-power" className="inline-flex items-center gap-2 border-b border-night pb-1 font-semibold">See our work <ArrowRight className="size-5" aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-3 md:grid-cols-[1.25fr_1fr]">
            {poweredEvents.filter(item=>item.photo!==null).slice(0,3).map((e,i)=> (
              <Link key={e.name} to={e.to ?? "/events-we-power"} className={cn("group relative isolate block min-h-72 overflow-hidden bg-night text-bone",i===0?"md:min-h-[34rem]":"md:min-h-[34rem]")}>
                {e.photo && <Media photo={e.photo} sizes="(min-width:768px) 60vw, 100vw" className="absolute inset-0" />}
                <div className="absolute inset-0 bg-night/45"/>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-wide">Namib Rage festival</p>
                  <h3 className="display mt-2 text-5xl">{e.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-bone/20 px-5 py-14 md:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="display text-4xl md:text-6xl">Our partners</h2>
          {sponsors.some(item=>item.approved) ?
            <div className="flex flex-wrap items-center gap-8">
              {sponsors.filter(item=>item.approved).map(item => <img key={item.name} src={item.logo} alt={item.name} decoding="async" loading="lazy" className="h-12 max-w-40 object-contain grayscale" />)}
            </div> :
            <p className="max-w-md text-base text-bone/70">Partner logos appear here once approved.</p>}
          <Link to="/partners" className="inline-flex items-center gap-2 border-b border-bone pb-1 text-sm font-semibold">Partnerships <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  );
}
