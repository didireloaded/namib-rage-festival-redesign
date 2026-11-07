import { createFileRoute, Link } from "@tanstack/react-router";
import { festivals, photos } from "@/data/site";
import { Media } from "@/components/site/Media";
import { Sticker, TicketLink } from "@/components/site/Bits";
import { Gallery } from "@/components/site/Gallery";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/festivals/")({
  head: () => seo("Festivals 2026", "Sound of Summer on 28 Dec and Campout Dune Fest on 31 Dec 2026 — the two festivals Namib Rage owns."),
  component: Festivals,
});

function Festivals() {
  return (
    <>
      <header className="mx-auto max-w-7xl px-5 pt-10 md:px-10 md:pt-16">
        <p className="eyebrow text-muted-foreground">Owned by Namib Rage</p>
        <h1 className="display mt-3 text-7xl md:text-[10rem]">Festivals 2026</h1>
      </header>
      <div className="mt-8 grid gap-2 md:grid-cols-2">
        {festivals.map((f, i) => {
          const sos = f.brand === "sos";
          return (
            <article key={f.slug} className={cn("relative flex min-h-[78svh] flex-col justify-end overflow-hidden", sos ? "bg-sos" : "bg-camp-ink")}>
              <Media photo={f.hero} priority={i === 0} sizes="(min-width:768px) 50vw, 100vw" className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="relative p-6 md:p-10">
                <Sticker className={sos ? "bg-sos text-ink" : "bg-camp text-camp-ink"}>{f.dateSticker}</Sticker>
                <h2 className="display mt-4 text-6xl md:text-8xl">{f.name}</h2>
                <p className="mt-2 text-cream/85">{f.venue}, {f.area} · {f.age}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <TicketLink f={f}>Tickets</TicketLink>
                  <Link to={sos ? "/festivals/sound-of-summer" : "/festivals/campout"} className="display self-center text-lg underline underline-offset-4">Details →</Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <h2 className="display text-5xl md:text-7xl">Past editions</h2>
        <p className="mt-3 mb-8 text-muted-foreground">Sound of Summer and Namib Rage official gallery moments.</p>
        <Gallery items={[photos.sosCrowd, photos.sosStage, photos.sosBeach, photos.nrGallery1, photos.nrGallery2, photos.nrGallery3, photos.nrGallery4]} />
      </section>
    </>
  );
}
