import { createFileRoute } from "@tanstack/react-router";
import { company, festivals, photos, sosLineup, sosStages } from "@/data/site";
import { Credit, Media } from "@/components/site/Media";
import { Sticker, TicketLink } from "@/components/site/Bits";
import { Gallery } from "@/components/site/Gallery";
import { FactRow, Faq, MobileTicketBar } from "@/components/site/FestivalBits";
import { seo } from "@/lib/seo";

const f = festivals[0];

export const Route = createFileRoute("/festivals/sound-of-summer")({
  head: () => seo("Sound of Summer 2026 — 28 Dec, Langstrand", "Sound of Summer 2026 at Tidal Pools & Jetty Beach, Langstrand. Headliner Shimza, three stages, 12:00–23:00, 18+."),
  component: Sos,
});

function Sos() {
  return (
    <>
      <section className="relative flex h-[calc(100svh-4rem)] min-h-[560px] flex-col justify-end overflow-hidden bg-sos">
        <Media photo={f.hero} video={f.heroVideo} priority className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <Credit photo={f.hero} className="absolute right-2 top-2" />
        <div className="relative p-5 md:p-10">
          <Sticker className="bg-sos text-ink">28 Dec 2026</Sticker>
          <Sticker className="ml-2 rotate-3 bg-sos-cyan text-ink">18+</Sticker>
          <h1 className="display mt-4 text-[17vw] leading-[0.82] md:text-[11rem]">Sound of<br /><span className="text-sos">Summer</span></h1>
          <p className="mt-3 text-lg">{f.venue}, {f.area} · {f.times}</p>
          <TicketLink f={f} className="mt-5 hidden md:inline-flex">Get tickets on Howler</TicketLink>
        </div>
      </section>

      <FactRow items={[["Date", "28 Dec 2026"], ["Time", f.times], ["Where", "Langstrand"], ["Age", "18+ only"]]} />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:px-10">
        <div id="lineup" className="scroll-mt-24">
          <p className="eyebrow text-sos">Lineup</p>
          {sosLineup.map((a) => (
            <div key={a.name}>
              <p className="display mt-3 text-8xl md:text-[10rem]">{a.name}</p>
              <p className="eyebrow">{a.billing}</p>
            </div>
          ))}
          <p className="mt-6 text-sm text-muted-foreground">More artists announced once approved.</p>
        </div>
        <div id="stages" className="scroll-mt-24">
          <h2 className="display text-5xl text-sos-cyan md:text-7xl">The stages</h2>
          <ul className="mt-7 space-y-5">
            {sosStages.map((s) => (
              <li key={s.name} className="group border-b border-cream/25 pb-5">
                <p className="display text-[clamp(2.8rem,6vw,5.5rem)] leading-none transition-colors group-hover:text-sos">{s.name}</p>
                <p className="mt-2 text-base text-cream/75">{s.note === "Stage two" || s.note === "Stage three" ? "Festival stage" : s.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="gallery" className="scroll-mt-24 bg-sos py-16 text-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <h2 className="display mb-8 text-5xl md:text-7xl">From past summers</h2>
          <Gallery items={[photos.sosStage, photos.sosBeach, photos.sosCrowd, photos.nrGallery2, photos.nrGallery4]} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:px-10">
        <div>
          <h2 id="getting-there" className="display scroll-mt-24 text-5xl md:text-7xl">Getting there</h2>
          <p className="mt-4 text-lg text-muted-foreground">Tidal Pools & Jetty Beach sit at Langstrand, between Walvis Bay and Swakopmund on the B2. Plan a designated driver or shared transport home.</p>
        </div>
        <div>
          <h2 id="faq" className="display mb-4 scroll-mt-24 text-5xl md:text-7xl">FAQ & rules</h2>
          <Faq items={[
            { q: "Is it 18+?", a: "Yes. Valid ID is required at the gate." },
            { q: "What time does it run?", a: "12:00 to 23:00 on 28 December 2026 (approved operating hours)." },
            { q: "Where do I buy tickets?", a: "Only through the official Howler event page linked on this site." },
            { q: "Ticket problems?", a: <a className="underline" href={company.howlerHelp} target="_blank" rel="noopener noreferrer">Visit Howler Help ↗</a> },
          ]} />
        </div>
      </section>
      <MobileTicketBar f={f} />
    </>
  );
}
