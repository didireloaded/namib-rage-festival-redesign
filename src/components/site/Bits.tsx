import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { brand as getBrand, type BrandKey, type Festival } from "@/data/site";
import { cn } from "@/lib/utils";

/** Approved logo when available, otherwise an editorial brand wordmark. */
export function Wordmark({ k, className }: { k: BrandKey; className?: string }) {
  const b = getBrand(k);
  if (b.logo) return <img src={b.logo} alt={`${b.name} logo`} className={cn("h-8 w-auto", className)} />;
  return (
    <span className={cn("display inline-flex items-baseline gap-1 tracking-tight", className)}>
      {b.name}
    </span>
  );
}

export function TicketLink({ f, className, children }: { f: Festival; className?: string; children?: ReactNode }) {
  const b = getBrand(f.brand);
  return (
    <a
      href={f.ticketUrl} target="_blank" rel="noopener noreferrer"
      className={cn(
        "display inline-flex items-center justify-center gap-2 px-5 py-3 text-lg transition-colors hover:brightness-105",
        b.accentClass, b.textOnAccent, className,
      )}
    >
      {children ?? <>Tickets · {f.name}</>}
      <ArrowUpRight className="size-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
      <span className="sr-only">(opens Howler in a new tab)</span>
    </a>
  );
}

export function Sticker({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("sticker text-xl md:text-3xl", className)}>{children}</span>;
}

export function Chip({ k, label }: { k: BrandKey; label?: string }) {
  const b = getBrand(k);
  return (
    <span className={cn("eyebrow inline-block px-2 py-1 text-[0.62rem]", b.accentClass, b.textOnAccent)}>
      {label ?? b.name}
    </span>
  );
}

export function CtaLink({ to, children, variant = "light" }: { to: string; children: ReactNode; variant?: "light" | "outline" }) {
  return (
    <Link
      to={to}
      className={cn(
        "display inline-flex items-center gap-2 px-5 py-3 text-lg transition-colors hover:brightness-105",
        variant === "light" ? "bg-cream text-ink" : "border-2 border-cream text-cream hover:bg-cream hover:text-ink",
      )}
    >
      {children} <ArrowRight className="size-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
    </Link>
  );
}

export function PageHead({ eyebrow, title, intro, accent = "bg-nr" }: { eyebrow: string; title: ReactNode; intro?: string; accent?: string }) {
  return (
    <header className="mx-auto max-w-7xl px-5 pb-10 pt-12 md:px-10 md:pt-20">
      <span className={cn("eyebrow px-2 py-1 text-cream", accent)}>{eyebrow}</span>
      <h1 className="display mt-5 text-6xl md:text-9xl">{title}</h1>
      {intro && <p className="mt-6 max-w-xl text-lg text-muted-foreground">{intro}</p>}
    </header>
  );
}
