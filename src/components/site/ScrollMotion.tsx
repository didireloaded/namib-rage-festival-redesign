import { useEffect, useRef } from "react";

const accents: Record<string, string> = {
  sos:"var(--sos)",camp:"var(--camp)",barb:"var(--barb-orange)",
  howler:"var(--howler)",ft:"var(--ft)",nr:"var(--nr)"
};

/** Scroll motion does not intercept native scrolling or delay content. */
export function ScrollMotion({path}:{path:string}) {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("#main [data-reveal]"));
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) {
          entry.target.classList.remove("motion-pending");
          entry.target.classList.add("motion-entered");
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.05,rootMargin:"0px 0px -6% 0px"});
    if(!reduced) sections.forEach(el=>{
      if(el.getBoundingClientRect().top > window.innerHeight*.94){
        el.classList.add("motion-pending");
        observer.observe(el);
      }
    });
    let frame=0;
    const update=()=>{
      frame=0;
      const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
      progress.current?.style.setProperty("--scroll-fraction",String(Math.min(1,Math.max(0,window.scrollY/max))));
      document.documentElement.style.setProperty("--hero-shift",(reduced?0:Math.min(65,Math.max(0,window.scrollY*.1)))+"px");
    };
    const schedule=()=>{if(!frame) frame=requestAnimationFrame(update)};
    window.addEventListener("scroll",schedule,{passive:true});
    window.addEventListener("resize",schedule,{passive:true});
    update();
    return ()=>{
      observer.disconnect();
      sections.forEach(el=>el.classList.remove("motion-pending","motion-entered"));
      window.removeEventListener("scroll",schedule);
      window.removeEventListener("resize",schedule);
      cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty("--hero-shift");
    };
  },[path]);
  const brand=path.startsWith("/festivals/sound-of-summer")?"sos":
    path.startsWith("/festivals/campout")?"camp":
    path.includes("bar-management")?"barb":
    path.includes("ticketing-cashless")?"howler":
    path.includes("fast-track")?"ft":"nr";
  return <div className="scroll-progress" aria-hidden="true">
    <div ref={progress} className="scroll-progress-fill" style={{backgroundColor:accents[brand]}}/>
  </div>;
}
