import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { poweredEvents } from "@/data/site";
import { Media } from "@/components/site/Media";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/events-we-power_/$slug")({
  head: () => seo("Event operations | Namib Rage", "Explore event operations supported by Barbarian Bar Management."),
  component: EventDetail,
});

function EventDetail() {
  const { slug } = Route.useParams();
  const event = poweredEvents.find(item => item.to === "/events-we-power/" + slug && item.roles.includes("Bar operations"));

  if (!event) return (
    <div className="flex min-h-[75svh] flex-col items-start justify-center bg-night px-5 py-20 text-bone md:px-12">
      <h1 className="display text-6xl">Event not found</h1>
      <Link to="/events-we-power" className="mt-7 inline-flex items-center gap-2 border-b border-bone pb-2">Explore events <ArrowLeft className="size-5" aria-hidden="true"/></Link>
    </div>
  );

  return (
    <div className="bg-night text-bone">
      <section className="mx-auto flex min-h-[64svh] max-w-[1600px] flex-col justify-between px-5 pb-20 pt-14 md:px-12 md:pt-24">
        <Link to="/events-we-power" className="inline-flex items-center gap-2 self-start border-b border-bone/40 pb-2 text-sm font-semibold"><ArrowLeft className="size-4" aria-hidden="true"/> All events</Link>
        <div className="mt-20">
          <p className="mb-6 text-sm font-bold uppercase tracking-widest text-barb-orange">Bar operations by Barbarian</p>
          <h1 className="display max-w-6xl text-[clamp(4.5rem,11vw,11rem)] leading-[.94]">{event.name}</h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-bone/75">Barbarian Bar Management supported this event with bar services. The event is run by its own organisers.</p>
        </div>
      </section>
      {event.photo && (
        <section className="mx-auto max-w-[1600px] px-5 pb-16 md:px-12" aria-label="Event photographs">
          <div className="relative aspect-[16/9] overflow-hidden"><Media photo={event.photo} sizes="100vw"/></div>
        </section>
      )}
      <section className="bg-barb px-5 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="display text-[clamp(3.2rem,7vw,7rem)]">Need bars for your event?</h2>
          <Link to="/services/bar-management" hash="enquire" className="mt-8 inline-flex min-h-12 items-center gap-3 border border-bone px-6 py-3 text-base font-bold">Enquire with Barbarian <ArrowUpRight className="size-5" aria-hidden="true"/></Link>
        </div>
      </section>
    </div>
  );
}
