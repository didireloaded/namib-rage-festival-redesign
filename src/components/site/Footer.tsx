import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { brands, company } from "@/data/site";

export function Footer() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const isSos = path.startsWith("/festivals/sound-of-summer");
  return (
    <footer className={cn("pb-28 pt-16 md:pb-12", isSos ? "bg-sos-deep text-cream" : "bg-ink")}>
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {isSos ? (
          <p className="display text-6xl text-cream md:text-[9rem]">Sound of <span className="sos-outline-title">Summer</span></p>
        ) : (
          <p className="display text-6xl text-cream md:text-[9rem]">Namib <span className="text-nr">Rage</span></p>
        )}
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <div>
            <p className={cn("eyebrow", isSos ? "text-sos-cyan" : "text-muted-foreground")}>The family</p>
            <ul className="mt-3 space-y-1">
              {brands.map((b) => (
                <li key={b.key}><Link to={b.to} className={isSos ? "hover:text-sos-orange" : "hover:text-camp"}>{b.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className={cn("eyebrow", isSos ? "text-sos-cyan" : "text-muted-foreground")}>Contact</p>
            <p className="mt-3">{company.address}</p>
            <a href={"mailto:"+company.email} className="mt-2 flex items-center gap-2 hover:underline"><Mail className="size-4 shrink-0" aria-hidden="true" />{company.email}</a>
            <a href={"tel:"+company.phone.replace(/[^\d+]/g,"")} className="mt-2 flex items-center gap-2 hover:underline"><Phone className="size-4 shrink-0" aria-hidden="true" />{company.phone}</a>
          </div>
          <div>
            <p className={cn("eyebrow", isSos ? "text-sos-cyan" : "text-muted-foreground")}>More</p>
            <ul className="mt-3 space-y-1">
              <li><Link to="/work-with-us" className="hover:text-camp">Work with us</Link></li>
              <li><Link to="/partners" className="hover:text-camp">Partners</Link></li>
              <li><Link to="/privacy" className="hover:text-camp">Privacy</Link></li>
              <li><a href={company.howlerHelp} target="_blank" rel="noopener noreferrer" className="hover:text-camp">Ticket help (Howler) <ArrowUpRight className="inline-block size-4" aria-hidden="true" /></a></li>
            </ul>
          </div>
        </div>
        <p className={cn("mt-12 text-xs", isSos ? "text-[#c9eefd]" : "text-muted-foreground")}>
          &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
