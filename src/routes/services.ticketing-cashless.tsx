import { createFileRoute } from "@tanstack/react-router";
import { company, howlerFlowMedia } from "@/data/site";
import { Media } from "@/components/site/Media";
import { Wordmark } from "@/components/site/Bits";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/ticketing-cashless")({
  head: () => seo("Howler ticketing & cashless", "Online ticket sales, access control and cashless payments for event organisers."),
  component: Howler,
});

const steps = [
  ["Online ticket sales", "Sell tickets online with a branded event page."],
  ["Access control", "Scan-in at the gate to keep entry moving."],
  ["Cashless payments", "Tap-to-pay on site for bars and vendors."],
] as const;

function Howler() {
  return (
    <div className="bg-night text-bone">
      <section className="bg-howler px-5 pb-16 pt-20 md:px-12 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-[1600px]">
          <p className="text-sm font-semibold uppercase tracking-[.16em]">Ticketing & cashless</p>
          <h1 className="display mt-6 text-[clamp(6rem,18vw,17rem)]"><Wordmark k="howler" /></h1>
          <p className="mt-6 max-w-xl text-2xl leading-snug">Tickets sold. Guests checked in. Payments moving.</p>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-[1600px] scroll-mt-24 px-5 py-20 md:px-12 md:py-28">
        <h2 className="display mb-12 max-w-4xl text-[clamp(3.5rem,8vw,8.5rem)]">One connected event experience</h2>
        <ol className="relative grid gap-12 border-t border-howler pt-8 md:grid-cols-[.95fr_1.1fr_.95fr] md:gap-8">
          {steps.map(([heading, summary], i) => (
            <li key={heading} className="relative">
              <span className="display text-[clamp(4rem,7vw,8rem)] leading-none text-howler">{String(i+1).padStart(2,"0")}</span>
              {howlerFlowMedia[i] && (
                <div className="mt-5 aspect-[4/3] overflow-hidden">
                  <Media photo={howlerFlowMedia[i]} sizes="(min-width:768px) 33vw, 100vw" />
                </div>
              )}
              <h3 className="display mt-7 text-3xl md:text-[clamp(2.6rem,4vw,4.8rem)]">{heading}</h3>
              <p className="mt-3 max-w-xs text-lg text-bone/75">{summary}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid md:grid-cols-2">
        <div id="ticket-help" className="scroll-mt-24 bg-bone p-6 text-night md:p-12">
          <p className="text-sm font-bold uppercase tracking-wide">Event attendees</p>
          <h2 className="display mt-5 text-6xl">Ticket help</h2>
          <p className="mt-5 max-w-lg text-lg">Lost tickets, refunds and cashless top-ups are handled by Howler support.</p>
          <a href={company.howlerHelp} target="_blank" rel="noopener noreferrer" className="display mt-8 inline-flex min-h-12 items-center bg-howler px-6 py-3 text-xl text-bone">Howler support</a>
        </div>
        <div id="enquire" className="scroll-mt-24 bg-night p-6 md:p-12">
          <p className="text-sm font-bold uppercase tracking-wide text-howler">Event organisers</p>
          <h2 className="display mb-9 mt-5 text-6xl">Ticket your event</h2>
          <EnquiryForm topic="Ticketing & cashless" accent="bg-howler" options={["Ticketing", "Access control", "Cashless", "All three"]}/>
        </div>
      </section>
    </div>
  );
}
