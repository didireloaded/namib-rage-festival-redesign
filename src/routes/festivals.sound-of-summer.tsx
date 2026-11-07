import { createFileRoute, Link } from "@tanstack/react-router";
import { company, festivals, photos, sosLineup, sosStages } from "@/data/site";
import { Credit, Media } from "@/components/site/Media";
import { Sticker, TicketLink } from "@/components/site/Bits";
import { Gallery } from "@/components/site/Gallery";
import { FactRow, Faq, MobileTicketBar } from "@/components/site/FestivalBits";
import { seo } from "@/lib/seo";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";

const f = festivals[0];

export const Route = createFileRoute("/festivals/sound-of-summer")({
  head: () => seo("Sound of Summer 2026 — 28 Dec, Langstrand", "Sound of Summer 2026 at Tidal Pools & Jetty Beach, Langstrand. Headliner Shimza, three stages, 12:00–23:00, 18+."),
  component: Sos,
});

function Sos() {
  return (
    <>
      <section className="relative flex h-[calc(100svh-4rem)] min-h-[560px] flex-col justify-end overflow-hidden bg-sos-deep">
        <Media photo={f.hero} video={f.heroVideo} priority className="absolute inset-0" />
        <div className="absolute inset-0 bg-sos-deep/55" />
        <Credit photo={f.hero} className="absolute right-2 top-2" />
        <div className="relative p-5 md:p-10">
          <Sticker className="sos-gradient-badge">28 Dec 2026</Sticker>
          <Sticker className="ml-2 rotate-3 bg-sos-cyan text-sos-deep">18+</Sticker>
          <h1 className="hero-title-in display mt-4 text-[17vw] leading-[0.82] md:text-[11rem]">Sound of<br /><span className="sos-outline-title">Summer</span></h1>
          <p className="mt-3 text-lg">{f.venue}, {f.area} · {f.times}</p>
          <TicketLink f={f} className="mt-5 hidden bg-sos-orange text-sos-deep md:inline-flex">Get tickets on Howler</TicketLink>
        </div>
      </section>

      <div className="sos-facts"><FactRow items={[["Date", "28 Dec 2026"], ["Time", f.times], ["Where", "Langstrand"], ["Age", "18+ only"]]} /></div>

      <section data-reveal className="sos-editorial-section grid gap-10 px-5 py-20 md:grid-cols-2 md:px-10 xl:px-[max(2.5rem,calc((100vw-80rem)/2))]">
        <div id="lineup" className="scroll-mt-24">
          <p className="eyebrow text-sos-cyan">Lineup</p>
          {sosLineup.map((a) => (
            <div key={a.name}>
              <p className="display mt-3 text-8xl md:text-[10rem]">{a.name}</p>
              <p className="eyebrow">{a.billing}</p>
            </div>
          ))}
          <p className="mt-6 text-sm text-muted-foreground">More artists to be announced.</p>
        </div>
        <div id="stages" className="scroll-mt-24">
          <h2 className="display text-5xl text-sos-coral md:text-7xl">The stages</h2>
          <p className="mt-4 max-w-md text-base text-cream/80">Each stage has its own sound. Select one to explore its details and past summers.</p>
          <ul className="mt-7 space-y-5">
            {sosStages.map((stage, index) => (
              <li key={stage.name} className="border-b border-cream/25 pb-5">
                <Link to="/festivals/sound-of-summer/stages" search={{stage: ["savanna","coke-studio","jetty"][index]}} className="group flex items-end justify-between gap-3">
                  <span>
                    <span className="display block text-[clamp(2.8rem,5vw,5.5rem)] leading-none group-hover:text-sos-cyan">{stage.name}</span>
                    <span className="mt-2 block text-base text-cream/75">{stage.note === "Stage two" || stage.note === "Stage three" ? "Festival stage" : stage.note}</span>
                  </span>
                  <ArrowRight className="mb-1 size-6 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/festivals/sound-of-summer/stages" className="mt-7 inline-flex items-center gap-3 border-b border-cream pb-2 text-base font-semibold">Explore all stages <ArrowRight className="size-5" aria-hidden="true" /></Link>
        </div>
      </section>

      <section data-reveal id="gallery" className="sos-gallery-section scroll-mt-24 py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <h2 className="display mb-8 text-5xl md:text-7xl">From past summers</h2>
          <Gallery items={[photos.sosStage, photos.sosBeach, photos.sosCrowd]} />
        </div>
      </section>

      <section data-reveal className="sos-editorial-section grid gap-10 px-5 py-20 md:grid-cols-2 md:px-10 xl:px-[max(2.5rem,calc((100vw-80rem)/2))]">
        <div>
          <h2 id="getting-there" className="display scroll-mt-24 text-5xl md:text-7xl">Getting there</h2>
          <p className="mt-4 text-lg text-muted-foreground">Tidal Pools & Jetty Beach sit at Langstrand, between Walvis Bay and Swakopmund on the B2. Plan a designated driver or shared transport home.</p>
          <a href="https://www.google.com/maps/search/?api=1&query=Tidal%20Pools%20Jetty%20Beach%20Langstrand%20Namibia" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-sos-cyan pb-2 text-base font-semibold text-sos-cyan">
            <MapPin className="size-5" aria-hidden="true" /> View location on Google Maps <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
        <div>
          <h2 id="faq" className="display mb-4 scroll-mt-24 text-5xl md:text-7xl">FAQ & rules</h2>
          <Faq items={[
            { q: "Is it 18+?", a: "Yes. Valid ID is required at the gate." },
            { q: "What time does it run?", a: "12:00 to 23:00 on 28 December 2026 (approved operating hours)." },
            { q: "Where do I buy tickets?", a: "Only through the official Howler event page linked on this site." },
            { q: "Ticket problems?", a: <a className="underline" href={company.howlerHelp} target="_blank" rel="noopener noreferrer">Visit Howler Help <ExternalLink className="inline-block size-4" aria-hidden="true" /></a> },
          ]} />
        </div>
      </section>
      <MobileTicketBar f={f} />
    </>
  );
}
