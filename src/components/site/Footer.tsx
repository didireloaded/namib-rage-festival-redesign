import { Link } from "@tanstack/react-router";
import { brands, company } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-16 md:pb-12">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="display text-6xl text-cream md:text-[9rem]">Namib <span className="text-nr">Rage</span></p>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <div>
            <p className="eyebrow text-muted-foreground">The family</p>
            <ul className="mt-3 space-y-1">
              {brands.map((b) => (
                <li key={b.key}><Link to={b.to} className="hover:text-camp">{b.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Contact</p>
            <p className="mt-3">{company.address}</p>
            <p>{company.email}</p>
            <p>{company.phone}</p>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">More</p>
            <ul className="mt-3 space-y-1">
              <li><Link to="/work-with-us" className="hover:text-camp">Work with us</Link></li>
              <li><Link to="/partners" className="hover:text-camp">Partners</Link></li>
              <li><Link to="/privacy" className="hover:text-camp">Privacy</Link></li>
              <li><a href={company.howlerHelp} target="_blank" rel="noopener noreferrer" className="hover:text-camp">Ticket help (Howler) ↗</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-xs text-muted-foreground">
          Redesign review prototype — not the live namibrage.com. Logos shown as wordmark placeholders pending approved files. © {company.name}, est. {company.founded}.
        </p>
      </div>
    </footer>
  );
}
