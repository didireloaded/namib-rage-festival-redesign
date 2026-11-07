# Namib Rage Festival Redesign

Build a VISUAL-FIRST, high-fidelity, responsive Namib Rage Events website redesign as a NEW standalone review project. Do not edit namibrage.com or claim deployment to its production domain. Site goal is a real browsing experience and clickable prototype, not a text-heavy brochure. Build actual React/TypeScript/Tailwind pages and navigation, not a plan. The visitor must immediately recognize SIX brands and understand that only Sound of Summer and Campout Dune Fest are festivals Namib Rage OWNS.

REFERENCES / FACTS
Official site: https://namibrage.com/. Current homepage already features 2026 tickets and two events, so this is a *visual and information-architecture redesign*, not a claim that tickets are absent today.
Verified festival details:
- Sound of Summer 2026, 28 Dec 2026, 12:00–23:00 (operations approved; Howler still shows incorrect 23:59), Tidal Pools & Jetty Beach, Langstrand. 18+. Headliner Shimza. 3 stages (Savanna main, Coke Studio, Jetty). Direct tickets https://namibrage.howler.co.za/events/sound-of-summer-2026-8a50 . Avoid displaying ticket prices because site and Howler disagree.
- Campout Dune Fest 2026, 31 Dec 2026–1 Jan 2027, Seukelduine / Dorob National Park. Camping, NYE in dunes, 18+. Gates from 12:00 on Dec 31, closing/music times pending approval. Direct tickets https://namibrage.howlerapp.com/events/campout-dune-fest-2026-34b6 . Avoid displaying ticket prices because sources disagree.
- Company based Windhoek, Namibia; contact hello@namibrage.com and +264 81 207 5457, 22 Copper Street (from official homepage).
- Only owned festivals are Sound of Summer and Campout Dune Fest.
- Barbarian Bar Management is a full-service event bar business, including operated bars at Oktoberfest Namibia, Balcony Mix, KosFees, Liefde op die Nam. DO NOT claim those events were organised or owned by Namib Rage.
- Howler: ticket sales, access control, cashless payments, attendee help points to https://help.howler.co.za/ . Howler is the ticketing/cashless service/partner, not an owned festival.
- Fast Track: professional visa services, work permits, liquor licences, noise permits, NASCAM music licences, flight bookings and artist bookings for events and visiting performers. This is not a VIP ticket skip-line service.
- Events We Power: work by Barbarian OR Howler, labeled precisely with service badge. Use the four event names provided (Oktoberfest Namibia, Balcony Mix, KosFees, Liefde op die Nam). Only label Barbarian service supported by brief. DO NOT imply Howler involvement on a specific event unless confirmed.
- Partners/sponsors: only render logos after approval. Do not invent logos, endorsements, or partner names. Build approved-assets-ready logo data configuration with an empty-state instead of fake partner logos.
- Branding logos: Use official logo assets if verified/available. Never create fake official logos or AI-generated branded assets. For unprovided brand files, show editorial typographic WORDMARK PLACEHOLDERS clearly configurable/replaced by approved SVG/PNG logo assets. Use actual Howler logo when available from official source; Namib Rage official combined organiser mark can be sourced from https://howler-production.s3.eu-west-1.amazonaws.com/uploads/organiser/organiser_logo/10442/WhatsApp_Image_2026-06-17_at_11.52.02.jpeg (this combines NR + Howler so don't pretend it is a standalone transparent logo). Reference https://www.howler.co.za/ for Howler branding. Campout branding artwork official from https://namibrage.com/events/campout-dune-fest-2026.jpg .
- Photos must be REAL event photographs, no AI-generated photos, no generic stock presented as our event. Use these actual festival photo assets already publicly used on official Namib Rage site:
  https://res.cloudinary.com/pixel-penguin/image/upload/c_scale%2Cw_1920/v1660917080/websites/namib_rage/images/gallery%20images/sos/IMG_2520_cvbue3.jpg
  https://res.cloudinary.com/pixel-penguin/image/upload/c_scale%2Cw_1920/v1660917080/websites/namib_rage/images/gallery%20images/sos/IMG_0696_gtba3v.jpg
  https://res.cloudinary.com/pixel-penguin/image/upload/c_scale%2Cw_1920/v1660917080/websites/namib_rage/images/gallery%20images/sos/51081771_2049340501815630_1622308563307200512_n_aofoxo.jpg
  https://images.pixieset.com/784513901/87f062341d5c0b25be26dd0c5e1b043b-xxlarge.jpg
  https://images.pixieset.com/784513901/2662436cf50baaa5a6647dbc58e3e8d9-xxlarge.jpg
  https://dxf0uknvapgsn.cloudfront.net/41/01KA8D8V3EAFAJ1T16W3Z1XKHX.jpg
  https://dxf0uknvapgsn.cloudfront.net/42/01KA8D8WB58ACQ8VRKTZCYZN2D.jpg
 The latter are SOUND OF SUMMER or general Namib Rage official gallery images. Do NOT mislabel them as Campout or Barbarian activity. For Campout, lead with its 2026 genuine artwork; create asset slot for future real Campout photography/video from owner. For Barbarian, use restrained photo selection only as visual atmosphere with an explicit source-safe 'Event bar operations' context; don't fabricate team portraits or imply any photo proves Barbarian crew service. Add ready-to-swap media config. No video URLs supplied: implement a real optional short-loop video field (autoplay muted loop playsInline poster/reduced motion respected) but default to static photo, do not display nonfunctional play controls.

