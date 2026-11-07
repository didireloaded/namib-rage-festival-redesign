import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/data/site";
import { Credit, Media } from "./Media";
import { cn } from "@/lib/utils";

export function Gallery({ items }: { items: Photo[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const lastTrigger = useRef(0);
  const hasOpened = useRef(false);

  const close = () => {
    if (idx !== null) lastTrigger.current = idx;
    setIdx(null);
  };

  useEffect(() => {
    if (idx === null) return;
    hasOpened.current = true;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key === "ArrowRight") { event.preventDefault(); setIdx((i) => ((i ?? 0) + 1) % items.length); }
      if (event.key === "ArrowLeft") { event.preventDefault(); setIdx((i) => ((i ?? 0) - 1 + items.length) % items.length); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [idx, items.length]);

  useEffect(() => {
    if (idx === null && hasOpened.current) {
      triggers.current[lastTrigger.current]?.focus({ preventScroll: true });
      hasOpened.current = false;
    }
  }, [idx]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {items.map((photo, index) => (
          <button
            key={photo.id}
            ref={(element) => { triggers.current[index] = element; }}
            type="button"
            onClick={() => { lastTrigger.current = index; setIdx(index); }}
            className={cn("gallery-thumb group relative overflow-hidden bg-secondary", index % 5 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/5]")}
            aria-label={"Open photo: " + photo.alt}
          >
            <Media photo={photo} sizes="(min-width:768px) 25vw, 50vw" />
          </button>
        ))}
      </div>
      {idx !== null && (
        <div
          role="dialog" aria-modal="true" aria-label="Photo viewer"
          className="lightbox-enter fixed inset-0 z-[60] flex flex-col bg-ink/95 p-4"
          onClick={(event) => { if (event.target === event.currentTarget) close(); }}
        >
          <div className="flex justify-end gap-4">
            <button type="button" className="display text-xl" onClick={() => setIdx((idx - 1 + items.length) % items.length)}>← Prev</button>
            <button type="button" className="display text-xl" onClick={() => setIdx((idx + 1) % items.length)}>Next →</button>
            <button type="button" autoFocus className="display text-xl text-camp" onClick={close}>Close</button>
          </div>
          <div key={items[idx].id} className="lightbox-media relative min-h-0 flex-1 py-4">
            <Media photo={items[idx]} fit="contain" />
          </div>
          <Credit photo={items[idx]} />
        </div>
      )}
    </>
  );
}
