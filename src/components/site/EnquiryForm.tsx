import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/data/site";

const field = "w-full border-0 border-b-2 border-input bg-transparent px-0 py-3 text-lg text-cream placeholder:text-muted-foreground focus:border-camp focus:outline-none focus:ring-0";

/** Opens a real pre-addressed email. Do not claim a server sent it. */
export function EnquiryForm({ topic, accent = "bg-nr", options }: { topic: string; accent?: string; options?: string[] }) {
  const [opened, setOpened] = useState(false);
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const org = String(values.get("org") ?? "").trim();
    const type = String(values.get("type") ?? topic);
    const message = String(values.get("msg") ?? "").trim();
    const subject = "Namib Rage | " + topic + " enquiry | " + type;
    const body = ["Name: "+name, "Email: "+email, "Organisation / event: "+(org || "Not provided"), "Enquiry: "+type, "", message].join("\n");
    const url = "mailto:"+company.email+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
    setOpened(true);
    window.location.href = url;
  }
  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2" aria-describedby="enquiry-instructions">
        <p id="enquiry-instructions" className="text-sm text-muted-foreground md:col-span-2">Tell us what you need. Your email application will open with the details ready for you to review and send.</p>
        <label className="block"><span className="eyebrow">Name</span><input required name="name" autoComplete="name" maxLength={120} className={field} /></label>
        <label className="block"><span className="eyebrow">Email</span><input required type="email" name="email" autoComplete="email" maxLength={254} className={field} /></label>
        <label className="block"><span className="eyebrow">Organisation / event</span><input name="org" autoComplete="organization" maxLength={180} className={field} /></label>
        <label className="block"><span className="eyebrow">Enquiry type</span><select name="type" className={cn(field,"bg-ink")}>{(options ?? [topic]).map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
        <label className="block md:col-span-2"><span className="eyebrow">Message</span><textarea required name="msg" rows={4} maxLength={4000} className={field} /></label>
        <p className="text-sm text-muted-foreground md:col-span-2">Your message is sent by your email provider. Read our <Link to="/privacy" className="underline underline-offset-4">privacy information</Link>.</p>
        <div className="md:col-span-2">
          <button type="submit" className={cn("display inline-flex min-h-12 items-center gap-3 px-6 py-3 text-xl text-cream transition-colors hover:brightness-105",accent)}>
            <Mail className="size-5" strokeWidth={1.8} aria-hidden="true" /> Prepare enquiry email
            <ArrowUpRight className="size-5" strokeWidth={1.8} aria-hidden="true" />
          </button>
          <div aria-live="polite">{opened && <p className="mt-4 max-w-xl text-sm text-muted-foreground">If your email app did not open, use the contact links below. Your enquiry has not been sent yet.</p>}</div>
        </div>
      </form>
      <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5 text-sm">
        <a className="inline-flex items-center gap-2 underline-offset-4 hover:underline" href={"mailto:"+company.email}><Mail className="size-4" strokeWidth={1.8} aria-hidden="true" />{company.email}</a>
        <a className="inline-flex items-center gap-2 underline-offset-4 hover:underline" href={"tel:"+company.phone.replace(/[^\d+]/g,"")}><Phone className="size-4" strokeWidth={1.8} aria-hidden="true" />{company.phone}</a>
      </div>
    </div>
  );
}
