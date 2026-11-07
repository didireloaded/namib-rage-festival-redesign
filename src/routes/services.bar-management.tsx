import { createFileRoute } from "@tanstack/react-router";
import { photos, poweredEvents } from "@/data/site";
import { Credit, Media } from "@/components/site/Media";
import { Chip, Wordmark } from "@/components/site/Bits";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seo } from "@/lib/seo";

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
        <Media photo={photos.nrGallery4} priority className="absolute inset-0 opacity-50 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-barb via-barb/40 to-transparent" />
        <Credit photo={{ ...photos.nrGallery4, context: "Event bar operations · atmosphere" }} className="absolute right-2 top-2" />
        <div className="relative p-5 md:p-10">
          <p className="eyebrow text-barb-orange">Service division · Bar management</p>
          <Wordmark k="barb" className="mt-3 block text-[18vw] md:text-[11rem]" />
          <p className="mt-3 max-w-md text-lg">Full-service event bars, planned, staffed and run end to end.</p>
          <a href="#enquire" className="display mt-6 inline-block bg-barb-orange px-5 py-3 text-xl text-ink">Enquire →</a>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-4">
        {pillars.map(([t, d], i) => (
          <div key={t} className="bg-background p-6 md:p-8">
            <span className="display text-5xl text-barb-orange">0{i + 1}</span>
            <h2 className="display mt-4 text-3xl">{t}</h2>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <section className="bg-barb-orange py-16 text-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="eyebrow">Events powered · bars operated by Barbarian</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {bars.map((e) => <li key={e.name} className="display text-4xl md:text-7xl">{e.name}</li>)}
          </ul>
          <div className="mt-6"><Chip k="barb" label="Bar operations only — not organised by Namib Rage" /></div>
        </div>
      </section>
      <section id="enquire" className="mx-auto max-w-4xl px-5 py-20 md:px-10">
        <h2 className="display mb-10 text-5xl md:text-7xl">Bar enquiry</h2>
        <EnquiryForm topic="Bar management" accent="bg-barb" options={["Festival bar", "Corporate event", "Private event", "Other"]} />
      </section>
    </>
  );
}
