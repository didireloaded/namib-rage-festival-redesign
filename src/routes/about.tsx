import { createFileRoute, Link } from "@tanstack/react-router";
import { brands, company, organiserMark, photos } from "@/data/site";
import { Credit, Media } from "@/components/site/Media";
import { Wordmark } from "@/components/site/Bits";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => seo("About Namib Rage", "Windhoek events company since 2013: two owned festivals and three service divisions."),
  component: About,
});

function About() {
  return (
    <>
      <section className="grid md:grid-cols-12">
        <div className="flex flex-col justify-end p-5 pt-12 md:col-span-6 md:p-10">
          <p className="eyebrow text-nr">Windhoek · since {company.founded}</p>
          <h1 className="display mt-3 text-7xl md:text-9xl">Built for the crowd</h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">Namib Rage started in {company.founded} and now runs two festivals of its own. Three service divisions keep the bars, gates and paperwork moving.</p>
        </div>
        <div className="relative aspect-[4/5] md:col-span-6 md:aspect-auto md:min-h-[80svh]">
          <Media photo={photos.sosBeach} priority sizes="(min-width:768px) 50vw, 100vw" />
          <Credit photo={photos.sosBeach} className="absolute bottom-2 left-2" />
        </div>
      </section>
      <section className="grid grid-cols-3 gap-px bg-border">
        {[["2013", "Founded"], ["2", "Owned festivals"], ["3", "Service divisions"]].map(([n, l]) => (
          <div key={l} className="bg-background p-5 md:p-10">
            <p className="display text-6xl text-nr md:text-9xl">{n}</p>
            <p className="eyebrow mt-2">{l}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <ul className="grid gap-2 md:grid-cols-3">
          {brands.map((b) => (
            <li key={b.key}>
              <Link to={b.to} className={cn("flex min-h-32 flex-col justify-between p-5", b.accentClass, b.textOnAccent)}>
                <span className="eyebrow">{b.role}</span>
                <Wordmark k={b.key} className="text-4xl" />
              </Link>
            </li>
          ))}
        </ul>
        <figure className="mt-12 flex items-center gap-4">
          <img src={organiserMark.src} alt={organiserMark.alt} loading="lazy" className="size-20 object-cover" />
          <figcaption className="text-sm text-muted-foreground">{organiserMark.note}</figcaption>
        </figure>
        
      </section>
    </>
  );
}
