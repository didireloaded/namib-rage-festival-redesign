import { createFileRoute } from "@tanstack/react-router";
import { fastTrackServices } from "@/data/site";
import { Wordmark } from "@/components/site/Bits";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/fast-track")({
  head: () => seo("Fast Track — permits, licences & bookings", "Visa services, work permits, liquor and noise permits, NASCAM licences, flights and artist bookings for events."),
  component: FT,
});

const steps = ["Send enquiry", "We review required documents", "We coordinate application / booking"];

function FT() {
  return (
    <>
      <section className="bg-ft px-5 py-14 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Service division · Event admin</p>
          <Wordmark k="ft" className="mt-3 block text-[20vw] md:text-[12rem]" />
          <p className="max-w-lg text-lg">Professional permits, licences and travel coordination for events and visiting performers.</p>
        </div>
      </section>
      <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 md:px-10">
        <h2 className="display mb-8 text-4xl md:text-6xl">What we handle</h2>
        <ul className="grid gap-x-12 sm:grid-cols-2">
          {fastTrackServices.map((s) => (
            <li key={s} className="border-b border-cream/25 py-6">
              <p className="display text-[clamp(1.8rem,3.5vw,3.25rem)] leading-tight transition-colors hover:text-sos-cyan">{s}</p>
            </li>
          ))}
        </ul>
      </section>
      <section id="process" className="scroll-mt-24 bg-cream py-16 text-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <h2 className="display text-5xl md:text-7xl">How it works</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s} className="border-t-4 border-ft pt-4">
                <p className="display mt-2 text-3xl md:text-4xl">{s}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm">Approvals are decided by the relevant authorities; we can’t guarantee outcomes or timelines.</p>
        </div>
      </section>
      <section id="enquire" className="mx-auto max-w-4xl px-5 py-20 md:px-10">
        <h2 className="display mb-10 text-5xl md:text-7xl">Enquire</h2>
        <EnquiryForm topic="Fast Track" accent="bg-ft" options={fastTrackServices} />
      </section>
    </>
  );
}
