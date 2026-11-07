import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink, Mail } from "lucide-react";
import { company } from "@/data/site";
import { PageHead } from "@/components/site/Bits";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy information", "Read Namib Rage's privacy policy and learn how ticketing and enquiries work."),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHead eyebrow="Your information" title="Privacy" intro="Information for festival visitors, partners and event-service enquiries." />
      <section className="mx-auto max-w-3xl space-y-7 px-5 pb-20 text-lg md:px-10">
        <p>Read our official privacy policy on the Namib Rage website.</p>
        <a href={company.officialPrivacy} target="_blank" rel="noopener noreferrer" className="display inline-flex items-center gap-3 bg-cream px-5 py-3 text-lg text-ink">Read our privacy policy <ExternalLink className="size-5" strokeWidth={1.8} aria-hidden="true" /></a>
        <div className="space-y-3 border-t border-border pt-7">
          <h2 className="display text-3xl">Tickets and enquiries</h2>
          <p className="text-base text-muted-foreground">Festival tickets are sold through Howler under its own terms and privacy practices. Email enquiries are sent through your email application.</p>
        </div>
        <a href={"mailto:"+company.email} className="inline-flex items-center gap-2 text-base underline underline-offset-4"><Mail className="size-4" aria-hidden="true" /> Contact us about your information <ArrowUpRight className="size-4" aria-hidden="true" /></a>
      </section>
    </>
  );
}
