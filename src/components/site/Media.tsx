import { useEffect, useState } from "react";
import type { Photo } from "@/data/site";
import { cn } from "@/lib/utils";

function srcSet(p: Photo) {
  if (!p.resizable) return undefined;
  return [640, 1080, 1920].map((w) => `${p.src.replace("w_1920", `w_${w}`)} ${w}w`).join(", ");
}

export function usePrefersReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const f = () => setR(m.matches);
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return r;
}

type Props = {
  photo: Photo;
  className?: string;
  priority?: boolean;
  sizes?: string;
  video?: string | null;
  fit?: "cover" | "contain";
};

export function Media({ photo, className, priority, sizes = "100vw", video, fit = "cover" }: Props) {
  const [failed, setFailed] = useState(false);
  const reduced = usePrefersReducedMotion();
  const fitCls = fit === "cover" ? "object-cover" : "object-contain";

  if (failed) {
    return (
      <div role="img" aria-label={photo.alt} className={cn("flex items-end bg-secondary p-4", className)}>
        <span className="eyebrow text-muted-foreground">{photo.context}</span>
      </div>
    );
  }
  if (video && !reduced) {
    return (
      <video
        className={cn("h-full w-full", fitCls, className)}
        src={video} poster={photo.src} autoPlay muted loop playsInline aria-label={photo.alt}
      />
    );
  }
  return (
    <img
      src={photo.src}
      srcSet={srcSet(photo)}
      sizes={sizes}
      alt={photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("h-full w-full", fitCls, className)}
    />
  );
}

export function Credit({ photo }: { photo: Photo; className?: string }) {
  return <span className="sr-only">{photo.context} · {photo.credit}</span>;
}
