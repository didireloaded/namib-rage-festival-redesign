import { createFileRoute } from "@tanstack/react-router";
import { campoutMedia, company, festivals } from "@/data/site";
import { Media } from "@/components/site/Media";
import { Sticker, TicketLink } from "@/components/site/Bits";
import { Gallery } from "@/components/site/Gallery";
import { FactRow, Faq, MobileTicketBar } from "@/components/site/FestivalBits";
import { seo } from "@/lib/seo";
import { ExternalLink, MapPin } from "lucide-react";

const f = festivals[1];

export const Route = createFileRoute("/festivals/campout")({
  head: () => seo("Campout Dune Fest 2026 — NYE in the dunes", "Campout Dune Fest, 31 Dec 2026 – 1 Jan 2027 at Seukelduine, Dorob National Park. Camping festival, 18+."),
  component: Campout,
});

function Campout() {
  return (
    <>
      <section className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden bg-camp-ink">
        <Media photo={f.hero} video={f.heroVideo} priority sizes="100vw" className="absolute inset-0" fit="cover" />
        <div className="absolute inset-0 bg-camp-ink/65" aria-hidden="true" />
        <div className="relative z-10 px-5 pb-12 pt-32 md:px-12 md:pb-20">
          <div><Sticker className="bg-camp text-camp-ink">31 Dec 2026</Sticker></div>
          <h1 className="hero-title-in display mt-6 max-w-6xl text-[clamp(5rem,11vw,12rem)] leading-[.88] text-camp">Campout<br /><span className="text-cream">Dune Fest</span></h1>
          <p className="mt-6 max-w-xl text-lg text-cream">{f.dateLong} · {f.venue}, {f.area} · 18+</p>
          <TicketLink f={f} className="mt-6 hidden self-start bg-camp text-camp-ink md:inline-flex">Get tickets on Howler</TicketLink>
        </div>
      </section>

      <FactRow items={[["Dates", "31 Dec – 1 Jan"], ["Gates", "From 12:00"], ["Where", "Seukelduine"], ["Age", "18+ only"]]} />
      <p className="mx-auto max-w-7xl px-5 pt-4 text-sm text-muted-foreground md:px-10">Final closing and music times will be announced ahead of the festival.</p>

      <section data-reveal id="camping" className="scroll-mt-24 bg-camp py-20 text-camp-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <h2 className="display text-5xl md:text-8xl">Camp like you care</h2>
          <ul className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-3">
            {[["Leave no trace", "Pack out everything you bring in."], ["Protect the park", "Dorob is a national park, stay on marked routes and areas."], ["Bring the basics", "Tent, water, sun protection and warm layers for the night."]].map(([t, d]) => (
              <li key={t}>
                <h3 className="display text-3xl md:text-5xl">{t}</h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {campoutMedia.length > 0 && (
        <section data-reveal className="mx-auto max-w-7xl px-5 py-20 md:px-10"><Gallery items={campoutMedia} /></section>
      )}

      <section data-reveal className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:px-10">
        <div>
          <h2 id="getting-there" className="display scroll-mt-24 text-5xl md:text-7xl">How to get there</h2>
          <p className="mt-4 text-lg text-muted-foreground">Seukelduine lies in Dorob National Park on the coast near Swakopmund. Follow official event access signs and the published ticket-holder directions.</p>
          <a href="https://www.google.com/maps/search/?api=1&query=Seukelduine%20Dorob%20National%20Park%20Namibia" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-camp pb-2 text-base font-semibold text-camp">
            <MapPin className="size-5" aria-hidden="true" /> View general area <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
        <div id="faq" className="scroll-mt-24"><h2 className="display mb-6 text-5xl md:text-7xl">FAQ</h2><Faq items={[
          { q: "Is camping included?", a: "Campout is a camping festival — check your Howler ticket type for details." },
          { q: "When do gates open?", a: "From 12:00 on 31 December 2026." },
          { q: "Age limit?", a: "18+ with valid ID." },
          { q: "Ticket help?", a: <a className="underline" href={company.howlerHelp} target="_blank" rel="noopener noreferrer">Visit Howler Help <ExternalLink className="inline-block size-4" aria-hidden="true" /></a> },
        ]} /></div>
      </section>
      <MobileTicketBar f={f} />
    </>
  );
}
