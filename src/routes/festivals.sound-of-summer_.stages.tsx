import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { festivals, sosStageMedia, sosStages } from "@/data/site";
import { Gallery } from "@/components/site/Gallery";
import { TicketLink } from "@/components/site/Bits";
import { seo } from "@/lib/seo";

type StageKey = "savanna" | "coke-studio" | "jetty";
const ids: StageKey[] = ["savanna", "coke-studio", "jetty"];
const valid = (input: unknown): StageKey => ids.includes(input as StageKey) ? input as StageKey : "savanna";

export const Route = createFileRoute("/festivals/sound-of-summer_/stages")({
  validateSearch: (query: Record<string, unknown>) => ({ stage: valid(query.stage) }),
  head: () => seo("Sound of Summer stages", "Explore Savanna Main Stage, Coke Studio and Jetty at Sound of Summer."),
  component: Stages,
});

function Stages() {
  const { stage } = Route.useSearch();
  const index = ids.indexOf(stage);
  const selected = sosStages[index];
  const images = sosStageMedia[stage];
  useEffect(() => window.scrollTo({top:0,behavior:"auto"}), [stage]);

  return (
    <div className="min-h-svh bg-sos-deep text-cream">
      <section className="px-5 pb-12 pt-16 md:px-12 md:pt-24">
        <Link to="/festivals/sound-of-summer" className="inline-flex items-center gap-2 border-b border-sos-cyan pb-2 text-sm font-semibold text-sos-cyan">Back to Sound of Summer</Link>
        <h1 className="display mt-10 max-w-6xl text-[clamp(5rem,11vw,11rem)] leading-[.9]">The stages</h1>
        <p className="mt-6 max-w-xl text-lg text-cream/75">Three stages. Explore the spaces that make up Sound of Summer.</p>
      </section>
      <nav aria-label="Choose a stage" className="grid border-y border-cream/25 md:grid-cols-3">
        {sosStages.map((item,i)=>(
          <Link key={item.name} to="/festivals/sound-of-summer/stages" search={{stage:ids[i]}}
            aria-current={stage===ids[i]?"page":undefined}
            className={"display min-h-32 border-b border-cream/25 p-6 text-3xl transition-colors md:border-b-0 md:border-r md:p-9 md:text-5xl "+(stage===ids[i]?"bg-sos-cyan text-sos-deep":"hover:bg-sos/70")}>
            {item.name}
          </Link>
        ))}
      </nav>
      <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-12 md:py-28">
        <p className="text-sm font-bold uppercase tracking-widest text-sos-cyan">{selected.note === "Stage two" || selected.note === "Stage three" ? "Festival stage" : selected.note}</p>
        <h2 className="display mt-6 text-[clamp(4.5rem,10vw,10rem)] leading-none">{selected.name}</h2>
        <p className="mt-5 max-w-xl text-lg text-cream/75">{stage==="savanna"?"Sound of Summer's main stage.":stage==="coke-studio"?"The Coke Studio experience.":"The Jetty stage at the coast."}</p>
        {images.length > 0 && (
          <div className="mt-14">
            <h3 className="display mb-8 text-4xl md:text-6xl">Stage gallery</h3>
            <Gallery items={images}/>
          </div>
        )}
        <div className="mt-16 flex flex-wrap items-center gap-5 border-t border-cream/25 pt-8">
          <Link to="/festivals/sound-of-summer" hash="gallery" className="inline-flex items-center gap-2 border-b border-sos-cyan pb-2 text-base font-semibold text-sos-cyan">View past summers <ArrowRight className="size-5" aria-hidden="true"/></Link>
          <TicketLink f={festivals[0]} className="bg-sos-orange text-sos-deep">Festival tickets</TicketLink>
        </div>
      </section>
    </div>
  );
}
