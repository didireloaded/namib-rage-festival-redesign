import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { poweredEvents } from "@/data/site";
import { Gallery } from "@/components/site/Gallery";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events-we-power")({
  head: () => seo("Events we power", "Namib Rage festivals, Barbarian bar operations and Howler ticketing."),
  component: EventsWePower,
});

const filters = [
  { label: "All", value: "All" },
  { label: "Barbarian", value: "Bar operations" },
  { label: "Howler", value: "Ticketing" },
] as const;

function EventsWePower() {
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("All");
  const matching = poweredEvents.filter(e => filter === "All" || e.roles.includes(filter));
  const withPhotos = matching.filter((item) => item.photo !== null);
  const withoutPhotos = matching.filter((item) => item.photo === null);

  return (
    <div className="bg-night text-bone">
      <header className="mx-auto max-w-[1600px] px-5 pb-10 pt-16 md:px-12 md:pt-24">
        <h1 className="display max-w-5xl text-[clamp(5rem,11vw,12rem)]">Events we power</h1>
        <p className="mt-6 max-w-2xl text-xl text-bone/75">Our festivals and the events supported by our bar and ticketing teams.</p>
      </header>

      <nav aria-label="Filter events" className="mx-auto flex max-w-[1600px] flex-wrap gap-2 px-5 pb-10 md:px-12">
        {filters.map((item)=>(
          <button key={item.value} type="button" aria-pressed={filter===item.value} onClick={()=>setFilter(item.value)}
            className={cn("min-h-11 border px-6 py-2 text-sm font-semibold uppercase tracking-wider transition-colors",filter===item.value?"border-amber bg-amber text-night":"border-bone/40 text-bone hover:border-bone")}>{item.label}</button>
        ))}
      </nav>

      <section className="mx-auto max-w-[1600px] px-5 pb-20 md:px-12" aria-live="polite">
        {withPhotos.length>0 && (
          <Gallery key={filter}
            items={withPhotos.map(event=>event.photo!)}
            captions={withPhotos.map(event=>({
              title:event.name,
              role:filter === "Ticketing" ? "Howler ticketing" : event.roles.includes("Owned") ? "Namib Rage festival" : "Bar operations",
              to:event.to,
            }))}
          />
        )}
        {withoutPhotos.length>0 && (
          <div className="mt-16">
            <h2 className="display mb-6 text-3xl text-bone/70">Additional event credits</h2>
            <ul className="grid gap-x-12 md:grid-cols-2">
              {withoutPhotos.map(event=>(
                <li key={event.name} className="flex flex-wrap items-baseline justify-between gap-2 border-t border-bone/30 py-5">
                  <span className="display text-3xl md:text-5xl">{event.name}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-bone/60">{event.roles.includes("Bar operations")?"Barbarian bars":"Event service"}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {matching.length===0 && <p className="border-t border-bone/30 py-10 text-xl text-bone/70">No published event credits in this category yet.</p>}
        <p className="mt-12 max-w-2xl text-sm text-bone/60">Barbarian provides bar services at events managed by other organisers. These events are not presented as Namib Rage-owned festivals.</p>
      </section>
    </div>
  );
}
