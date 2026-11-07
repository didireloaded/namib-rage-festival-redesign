import { createFileRoute } from "@tanstack/react-router";
import { campoutMedia, company, festivals } from "@/data/site";
import { Media } from "@/components/site/Media";
import { Sticker, TicketLink } from "@/components/site/Bits";
import { Gallery } from "@/components/site/Gallery";
import { FactRow, Faq, MobileTicketBar } from "@/components/site/FestivalBits";
import { seo } from "@/lib/seo";

const f = festivals[1];

export const Route = createFileRoute("/festivals/campout")({
  head: () => seo("Campout Dune Fest 2026 — NYE in the dunes", "Campout Dune Fest, 31 Dec 2026 – 1 Jan 2027 at Seukelduine, Dorob National Park. Camping festival, 18+."),
  component: Campout,
});

function Campout() {
  return (
    <>
      <section className="grid bg-camp-ink md:grid-cols-2">
        <div className="relative aspect-square md:aspect-auto md:min-h-[calc(100svh-4rem)]">
          <Media photo={f.hero} video={f.heroVideo} priority sizes="(min-width:768px) 50vw, 100vw" fit="contain" />
        </div>
        <div className="flex flex-col justify-center p-5 md:p-12">
          <div><Sticker className="bg-camp text-camp-ink">31 Dec 2026</Sticker></div>
          <h1 className="display mt-4 text-[16vw] leading-[0.82] text-camp md:text-[8rem]">Campout<br /><span className="text-cream">Dune Fest</span></h1>
          <p className="mt-3 text-lg">{f.dateLong} · {f.venue}, {f.area} · 18+</p>
          <TicketLink f={f} className="mt-6 hidden self-start md:inline-flex">Get tickets on Howler</TicketLink>
        </div>
      </section>

      <FactRow items={[["Dates", "31 Dec – 1 Jan"], ["Gates", "From 12:00"], ["Where", "Seukelduine"], ["Age", "18+ only"]]} />
      <p className="mx-auto max-w-7xl px-5 pt-4 text-sm text-muted-foreground md:px-10">Closing and music times are pending approval.</p>

      <section className="bg-camp py-20 text-camp-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <h2 className="display text-5xl md:text-8xl">Camp like you care</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {[["Leave no trace", "Pack out everything you bring in."], ["Protect the park", "Dorob is a national park, stay on marked routes and areas."], ["Bring the basics", "Tent, water, sun protection and warm layers for the night."]].map(([t, d], i) => (
              <li key={t}>
                <span className="display text-6xl">0{i + 1}</span>
                <p className="display mt-2 text-3xl">{t}</p>
                <p className="mt-2">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {campoutMedia.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10"><Gallery items={campoutMedia} /></section>
      )}

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:px-10">
        <div>
          <h2 className="display text-5xl md:text-7xl">How to get there</h2>
          <p className="mt-4 text-lg text-muted-foreground">Seukelduine lies in Dorob National Park on the coast near Swakopmund. Exact access route and parking details will be shared with ticket holders.</p>
        </div>
        <Faq items={[
          { q: "Is camping included?", a: "Campout is a camping festival — check your Howler ticket type for details." },
          { q: "When do gates open?", a: "From 12:00 on 31 December 2026." },
          { q: "Age limit?", a: "18+ with valid ID." },
          { q: "Ticket help?", a: <a className="underline" href={company.howlerHelp} target="_blank" rel="noopener noreferrer">Visit Howler Help ↗</a> },
        ]} />
      </section>
      <MobileTicketBar f={f} />
    </>
  );
}
