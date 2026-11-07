import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { brands, festivals, photos, poweredEvents } from "@/data/site";
import { Credit, Media } from "@/components/site/Media";
import { CtaLink, Wordmark } from "@/components/site/Bits";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/namib-rage")({
  head: () => ({
    meta: [
      { title: "Namib Rage Events | Our Festivals & Event Services" },
      { name: "description", content: "Explore Sound of Summer, Campout Dune Fest and the event services powered by Namib Rage." },
      { property: "og:title", content: "Namib Rage Events" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

const [soundOfSummer, campout] = festivals;

/** Scroll-progress reveal without hijacking native scroll or adding a motion library. */
function useStoryScroll() {
  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll<HTMLElement>(".nr-story"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const update = () => {
      raf = 0;
      for (const scene of scenes) {
        const title = scene.querySelector<HTMLElement>(".nr-story-title");
        if (!title) continue;
        if (reducedMotion.matches) {
          title.style.opacity = "1";
          title.style.transform = "none";
          continue;
        }
        const rect = scene.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (64 - rect.top) / Math.max(180, window.innerHeight * .44)));
        title.style.opacity = String(progress);
        title.style.transform = "translate3d(0," + Math.round((1-progress)*52) + "px,0)";
      }
    };
    const schedule = () => { if (!raf) raf = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    reducedMotion.addEventListener("change", schedule);
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      window.cancelAnimationFrame(raf);
      scenes.forEach(scene => {
        const title=scene.querySelector<HTMLElement>(".nr-story-title");
        title?.style.removeProperty("opacity");
        title?.style.removeProperty("transform");
      });
    };
  }, []);
}

function StoryScene({ type, index }: { type: "sos" | "camp"; index: number }) {
  const isSummer = type === "sos";
  const festival = isSummer ? soundOfSummer : campout;
  // The Campout visual is genuine 2026 festival artwork until a cleared desert photo is supplied.
  const photo = isSummer ? photos.sosBeach : photos.campArt;
  const url = isSummer ? "/festivals/sound-of-summer" : "/festivals/campout";

  return (
    <section className={cn("nr-story relative h-[155svh]", isSummer ? "bg-sos-deep" : "bg-camp-ink")} aria-label={festival.name}>
      <div className="sticky top-16 h-[calc(100svh-4rem)] min-h-[500px] overflow-hidden">
        <Media photo={photo} priority={index===0} sizes="100vw" className="absolute inset-0" fit="cover"/>
        <div className={cn("absolute inset-0", isSummer ? "bg-sos-deep/45" : "bg-camp-ink/40")} aria-hidden="true" />
        <Link to={url} aria-label={"Explore " + festival.name} className="group absolute inset-0 z-10 flex flex-col items-start justify-end px-5 pb-16 pt-20 text-cream outline-offset-[-5px] sm:pb-20 md:px-12 md:pb-24">
          <div className="nr-story-title max-w-[95vw]">
            <p className={cn("mb-5 text-sm font-bold uppercase tracking-widest",isSummer?"text-sos-cyan":"text-camp")}>{isSummer?"Beach festival":"New Year's Eve in the dunes"}</p>
            <h1 className={cn("display max-w-5xl text-[clamp(4.7rem,12vw,12rem)] leading-[.88]",isSummer?"text-cream":"text-camp")}>
              {isSummer ? <Wordmark k="sos" /> : (
                <img src="/brands/dune-fest-2026.png" alt="Campout Dune Fest" className="block h-auto max-h-[min(50vh,470px)] w-auto max-w-[min(85vw,640px)] object-contain" loading="lazy" decoding="async" />
              )}
            </h1>
            <span className="mt-7 inline-flex items-center gap-3 border-b border-cream pb-2 text-lg font-semibold">Discover the festival <ArrowUpRight className="size-5" aria-hidden="true" /></span>
          </div>
        </Link>
        {isSummer && (
          <a href="#campout-story" className="absolute bottom-5 right-5 z-20 inline-flex items-center gap-2 text-sm font-semibold text-cream md:bottom-9 md:right-12">
            Scroll to explore <ArrowDown className="size-5" aria-hidden="true" />
          </a>
        )}
      </div>
      {!isSummer && <span id="campout-story" className="absolute top-0" aria-hidden="true" />}
    </section>
  );
}

function Home() {
  useStoryScroll();
  return (
    <div className="bg-night text-bone">
      <StoryScene type="sos" index={0} />
      <StoryScene type="camp" index={1} />

      <section id="ecosystem" className="bg-night" aria-label="Namib Rage brands">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((b) => (
            <Link key={b.key} to={b.to} className={cn("group flex min-h-36 flex-col justify-between p-5 transition-colors hover:brightness-110",b.accentClass,b.textOnAccent)}>
              <Wordmark k={b.key} className="text-2xl md:text-3xl"/>
              <ArrowUpRight className="size-5" aria-hidden="true"/>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-24 md:px-12 md:py-32" aria-label="Services that power events">
        <p className="text-sm font-bold uppercase tracking-widest text-bone/70">Behind the stage</p>
        <h2 className="display mb-14 mt-4 text-[clamp(3.4rem,8vw,8.5rem)]">Services that run events</h2>
        <div className="space-y-1">
          {([
            ["barb","Full-service event bars"],
            ["howler","Ticketing, access control and cashless"],
            ["ft","Visas, permits and artist logistics"],
          ] as const).map(([key,description])=>{
            const b=brands.find(item=>item.key===key)!;
            return <Link key={key} to={b.to} className="group flex min-h-32 flex-wrap items-end justify-between gap-5 border-t border-bone/30 py-6">
              <div>
                <Wordmark k={key} className="text-[clamp(3rem,7vw,7rem)]"/>
                <p className="mt-3 text-base text-bone/65">{description}</p>
              </div>
              <ArrowRight className="size-7 transition-transform group-hover:translate-x-1" aria-hidden="true"/>
            </Link>;
          })}
        </div>
      </section>

      <section className="bg-bone px-5 py-24 text-night md:px-12" aria-label="Events we power">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-[clamp(3.4rem,8vw,8rem)]">Events we power</h2>
            <Link to="/events-we-power" className="inline-flex items-center gap-2 border-b border-night pb-1 font-semibold">See all events <ArrowRight className="size-5" aria-hidden="true"/></Link>
          </div>
          <div className="grid gap-x-10 md:grid-cols-2">
            {poweredEvents.map(event=>(
              <Link key={event.name} to={event.to ?? "/events-we-power"} className="group flex min-h-28 items-center justify-between gap-5 border-t border-night/25 py-5">
                <div>
                  <p className="display text-[clamp(2.2rem,4.4vw,4.8rem)] leading-none">{event.name}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest text-night/60">{event.roles.includes("Owned")?"Festival we own":"Barbarian bar operations"}</p>
                </div>
                <ArrowUpRight className="size-6 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-12 md:py-28">
        <h2 className="display text-5xl md:text-8xl">Partnerships</h2>
        <p className="mt-5 max-w-xl text-lg text-bone/70">Bring your brand into the experiences we create.</p>
        <CtaLink to="/partners">Explore partnerships</CtaLink>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[380px] overflow-hidden">
          <Media photo={photos.nrGallery1} sizes="(min-width:768px) 50vw,100vw" />
          <div className="absolute inset-0 flex flex-col justify-end gap-5 bg-night/55 p-6 md:p-12">
            <h2 className="display text-5xl md:text-7xl">Partner with us</h2>
            <div><CtaLink to="/partners">Partnerships</CtaLink></div>
          </div>
          <Credit photo={photos.nrGallery1}/>
        </div>
        <div className="flex min-h-[380px] flex-col justify-end gap-5 bg-nr p-6 md:p-12">
          <h2 className="display text-5xl md:text-7xl">Join the crew</h2>
          <p className="max-w-md text-lg">Bar staff, ticketing crew and vendors.</p>
          <div><CtaLink to="/work-with-us" variant="outline">Work with us</CtaLink></div>
        </div>
      </section>
    </div>
  );
}
