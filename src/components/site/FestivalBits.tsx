import { useState, type ReactNode } from "react";
import type { Festival } from "@/data/site";
import { TicketLink } from "./Bits";

export function MobileTicketBar({ f }: { f: Festival }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-border bg-ink px-4 py-3 md:hidden">
      <div className="leading-tight">
        <p className="display text-lg">{f.name}</p>
        <p className="text-xs text-muted-foreground">{f.dateSticker} 2026 · {f.age}</p>
      </div>
      <TicketLink f={f} className="px-4 py-2 text-base">Tickets</TicketLink>
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <dl className="divide-y divide-border border-y border-border">
      {items.map((it, i) => (
        <div key={it.q}>
          <dt>
            <button className="display flex w-full justify-between py-5 text-left text-2xl md:text-3xl" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
              {it.q}<span aria-hidden>{open === i ? "−" : "+"}</span>
            </button>
          </dt>
          {open === i && <dd className="pb-5 text-muted-foreground">{it.a}</dd>}
        </div>
      ))}
    </dl>
  );
}

export function FactRow({ items }: { items: [string, string][] }) {
  return (
    <dl className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
      {items.map(([k, v]) => (
        <div key={k} className="bg-background p-5">
          <dt className="eyebrow text-muted-foreground">{k}</dt>
          <dd className="display mt-2 text-2xl md:text-3xl">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
