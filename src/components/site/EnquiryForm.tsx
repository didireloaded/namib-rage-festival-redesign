import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

const field = "w-full border-0 border-b-2 border-input bg-transparent px-0 py-3 text-lg text-cream placeholder:text-muted-foreground focus:border-camp focus:outline-none focus:ring-0";

/** SAFE DEMO: nothing is stored or transmitted. */
export function EnquiryForm({ topic, accent = "bg-nr", options }: { topic: string; accent?: string; options?: string[] }) {
  const [shown, setShown] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setShown(true);
  };
  return (
    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2" aria-describedby="demo-note">
      <p id="demo-note" className="eyebrow text-muted-foreground md:col-span-2">{topic} · demo form, nothing is sent</p>
      <label className="block"><span className="eyebrow">Name</span><input required name="name" autoComplete="off" className={field} /></label>
      <label className="block"><span className="eyebrow">Email</span><input required type="email" name="email" autoComplete="off" className={field} /></label>
      <label className="block"><span className="eyebrow">Organisation / event</span><input name="org" autoComplete="off" className={field} /></label>
      <label className="block"><span className="eyebrow">Enquiry type</span>
        <select name="type" className={cn(field, "bg-ink")}>
          {(options ?? [topic]).map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="block md:col-span-2"><span className="eyebrow">Message</span><textarea name="msg" rows={3} className={field} /></label>
      <label className="flex items-start gap-3 md:col-span-2">
        <input required type="checkbox" name="privacy" className="mt-1 size-5 accent-camp" />
        <span className="text-sm">I have read the <Link to="/privacy" className="underline">privacy notice</Link> and agree my details may be used to answer this enquiry. (required)</span>
      </label>
      <label className="flex items-start gap-3 md:col-span-2">
        <input type="checkbox" name="marketing" className="mt-1 size-5 accent-camp" />
        <span className="text-sm">Optional: send me Namib Rage festival news.</span>
      </label>
      <div className="md:col-span-2">
        <button type="submit" className={cn("display px-6 py-3 text-xl text-cream transition-transform hover:-translate-y-0.5", accent)}>Send enquiry</button>
        <div aria-live="polite">
          {shown && (
            <p className="mt-4 border-l-4 border-camp bg-secondary p-4 font-semibold">
              Preview only. Enquiries will be enabled after the secure backend is connected.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
