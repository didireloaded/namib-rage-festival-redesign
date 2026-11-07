import { createFileRoute, Link } from "@tanstack/react-router";
import { poweredEvents } from "@/data/site";
import { Wordmark } from "@/components/site/Bits";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/bar-management")({
  head: () => seo("Barbarian Bar Management", "Full-service event bars: bar build and planning, trained teams, service operations, stock and point of sale."),
  component: Barbarian,
});

const services = [
  ["Bar build & planning", "Layout, flow and builds sized to your crowd."],
  ["Trained teams", "Bar staff briefed for high-volume festival service."],
  ["Service operations", "Running the bars from doors to last call."],
  ["Stock, POS & inventory", "Ordering, point-of-sale and stock control."],
] as const;

function Barbarian() {
  const events = poweredEvents.filter(event => event.roles.includes("Bar operations"));
  return (
    <div className="bg-night text-bone">
      <section className="flex min-h-[70svh] flex-col justify-end bg-barb px-5 pb-12 pt-24 md:px-12 md:pb-20">
        <p className="text-sm font-semibold uppercase tracking-[.15em]">Bar management</p>
        <h1 className="display mt-5 text-[clamp(5.5rem,15vw,15rem)]"><Wordmark k="barb" /></h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-8 border-t border-bone/40 pt-5">
          <p className="max-w-2xl text-xl leading-snug md:text-3xl">Full-service event bars, planned, staffed and operated end to end.</p>
          <a href="#enquire" className="display inline-flex min-h-12 items-center bg-barb-orange px-7 py-3 text-xl text-night">Enquire about your event</a>
        </div>
      </section>

      <section id="services" className="scroll-mt-24" aria-label="Bar management services">
        {services.map(([title, description], index) => (
          <article key={title} className={index % 2 === 0 ? "bg-night" : "bg-barb"}>
            <div className="mx-auto grid min-h-[38svh] max-w-[1600px] items-center gap-6 px-5 py-12 md:grid-cols-12 md:gap-12 md:px-12 md:py-20">
              <h2 className={"display text-[clamp(3.5rem,7.2vw,8rem)] leading-[.93] md:col-span-7 "+(index%2 ? "md:order-2":"")}>{title}</h2>
              <p className={"max-w-md border-t border-bone/40 pt-5 text-xl leading-relaxed md:col-span-5 md:text-2xl "+(index%2?"md:order-1":"")}>{description}</p>
            </div>
          </article>
        ))}
      </section>

      <section id="events" className="scroll-mt-24 bg-barb-orange px-5 py-16 text-night md:px-12 md:py-24">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="display text-[clamp(3.5rem,8vw,9rem)]">Events we serve</h2>
          <p className="mt-4 max-w-xl text-base">Bar operations at events organised by our clients and partners.</p>
          <ul className="mt-12 grid gap-x-10 md:grid-cols-2">
            {events.map(event => (
              <li key={event.name} className="border-t border-night/50 py-5">
                <span className="display text-[clamp(2.2rem,4.3vw,5rem)]">{event.name}</span>
              </li>
            ))}
          </ul>
          <Link to="/events-we-power" className="mt-8 inline-block border-b border-night pb-1 text-base font-bold">Explore our event portfolio</Link>
        </div>
      </section>

      <section id="enquire" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-20 md:px-10 md:py-28">
        <h2 className="display mb-10 text-5xl md:text-8xl">Plan your bar</h2>
        <EnquiryForm topic="Bar management" accent="bg-barb" options={["Festival bar", "Corporate event", "Private event", "Other"]}/>
      </section>
    </div>
  );
}
