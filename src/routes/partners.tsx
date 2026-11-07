import { createFileRoute } from "@tanstack/react-router";
import { photos, sponsors } from "@/data/site";
import { Credit, Media } from "@/components/site/Media";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/partners")({
  head: () => seo("Partners & sponsorship", "Put your brand in front of Sound of Summer and Campout Dune Fest crowds."),
  component: Partners,
});

function Partners() {
  const approved = sponsors.filter((s) => s.approved);
  return (
    <>
      <section className="relative flex min-h-[70svh] flex-col justify-end overflow-hidden">
        <Media photo={photos.nrGallery2} priority className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
        <Credit photo={photos.nrGallery2} className="absolute right-2 top-2" />
        <div className="relative p-5 md:p-10">
          <h1 className="display text-[16vw] leading-[0.85] md:text-[9rem]">Partner<br /><span className="text-nr">with the crowd</span></h1>
          <p className="mt-3 max-w-md text-lg">Activations and sponsorship across our two owned festivals.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        {approved.length > 0 && <h2 className="display text-4xl md:text-6xl">Our partners</h2>}
        {approved.length > 0 && (
          <ul className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-5">
            {approved.map((s) => <li key={s.name}><img src={s.logo} alt={s.name} loading="lazy" className="h-12 w-auto" /></li>)}
          </ul>
        )}
      </section>
      <section className="mx-auto max-w-4xl px-5 pb-20 md:px-10">
        <h2 className="display mb-10 text-5xl md:text-7xl">Partnership enquiry</h2>
        <EnquiryForm topic="Partnership" options={["Sound of Summer", "Campout Dune Fest", "Both festivals"]} />
      </section>
    </>
  );
}
