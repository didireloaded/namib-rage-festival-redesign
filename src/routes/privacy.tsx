import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/data/site";
import { PageHead } from "@/components/site/Bits";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy notice (draft)", "Draft privacy notice for the Namib Rage redesign preview, pending approval."),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHead eyebrow="Draft — pending approval" title="Privacy notice" intro="Draft privacy notice pending approval. Until the team confirms implementation, the official policy applies." />
      <section className="mx-auto max-w-3xl space-y-4 px-5 pb-20 md:px-10">
        <p>This preview does not store or transmit any form entries. Ticket purchases happen on Howler under Howler’s own terms.</p>
        <p>Questions: {company.email}.</p>
        <a href={company.officialPrivacy} target="_blank" rel="noopener noreferrer" className="display inline-block bg-cream px-5 py-3 text-lg text-ink">Read the official privacy policy ↗</a>
      </section>
    </>
  );
}