DESIGN DIRECTION
Bold, colourful, premium live-music editorial / immersive festival microsite. Think large, cropped, authentic event photography and typography, confident art direction, not a corporate SaaS, no generic rounded-card grids, no neon glow, no grain overlays, no glass, no AI illustrations. Black/off-black navigation and white/cream editorial type act as connective visual system, each brand owns a section accent:
Namib Rage master electric blue + deep black; SoS sun orange/coral/cyan; Campout punchy mustard/yellow and ink purple; Barbarian oxblood/burnt orange; Howler official magenta; Fast Track cobalt/white. Palettes other than verified Howler are proposed and editable, not presented as official brand codes.
Display style uses large condensed impactful uppercase headers, tighter editorial body type, max two body sentences per section, generous space, asymmetric grids, playful sticker-like date labels with minimal decorative elements. Do not use huge empty areas, cards, UI filler or meaningless marquee text.
Mobile first especially 375px. Header logo left, Tickets prominent, menu right. Fixed bottom mini CTA on festival pages. The first mobile fold must show festival imagery, clear 2026 festival identity and a ticket CTA.

INFORMATION ARCHITECTURE - actually implement route pages
/ = bold flagship home, split-stage photomontage hero with "WE MAKE NAMIBIA COME ALIVE" large overlay, two direct festival ticket choices visible immediately, real photo, a subtle 'scroll to explore' CTA. Six-brand ecosystem strip with logo placeholders where unavailable, two editorial festival feature blocks, three visually differentiated service blocks (Barbarian, Howler, Fast Track), Events we power gallery, empty/approved sponsors section, partnership and recruitment CTA, footer.
/festivals = 2 hero festival features and link to past editions.
/festivals/sound-of-summer = large photo hero, 28 DEC, lineup/stages (only approved artist info), images, ticket button direct to correct Howler event, getting there, FAQ/rules, age 18+.
/festivals/campout = official festival artwork hero, 31 DEC, camping / environmental reminders, how to get there, ticket button direct Howler, use real photo slots only if supplied.
/services = editorial overview navigation.
/services/bar-management = Barbarian service landing with large media, bar build & planning, trained teams, service operations, stock/point-of-sale/inventory and enquiries, Events Powered badges, CTA Enquire.
/services/ticketing-cashless = Howler services with three clear pillars: online ticket sales, access control, cashless payment, organiser enquiry CTA, attendee support link to Howler help.
/services/fast-track = completely professional service page, clear large service list in a beautiful numbered typography grid (visas, work permits, liquor licences, noise permits, NASCAM licences, flights, artist bookings), 3-stage 'send enquiry > we review required documents > coordinate application/booking' journey; CTA Enquire; do NOT imply guaranteed approval.
/events-we-power = photo-led gallery with filtering tabs by type (Owned / Bar operations / Ticketing if verified), events with role chips & no fabricated participation or photos.
/partners = photo-led partnership inquiry, sponsor logos show only approved assets.
/work-with-us = routes/calls to existing staff application and vendor interest website URLs using buttons: https://namibrage.com/staff/apply/barbarian , https://namibrage.com/staff/apply/howler , https://namibrage.com/vendor-application/ . Do not copy sensitive staff form or gather ID/bank information in this demo.
/about = short visual story, founded 2013, 2 owned festivals + 3 service divisions, team images only if verified.
/privacy = 'Draft privacy notice pending approval' with short preview and link to official /privacy-policy/ until team confirms implementation; never claim full compliance.

INTERACTIONS
Working mobile nav, all internal routes navigable, smooth transitions, accessible focus states, elegant hover animations, responsive photo galleries with lightbox if easy, filter tabs in Events We Power, real external ticket links opening new tab with rel noopener, CTAs to relevant page. For CONTACT ENQUIRY, create a well-designed visual enquiry form but make it SAFE DEMO ONLY: no fake success confirmation indicating actual delivery; on submit clearly show 'Preview only. Enquiries will be enabled after the secure backend is connected.' Do not store or transmit personal details, no embedded mailto as substitute. Separate optional marketing consent from privacy consent and link /privacy. Use form elements. Event attendance details and future sponsor logos must come from an approval-driven config; put content in organized data file not embedded all over components. Add appropriate alt text and image fallbacks.

PERFORMANCE / QUALITY
Use responsive image sizes, lazy loading for below-fold, compressed imagery if feasible, poster-first optional video, reduced motion, high contrast, no massive animations, no layout shift. Protect main image LCP; avoid 15 external requests at once. Make photo credit/source metadata easy to maintain. 375px, tablet, desktop tested.

PRIMARY VISUAL GOAL
The site should feel like an actual Namibian festival brand with recognisable event imagery. It should be striking from the first screen, not a dashboard. Make each of the 6 entities visible visually and navigable. Build the complete initial working prototype now, not just a project outline.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f4c9245b-9304-4d16-82c5-b9454472e615).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
