import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/data/site";
import { Wordmark } from "@/components/site/Bits";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/ticketing-cashless")({
  head: () => seo("Howler ticketing & cashless", "Online ticket sales, access control and cashless payments for organisers, with Howler."),
  component: Howler,
});

const pillars = [
  ["Online ticket sales", "Sell tickets online with a branded event page."],
  ["Access control", "Scan-in at the gate to keep entry moving."],
  ["Cashless payments", "Tap-to-pay on site for bars and vendors."],
];

function Howler() {
  return (
    <>
      <section className="bg-howler px-5 pb-14 pt-14 md:px-10 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Ticketing & cashless partner</p>
          <Wordmark k="howler" className="mt-3 block text-[22vw] md:text-[14rem]" />
          <p className="max-w-md text-lg">Howler runs ticketing and cashless for Namib Rage festivals and organisers.</p>
        </div>
      </section>
      <section data-reveal id="services" className="grid scroll-mt-24 md:grid-cols-3">
        {pillars.map(([t, d]) => (
          <div key={t} className="border-b border-border p-6 md:border-r md:p-10">
            <h2 className="display mt-4 text-4xl md:text-5xl">{t}</h2>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <section data-reveal className="grid md:grid-cols-2">
        <div id="ticket-help" className="scroll-mt-24 bg-cream p-6 text-ink md:p-12">
          <p className="eyebrow">Attending an event?</p>
          <h2 className="display mt-3 text-5xl md:text-6xl">Ticket help</h2>
          <p className="mt-3">Lost tickets, refunds and cashless top-ups are handled by Howler support.</p>
          <a href={company.howlerHelp} target="_blank" rel="noopener noreferrer" className="display mt-6 inline-block bg-howler px-5 py-3 text-xl text-cream">Howler Help ↗</a>
        </div>
        <div id="enquire" className="p-6 md:p-12">
          <p className="eyebrow">Organisers</p>
          <h2 className="display mb-8 mt-3 text-5xl md:text-6xl">Ticket your event</h2>
          <EnquiryForm topic="Ticketing & cashless" accent="bg-howler" options={["Ticketing", "Access control", "Cashless", "All three"]} />
        </div>
      </section>
    </>
  );
}
