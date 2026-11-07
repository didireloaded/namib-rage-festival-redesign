import { createFileRoute, Link } from "@tanstack/react-router";
import { brand, type BrandKey } from "@/data/site";
import { Wordmark } from "@/components/site/Bits";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  head: () => seo("Event services", "Barbarian bar management, Howler ticketing & cashless, and Fast Track permits and bookings."),
  component: Services,
});

const rows: { k: BrandKey; line: string }[] = [
  { k: "barb", line: "Full-service event bars" },
  { k: "howler", line: "Tickets, access control, cashless" },
  { k: "ft", line: "Visas, permits, licences, bookings" },
];

function Services() {
  return (
    <>
      <header className="mx-auto max-w-7xl px-5 pb-8 pt-12 md:px-10 md:pt-20">
        <p className="eyebrow text-muted-foreground">Three divisions</p>
        <h1 className="display mt-3 text-7xl md:text-[10rem]">Services</h1>
      </header>
      {rows.map(({ k, line }) => {
        const b = brand(k);
        return (
          <Link key={k} to={b.to} className={cn("group flex flex-col justify-between gap-6 px-5 py-12 transition-all md:flex-row md:items-end md:px-10 md:py-16", b.accentClass, b.textOnAccent)}>
            <div className="flex items-baseline">
              <Wordmark k={k} className="text-[clamp(3.3rem,7vw,7rem)] leading-none transition-transform group-hover:translate-x-2" />
            </div>
            <p className="display text-2xl md:text-3xl">{line} →</p>
          </Link>
        );
      })}
    </>
  );
}
