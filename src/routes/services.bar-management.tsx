import { createFileRoute } from "@tanstack/react-router";
import { poweredEvents } from "@/data/site";
import { Chip, Wordmark } from "@/components/site/Bits";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seo } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/bar-management")({
  head: () => seo("Barbarian Bar Management", "Full-service event bars: bar build and planning, trained teams, service operations, stock and point of sale."),
  component: Barb,
});

const pillars = [
  ["Bar build & planning", "Layout, flow and builds sized to your crowd."],
  ["Trained teams", "Bar staff briefed for high-volume festival service."],
  ["Service operations", "Running the bars from doors to last call."],
  ["Stock, POS & inventory", "Ordering, point-of-sale and stock control."],
];

function Barb() {
  const bars = poweredEvents.filter((e) => e.roles.includes("Bar operations"));
  return (
    <>
      <section className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden bg-barb">

        <div className="relative p-5 md:p-10">
          <p className="eyebrow text-barb-orange">Service division · Bar management</p>
          <Wordmark k="barb" className="mt-3 block text-[18vw] md:text-[11rem]" />
          <p className="mt-3 max-w-md text-lg">Full-service event bars, planned, staffed and run end to end.</p>
          <a href="#enquire" className="display mt-6 inline-block bg-barb-orange px-5 py-3 text-xl text-ink">Enquire <ArrowRight className="inline-block size-5" aria-hidden="true" /></a>
        </div>
      </section>
      <section data-reveal id="services" className="mx-auto grid max-w-7xl scroll-mt-24 gap-x-12 gap-y-8 px-5 py-16 md:grid-cols-2 md:px-10">
        {pillars.map(([t, d]) => (
          <div key={t} className="border-t border-barb-orange/60 pt-5">
            <h2 className="display text-3xl md:text-5xl">{t}</h2>
            <p className="mt-3 max-w-md text-lg text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <section data-reveal id="events" className="scroll-mt-24 bg-barb-orange py-16 text-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="eyebrow">Events powered · bars operated by Barbarian</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {bars.map((e) => <li key={e.name} className="display text-4xl md:text-7xl">{e.name}</li>)}
          </ul>
          <div className="mt-6"><Chip k="barb" label="Bar operations only — not organised by Namib Rage" /></div>
        </div>
      </section>
      <section data-reveal id="enquire" className="mx-auto max-w-4xl px-5 py-20 md:px-10">
        <h2 className="display mb-10 text-5xl md:text-7xl">Bar enquiry</h2>
        <EnquiryForm topic="Bar management" accent="bg-barb" options={["Festival bar", "Corporate event", "Private event", "Other"]} />
      </section>
    </>
  );
}
