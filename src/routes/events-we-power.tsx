import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { poweredEvents } from "@/data/site";
import { Media } from "@/components/site/Media";
import { Chip, PageHead } from "@/components/site/Bits";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events-we-power")({
  head: () => seo("Events we power", "Festivals Namib Rage owns and events where Barbarian operated the bars."),
  component: Power,
});

const tabs = ["All", "Owned", "Bar operations", "Ticketing"] as const;

function Power() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const list = poweredEvents.filter((e) => tab === "All" || e.roles.includes(tab));
  return (
    <>
      <PageHead eyebrow="Credits, labelled precisely" title="Events we power" />
      <div role="tablist" aria-label="Filter events" className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 md:px-10">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={cn("display px-4 py-2 text-lg transition-colors", tab === t ? "bg-camp text-ink" : "border border-border hover:border-cream")}>
            {t}
          </button>
        ))}
      </div>
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-10">
        {list.length === 0 ? (
          <p className="border-l-4 border-howler py-6 pl-4 text-muted-foreground">No ticketing credits are published yet. They appear once confirmed.</p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((e) => {
              const inner = (
                <>
                  {e.photo ? <Media photo={e.photo} sizes="(min-width:1024px) 33vw, 50vw" className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" /> : <span className="display absolute -right-4 top-2 text-[9rem] leading-none text-barb-orange/25">BAR</span>}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 to-transparent p-4">
                    <div className="flex flex-wrap gap-1">
                      {e.roles.map((r) => <Chip key={r} k={r === "Owned" ? "nr" : "barb"} label={r === "Owned" ? "Owned festival" : "Barbarian · Bar operations"} />)}
                    </div>
                    <p className="display mt-2 text-4xl">{e.name}</p>
                  </div>
                </>
              );
              const cls = cn("group relative block aspect-[4/5] overflow-hidden", e.photo ? "bg-secondary" : "bg-barb");
              return <li key={e.name}>{e.to ? <Link to={e.to} className={cls}>{inner}</Link> : <div className={cls}>{inner}</div>}</li>;
            })}
          </ul>
        )}
        <p className="mt-6 text-xs text-muted-foreground">Bar-operations events are organised by others; Barbarian provided bar services only.</p>
      </section>
    </>
  );
}
