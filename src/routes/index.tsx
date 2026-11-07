import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { brands, photos, type BrandKey, type Photo } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * A single, minimal brand selector. Real event imagery only.
 * Service photos remain Namib Rage event atmosphere until approved,
 * service-specific media is provided.
 */
const backgrounds: Record<BrandKey, Photo> = {
  nr: photos.nrGallery1,
  sos: photos.sosCrowd,
  camp: photos.campArt,
  barb: photos.nrGallery4,
  howler: photos.nrGallery2,
  ft: photos.nrGallery3,
};

function Background({ photo, eager = false }: { photo: Photo; eager?: boolean }) {
  const srcSet = photo.resizable
    ? [640, 1080, 1920].map((width) => [
        photo.src.replace("w_1920", "w_" + width),
        width + "w",
      ].join(" ")).join(", ")
    : undefined;

  return (
    <img
      src={photo.src}
      srcSet={srcSet}
      sizes="100vw"
      alt=""
      aria-hidden="true"
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      draggable={false}
      className="absolute inset-0 h-full w-full object-cover"
      onError={(event) => { event.currentTarget.style.visibility = "hidden"; }}
    />
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Namib Rage — Brands, festivals and services" },
      { name: "description", content: "Explore Namib Rage, Sound of Summer, Campout Dune Fest, Barbarian, Howler and Fast Track." },
      { property: "og:title", content: "Namib Rage" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BrandEntrance,
});

function BrandEntrance() {
  const [active, setActive] = useState<BrandKey>("nr");
  const [previous, setPrevious] = useState<BrandKey | null>(null);
  const activeRef = useRef<BrandKey>("nr");
  const activeIndex = brands.findIndex((item) => item.key === active);

  function preview(next: BrandKey) {
    const current = activeRef.current;
    if (next === current) return;
    setPrevious(current);
    setActive(next);
    activeRef.current = next;
  }

  useEffect(() => {
    if (!previous) return;
    const timer = window.setTimeout(() => setPrevious(null), 420);
    return () => window.clearTimeout(timer);
  }, [active, previous]);

  return (
    <section className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-ink">
      <h1 className="sr-only">Namib Rage brands</h1>

      {previous && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <Background photo={backgrounds[previous]} />
        </div>
      )}
      <div
        key={active}
        className="gateway-scene pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <Background photo={backgrounds[active]} eager={active === "nr"} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-ink/40" aria-hidden="true" />

      <nav
        aria-label="Namib Rage brands"
        className="relative z-10 mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-10"
      >
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                to={item.to}
                onMouseEnter={() => preview(item.key)}
                onFocus={() => preview(item.key)}
                onTouchStart={() => preview(item.key)}
                data-preview-active={isActive || undefined}
                className={cn(
                  "gateway-brand group flex min-h-28 items-center justify-center px-3 py-6 text-center outline-offset-[-4px] sm:min-h-36 sm:px-4 lg:min-h-44",
                  item.accentClass,
                  item.textOnAccent,
                )}
              >
                {item.logo ? (
                  <img src={item.logo} alt={item.name} className="max-h-20 max-w-full object-contain" />
                ) : (
                  <span className="display text-[clamp(1.4rem,3vw,2.8rem)] leading-[1.06]">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-1 grid grid-cols-6 gap-1" aria-hidden="true">
          {brands.map((item, index) => (
            <span key={item.key} className="block h-1.5 overflow-hidden bg-cream/30">
              <span
                className={cn(
                  "block h-full w-full origin-left transition-transform duration-[320ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                  item.accentClass,
                  index <= activeIndex ? "scale-x-100" : "scale-x-0",
                )}
              />
            </span>
          ))}
        </div>
      </nav>
    </section>
  );
}
