import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Photo } from "@/data/site";
import { Credit, Media } from "./Media";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export type GalleryCaption = { title: string; role?: string; to?: string };

export function Gallery({ items, captions }: { items: Photo[]; captions?: GalleryCaption[] }) {
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
      <div className={cn("grid gap-3",captions ? "gallery-editorial grid-cols-2 md:grid-cols-4" : "mx-auto max-w-6xl grid-cols-2 sm:grid-cols-3")}>
        {items.map((photo, index) => (
          <button
            key={photo.id}
            ref={(element) => { triggers.current[index] = element; }}
            type="button"
            onClick={() => { lastTrigger.current = index; setIdx(index); }}
            className={cn("gallery-thumb group relative overflow-hidden bg-night text-bone",captions ? (index % 5 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/5]") : "aspect-square")}
            aria-label={"View photo: " + (captions?.[index]?.title ?? photo.alt)}
          >
            <Media photo={photo} sizes="(min-width:768px) 25vw, 50vw" />
            {captions?.[index] && (
              <div className="absolute inset-x-0 bottom-0 bg-night/75 px-4 py-5 text-left">
                <span className="block text-xs font-semibold uppercase tracking-wider text-bone/80">{captions[index].role}</span>
                <span className="display mt-2 block text-3xl md:text-5xl">{captions[index].title}</span>
              </div>
            )}
          </button>
        ))}
      </div>
      {idx !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer"
          className="lightbox-enter fixed inset-0 z-[60] flex flex-col bg-night/95 p-4 text-bone"
          onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
          <div className="flex flex-wrap justify-end gap-4">
            <button type="button" className="inline-flex min-h-10 items-center gap-2 font-semibold" onClick={() => setIdx((idx - 1 + items.length) % items.length)}><ArrowLeft className="size-5" aria-hidden="true" />Previous</button>
            <button type="button" className="inline-flex min-h-10 items-center gap-2 font-semibold" onClick={() => setIdx((idx + 1) % items.length)}>Next <ArrowRight className="size-5" aria-hidden="true" /></button>
            <button type="button" autoFocus className="inline-flex min-h-10 items-center gap-2 font-semibold text-amber" onClick={close}><X className="size-5" aria-hidden="true" />Close</button>
          </div>
          <div key={items[idx].id} className="lightbox-media relative min-h-0 flex-1 py-4"><Media photo={items[idx]} fit="contain" /></div>
          {captions?.[idx] && (
            <div className="flex flex-wrap items-center justify-between gap-3 py-3">
              <p className="display text-2xl">{captions[idx].title}</p>
              {captions[idx].to && <Link to={captions[idx].to} onClick={close} className="border-b border-bone pb-1 text-sm font-semibold">View event</Link>}
            </div>
          )}
          <Credit photo={items[idx]} />
        </div>
      )}
    </>
  );
}
