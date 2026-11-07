import { useEffect, useState } from "react";
import type { Photo } from "@/data/site";
import { Credit, Media } from "./Media";
import { cn } from "@/lib/utils";

export function Gallery({ items }: { items: Photo[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => (i! + 1) % items.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i! - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [idx, items.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {items.map((p, i) => (
          <button
            key={p.id} onClick={() => setIdx(i)}
            className={cn("group relative overflow-hidden bg-secondary", i % 5 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/5]")}
            aria-label={`Open photo: ${p.alt}`}
          >
            <Media photo={p} sizes="(min-width: 768px) 25vw, 50vw" className="transition-transform duration-500 group-hover:scale-105" />
          </button>
        ))}
      </div>
      {idx !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="page-in fixed inset-0 z-[60] flex flex-col bg-ink/95 p-4" onClick={() => setIdx(null)}>
          <div className="flex justify-end gap-4">
            <button className="display text-xl" onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + items.length) % items.length); }}>← Prev</button>
            <button className="display text-xl" onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % items.length); }}>Next →</button>
            <button autoFocus className="display text-xl text-camp" onClick={() => setIdx(null)}>Close</button>
          </div>
          <div className="relative min-h-0 flex-1 py-4">
            <Media photo={items[idx]} fit="contain" />
          </div>
          <Credit photo={items[idx]} className="self-start" />
        </div>
      )}
    </>
  );
}
