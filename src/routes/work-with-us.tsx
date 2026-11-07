import { createFileRoute } from "@tanstack/react-router";
import { brand, photos, workLinks } from "@/data/site";
import { Media } from "@/components/site/Media";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work-with-us")({
  head: () => seo("Work with us", "Apply for Barbarian bar crew, Howler ticketing crew, or as a festival vendor."),
  component: Work,
});

function Work() {
  return (
    <>
      <section className="relative flex min-h-[55svh] flex-col justify-end overflow-hidden">
        <Media photo={photos.nrGallery3} priority className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-ink/10" />
        <h1 className="display relative p-5 text-[17vw] leading-[0.85] md:p-10 md:text-[10rem]">Join<br /><span className="text-camp">the crew</span></h1>
      </section>
      <section className="grid md:grid-cols-3">
        {workLinks.map((l) => {
          const b = brand(l.brand);
          return (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
              className={cn("group flex min-h-64 flex-col justify-between p-6 md:p-10", b.accentClass, b.textOnAccent)}>
              <span className="eyebrow">{b.name}</span>
              <span className="display text-4xl md:text-5xl">{l.label} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">↗</span></span>
            </a>
          );
        })}
      </section>
      <p className="mx-auto max-w-7xl px-5 py-8 text-sm text-muted-foreground md:px-10">Applications open on the official Namib Rage site. This preview never collects ID or banking details.</p>
    </>
  );
}
