import { createFileRoute } from "@tanstack/react-router";
import { useRef, type FormEvent } from "react";
import { fastTrackServices, company } from "@/data/site";
import { Wordmark } from "@/components/site/Bits";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/fast-track")({
  head: () => seo("Fast Track | Event permits, visas & travel", "Visa services, work permits, liquor and noise permits, NASCAM licences, flights and artist bookings."),
  component: FastTrack,
});

const steps = ["Send enquiry", "Review required documents", "Coordinate application or booking"];

const iconPaths = [
  <><rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 9h6M9 13h6M9 17h3"/></>,
  <><rect x="3" y="7" width="18" height="14" rx="1"/><path d="M8 7V4h8v3M3 13h18M10 13v3h4v-3"/></>,
  <><path d="M7 3h9l4 4v14H7z"/><path d="M16 3v5h4M10 13h7M10 17h7"/></>,
  <><path d="M4 10v4h4l6 4V6l-6 4zM17 9c2 2 2 4 0 6"/></>,
  <><path d="M10 18V5l10-2v13"/><ellipse cx="7" cy="19" rx="3" ry="2"/><ellipse cx="17" cy="17" rx="3" ry="2"/></>,
  <><path d="M3 12l18-7-6 14-3-6-9-1zM12 13l9-8"/></>,
  <><circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M17 5a3 3 0 0 1 0 6M18 15c2 1 3 2 3 5"/></>,
];

function FastTrackForm({ onComplete }: { onComplete?: () => void }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const service = String(form.get("service") ?? "");
    const deadline = String(form.get("deadline") ?? "");
    const subject = encodeURIComponent("Fast Track enquiry | "+service);
    const body = encodeURIComponent(["Name: "+name,"Email: "+email,"Service: "+service,"Required by: "+(deadline || "To be discussed")].join("\n"));
    onComplete?.();
    window.location.href = "mailto:"+company.email+"?subject="+subject+"&body="+body;
  }
  const input = "mt-2 w-full min-h-11 border-b border-bone/50 bg-transparent px-1 py-2 text-base text-bone focus:border-ft focus:outline-none";
  return (
    <form onSubmit={submit} className="grid gap-6 sm:grid-cols-2">
      <label className="block text-sm font-semibold">Your name<input name="name" required autoComplete="name" maxLength={120} className={input}/></label>
      <label className="block text-sm font-semibold">Email<input name="email" required type="email" autoComplete="email" maxLength={254} className={input}/></label>
      <label className="block text-sm font-semibold">Service
        <select name="service" className={input}>{fastTrackServices.map(service=><option className="bg-night text-bone" key={service} value={service}>{service}</option>)}</select>
      </label>
      <label className="block text-sm font-semibold">Required by<input name="deadline" type="date" className={input}/></label>
      <div className="sm:col-span-2">
        <p className="mb-5 text-sm text-bone/70">Your email app opens with the enquiry ready for you to review and send.</p>
        <button type="submit" className="display min-h-12 w-full bg-amber px-5 py-3 text-center text-xl text-night sm:w-auto">Prepare enquiry email</button>
      </div>
    </form>
  );
}

function FastTrack() {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <div className="bg-night pb-20 text-bone md:pb-0">
      <section className="bg-ft px-5 pb-16 pt-20 text-night md:px-12 md:pb-24">
        <div className="mx-auto max-w-[1600px]">
          <h1 className="display text-[clamp(6rem,17vw,17rem)]"><Wordmark k="ft"/></h1>
          <p className="mt-7 max-w-2xl text-xl leading-snug md:text-3xl">Permits, licences and travel coordination for major events and visiting artists.</p>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-[1600px] scroll-mt-24 px-5 py-20 md:px-12">
        <h2 className="display mb-8 text-5xl md:text-7xl">Services</h2>
        <ul className="grid gap-x-12 md:grid-cols-2">
          {fastTrackServices.map((service,i)=>(
            <li key={service} className="flex min-h-24 items-center gap-5 border-b border-bone/30 py-5">
              <svg viewBox="0 0 24 24" className="size-8 shrink-0 text-ft" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {iconPaths[i]}
              </svg>
              <span className="text-xl font-semibold md:text-2xl">{service}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="process" className="scroll-mt-24 bg-bone px-5 py-20 text-night md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="display text-[clamp(3.6rem,7.5vw,7rem)]">How it works</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step,i)=>(
              <li key={step} className="border-t border-night/55 pt-5">
                <span className="display text-6xl text-amber">{String(i+1).padStart(2,"0")}</span>
                <h3 className="display mt-5 text-3xl md:text-4xl">{step}</h3>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-xl text-sm">Final approvals and processing times are determined by the relevant authorities.</p>
        </div>
      </section>

      <section id="enquire" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-20 md:px-10">
        <h2 className="display mb-10 text-5xl md:text-7xl">Enquire with Fast Track</h2>
        <FastTrackForm/>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bone/30 bg-night p-3 md:hidden">
        <button type="button" onClick={()=>dialog.current?.showModal()} className="display min-h-12 w-full bg-amber px-5 py-3 text-xl text-night">Enquire with Fast Track</button>
      </div>
      <dialog ref={dialog} className="mx-auto mt-auto max-h-[90dvh] w-full max-w-2xl overflow-y-auto border-t-4 border-ft bg-night p-6 text-bone backdrop:bg-night/80 md:my-auto" aria-label="Fast Track enquiry">
        <div className="mb-8 flex items-start justify-between gap-6">
          <h2 className="display text-4xl">Fast Track enquiry</h2>
          <button type="button" className="border border-bone/50 px-3 py-2 text-sm" onClick={()=>dialog.current?.close()}>Close</button>
        </div>
        <FastTrackForm onComplete={()=>dialog.current?.close()}/>
      </dialog>
    </div>
  );
}
