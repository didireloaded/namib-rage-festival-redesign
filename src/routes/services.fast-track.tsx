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
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <ol className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {fastTrackServices.map((s, i) => (
            <li key={s} className="group border-b border-r border-border p-6 transition-colors hover:bg-ft">
              <span className="display text-6xl text-ft group-hover:text-cream">{String(i + 1).padStart(2, "0")}</span>
              <p className="display mt-6 text-3xl">{s}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-cream py-16 text-ink">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <h2 className="display text-5xl md:text-7xl">How it works</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s} className="border-t-4 border-ft pt-4">
                <span className="eyebrow text-ft">Step {i + 1}</span>
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
