import { useId, useState, type ReactNode } from "react";
import type { Festival } from "@/data/site";
import { TicketLink } from "./Bits";
import { cn } from "@/lib/utils";

export function MobileTicketBar({ f }: { f: Festival }) {
  const isSos = f.brand === "sos";
  return (
    <div className={cn("fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t px-4 py-3 md:hidden", isSos ? "border-sos-cyan/40 bg-sos-deep text-cream" : "border-border bg-ink")}>
      <div className="leading-tight">
        <p className="display text-lg">{f.name}</p>
        <p className={cn("text-xs", isSos ? "text-sos-cyan" : "text-muted-foreground")}>{f.dateSticker} 2026 · {f.age}</p>
      </div>
      <TicketLink f={f} className={cn("px-4 py-2 text-base", isSos && "bg-sos-orange text-sos-deep")}>Tickets</TicketLink>
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <dl className="divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const expanded = open === index;
        const panelId = id + "-answer-" + index;
        return (
          <div key={item.q}>
            <dt>
              <button
                type="button"
                className="display flex w-full items-center justify-between gap-4 py-5 text-left text-2xl md:text-3xl"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
              >
                {item.q}
                <span className={cn("shrink-0 text-3xl transition-transform duration-200", expanded && "rotate-45")} aria-hidden="true">+</span>
              </button>
            </dt>
            <dd id={panelId} className={cn("faq-answer grid", expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")} aria-hidden={!expanded} inert={!expanded}>
              <div className="overflow-hidden"><div className="pb-5 leading-relaxed text-muted-foreground">{item.a}</div></div>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

export function FactRow({ items }: { items: [string, string][] }) {
  return (
    <dl className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
      {items.map(([name, value]) => (
        <div key={name} className="bg-background p-5">
          <dt className="eyebrow text-muted-foreground">{name}</dt>
          <dd className="display mt-2 text-2xl md:text-3xl">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
