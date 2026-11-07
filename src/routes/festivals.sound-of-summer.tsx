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
        <div>
          <p className="eyebrow text-sos">Lineup</p>
          {sosLineup.map((a) => (
            <div key={a.name}>
              <p className="display mt-3 text-8xl md:text-[10rem]">{a.name}</p>
              <p className="eyebrow">{a.billing}</p>
            </div>
          ))}
          <p className="mt-6 text-sm text-muted-foreground">More artists announced once approved.</p>
        </div>
        <div>
          <p className="eyebrow text-sos-cyan">Three stages</p>
          <ol className="mt-3">
            {sosStages.map((s, i) => (
              <li key={s.name} className="flex items-baseline gap-4 border-b border-border py-4">
                <span className="display text-2xl text-sos">0{i + 1}</span>
                <span className="display text-5xl md:text-6xl">{s.name}</span>
                <span className="eyebrow ml-auto text-muted-foreground">{s.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sos py-16 text-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <h2 className="display mb-8 text-5xl md:text-7xl">From past summers</h2>
          <Gallery items={[photos.sosStage, photos.sosBeach, photos.sosCrowd, photos.nrGallery2, photos.nrGallery4]} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:px-10">
        <div>
          <h2 className="display text-5xl md:text-7xl">Getting there</h2>
          <p className="mt-4 text-lg text-muted-foreground">Tidal Pools & Jetty Beach sit at Langstrand, between Walvis Bay and Swakopmund on the B2. Plan a designated driver or shared transport home.</p>
        </div>
        <div>
          <h2 className="display mb-4 text-5xl md:text-7xl">FAQ & rules</h2>
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
